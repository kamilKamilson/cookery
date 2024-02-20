import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { embeddingLLM } from "@/lib/openai";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { query: string };
  const query = body.query;

  const recipes = await db.recipe.findMany({
    include: {
      category: true,
    },
  });

  const recipeDocuments = recipes.map(
    ({ id, name, ingredients, steps }) =>
      `
    ID: /${id}/
      Nazwa: ${name}
  Składniki: ${ingredients}
  Przygotowanie: ${steps}`
  );

  const vectorStore = await MemoryVectorStore.fromTexts(
    recipeDocuments,
    recipes.map(({ id }) => ({ id })),
    embeddingLLM
  );

  const results = (await vectorStore.similaritySearch(query, 5)).map((result) =>
    recipes.find(({ id }) => result.metadata.id === id)
  );

  return NextResponse.json(results);
}
