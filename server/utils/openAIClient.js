import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

export default openAI;