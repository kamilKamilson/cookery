"use server";

import { db } from "@/lib/db";
import { Ingredient } from "@prisma/client";

export async function getIngredients() {
  try {
    return await db.ingredientCategory.findMany({
      include: {
        ingredients: true,
      },
    });
  } catch (error) {
    return [];
  }
}

export async function saveIngredient(
  data: Pick<Ingredient, "name" | "categoryId">
) {
  const existsWithSameName = await db.ingredient.findFirst({
    where: data,
  });

  if (existsWithSameName) {
    throw new Error("Taki składnik już istnieje");
  }

  return await db.ingredient.create({
    data,
  });
}

export async function removeIngredient(id: string) {
  const recipesWithThisIngredient = await db.recipe.findMany({
    where: {
      ingredients: {
        some: {
          ingredientId: id,
        },
      },
    },
  });

  if (recipesWithThisIngredient.length) {
    throw new Error(`Te przepisy mają ten składnik: ${recipesWithThisIngredient
      .map(({ name }) => name)
      .join(" ;")}
      Usuń lub zedytuj przepisy korzystające z tego składnika.`);
  }

  return await db.ingredient.delete({
    where: {
      id,
    },
  });
}
