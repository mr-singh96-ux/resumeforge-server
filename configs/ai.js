import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest"   // ✅ FINAL CORRECT MODEL
});