
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({
  apiKey: apiKey
});

export const model = ai;
