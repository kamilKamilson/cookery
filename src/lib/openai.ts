import { OpenAIEmbeddings } from "@langchain/openai";

export const embeddingLLM = new OpenAIEmbeddings({
  modelName: process.env.OPENAI_EMBEDDING_MODEL,
});
