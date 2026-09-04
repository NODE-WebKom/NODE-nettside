import OpenAI from "openai";

// OBS: IKKE instansier OpenAI-klienten på modul-nivå - da kjøres den også
// under "npm run build" (Vercel samler inn side-data for alle api-routes ved
// build), og bygget feiler hvis OPENAI_API_KEY ikke er satt i build-miljøet.
// Lag den derfor lat (kun ved første faktiske bruk).
let cachedClient: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return cachedClient;
}
