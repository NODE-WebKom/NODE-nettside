import { isFlagged, streamNilsResponse } from "@/components/WindowManager/content/chatbot/lib/chat";
import type { ChatMessage } from "@/components/WindowManager/content/chatbot/lib/types";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const MAX_MESSAGES = 20;
const MAX_USER_MESSAGE_LENGTH = 500;
// Botens egne svar sendes tilbake som historikk, og kan være lengre enn brukermeldinger.
// De kuttes i stedet for å avvises, ellers feiler samtalen så snart et svar er for langt.
const MAX_ASSISTANT_MESSAGE_LENGTH = 4000;
const MAX_BODY_BYTES = 40_000;

const RATE_LIMIT_PER_MINUTE = 10;
const RATE_LIMIT_PER_HOUR = 60;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const minute = rateLimit(`min:${ip}`, RATE_LIMIT_PER_MINUTE, 60_000);
  const hour = minute.ok ? rateLimit(`hour:${ip}`, RATE_LIMIT_PER_HOUR, 3_600_000) : minute;
  if (!minute.ok || !hour.ok) {
    const retryAfter = !minute.ok ? minute.retryAfter : hour.retryAfter;
    return new Response("Du sender for mange meldinger. Vent litt og prøv igjen.", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return new Response("Forespørselen er for stor.", { status: 413 });
  }

  let raw: unknown;
  try {
    raw = (await request.json())?.messages;
  } catch {
    return new Response("Ugyldig forespørsel.", { status: 400 });
  }

  if (!Array.isArray(raw) || raw.length === 0) {
    return new Response("Ingen meldinger mottatt.", { status: 400 });
  }

  if (raw.length > MAX_MESSAGES) {
    return new Response("For mange meldinger i denne samtalen. Start en ny samtale.", { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const m of raw) {
    const role = m?.role;
    const content = m?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return new Response("En melding er ugyldig.", { status: 400 });
    }
    if (role === "user" && content.length > MAX_USER_MESSAGE_LENGTH) {
      return new Response("En melding er for lang.", { status: 400 });
    }
    messages.push({ role, content: role === "assistant" ? content.slice(0, MAX_ASSISTANT_MESSAGE_LENGTH) : content });
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user" || !last.content.trim()) {
    return new Response("Siste melding må være fra bruker.", { status: 400 });
  }

  const textHeaders = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };

  if (await isFlagged(last.content)) {
    return new Response("Det kan jeg dessverre ikke hjelpe med. Spør meg gjerne om studiet eller NODE!", {
      headers: textHeaders,
    });
  }

  const encoder = new TextEncoder();
  // Avbryter OpenAI-kallet hvis klienten lukker forbindelsen, så vi ikke betaler for ubrukte svar.
  const abort = new AbortController();
  request.signal.addEventListener("abort", () => abort.abort());

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamNilsResponse(messages, abort.signal)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("Chatbot API error:", error);
          controller.enqueue(encoder.encode("Noe gikk galt med Nils."));
        }
      } finally {
        if (!abort.signal.aborted) controller.close();
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(stream, { headers: textHeaders });
}
