'use server'

import { NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import fs from "fs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let cachedEmbeddings: { text: string; embedding: number[] }[] | null = null;

const SYSTEM_PROMPT = `
Du er Nevrale Nils, en robotassistent for studentene ved bachelorgraden i kunstig intelligens ved Universitetet i Bergen. 
REGLER:
1. Svar presist, høflig og kortfattet.
2. Bruk informasjonen under "KONTEKST" til å svare hvis den er relevant.
3. Hvis informasjonen ikke er relevant for spørsmålet, svarer du basert på din generelle kunnskap, men presiser at det ikke står i studieplanen.
`;

function cosineSim(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!cachedEmbeddings) {
      const embeddingsPath = path.join(process.cwd(), "data", "embedded_data.json");
      const fileData = fs.readFileSync(embeddingsPath, "utf-8");
      cachedEmbeddings = JSON.parse(fileData);
    }

    if (!cachedEmbeddings) throw new Error("Kunne ikke laste embedded data.");

    const lastMessage = messages[messages.length - 1];
    
    // 1. Generer embedding (fortsatt nødvendig for RAG-delen)
    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-3-large",
      input: lastMessage.content,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    // 2. RAG-filtrering med terskel
    const THRESHOLD = 0.4;
    const relevantMatches = cachedEmbeddings
      .map((e) => ({ ...e, score: cosineSim(queryEmbedding, e.embedding) }))
      .filter(match => match.score > THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const contextString = relevantMatches.map(c => c.text).join("\n\n---\n\n");

    // 3. Bruk det nye client.responses API-et
    // Legg merke til: 'instructions' erstatter system-meldingen i arrayet
    // 'input' kan nå ta hele arrayet med meldinger
    const response = await client.responses.create({
      model: "gpt-5-nano",
      instructions: SYSTEM_PROMPT + (contextString ? `\n\nKONTEKST FRA STUDIEPLAN:\n${contextString}` : ""),
      input: messages, // Responses API håndterer historikk sømløst
    });

    // Med det nye SDK-et kan vi bruke .output_text direkte
    return NextResponse.json({
      response: response.output_text,
    });

  } catch (error: any) {
    console.error("RAG API error:", error);
    return NextResponse.json({ error: "Noe gikk galt med Nils." }, { status: 500 });
  }
}