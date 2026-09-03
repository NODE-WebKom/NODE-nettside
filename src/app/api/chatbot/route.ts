import { streamNilsResponse } from "@/components/WindowManager/content/chatbot/lib/chat";
import type { ChatMessage } from "@/components/WindowManager/content/chatbot/lib/types";

export async function POST(request: Request) {
  let messages: ChatMessage[];
  try {
    ({ messages } = await request.json());
  } catch {
    return new Response("Ugyldig forespørsel.", { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Ingen meldinger mottatt.", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamNilsResponse(messages)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        console.error("Chatbot API error:", error);
        controller.enqueue(encoder.encode("Noe gikk galt med Nils."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
