import { openai } from "./openaiClient";
import { NILS_SYSTEM_PROMPT } from "./prompt";
import type { ChatMessage } from "./types";

const MAX_HISTORY = 10;
const MODEL = process.env.OPENAI_CHATBOT_MODEL || "gpt-5.4-nano";

function requireVectorStoreId(): string {
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!vectorStoreId) {
    throw new Error("OPENAI_VECTOR_STORE_ID er ikke satt.");
  }
  return vectorStoreId;
}

export async function* streamNilsResponse(messages: ChatMessage[]): AsyncGenerator<string> {
  const vectorStoreId = requireVectorStoreId();
  const recentMessages = messages.slice(-MAX_HISTORY);

  const stream = await openai.responses.create({
    model: MODEL,
    instructions: NILS_SYSTEM_PROMPT,
    input: recentMessages,
    reasoning: { effort: "none" },
    tools: [
      {
        type: "file_search",
        vector_store_ids: [vectorStoreId],
        max_num_results: 3,
      },
    ],
    stream: true,
  });

  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      yield event.delta;
    }
  }
}
