"use server";

import { db } from "@/lib/db";
import { Prisma, Recipe } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getRecipe(slug: string) {
  try {
    return await db.recipe.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        categories: true,
        tags: true
      },
    });
  } catch (error) {
    return null;
  }
}


export async function getRecipesByCategories(categoryId: string)  {

  const recipes = await db.recipe.findMany({
    where: {
      categoryIds: {
        has: categoryId
      },
    },
    orderBy: {
      name: "desc",
    },
    include: {
      categories: true,
      tags: true
    }
  });

  return recipes ?? [];
}

export async function getRecipes() {
  try {
    return await db.recipe.findMany({
      include: {
        categories: true
      },
      orderBy: {
        name: "desc",
      },
    });
  } catch (error) {
    return [];
  }
}

export async function addRecipe(
  data: Pick<Recipe, "categoryIds" | "tagIds" | "ingredients" | "macro" | "calories" | "name" | "steps">
) {
  let slug = slugify(data.name);

  console.log(data)

  const sameSlugRecipe = await db.recipe.findFirst({
    where: {
      slug,
    },
  });

  if (sameSlugRecipe) {
    slug += (Math.random() + 1).toString(36).substring(7);
  }

  revalidatePath("/kategoria/slug", "page");

  return await db.recipe.create({
    data: {
      name: data.name,
      ingredients: data.ingredients,
      macro: data.macro,
      calories: data.calories,
      steps: data.steps,
      categories: {
        connect: data.categoryIds.map(id => ({id})) 
      },
      tags: {
        connect: data.tagIds.map(id => ({id}))
      },
      slug,
    },
  });
}

export async function editRecipe(
  id: string,
  data: Pick<Recipe, "categoryIds" | "tagIds" | "ingredients" | "macro" | "calories" | "name" | "steps">
) {
  const recipe = await db.recipe.findFirst({
    where: {
      id,
    },
  });

  await db.recipe.update({
    where: {
      id,
    },
    data: {
      categories: {
        disconnect: recipe?.categoryIds.map(id =>({id}))
      },
      tags: {
        disconnect: recipe?.tagIds.map(id => ({id}))
      }
    },
  });

  const updatedRecipe = await db.recipe.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      ingredients: data.ingredients,
      macro: data.macro,
      calories: data.calories,
      steps: data.steps,
      slug: slugify(data.name),
      categories: {
        connect: data.categoryIds.map(id => ({id})) 
      },
      tags: {
        connect: data.tagIds.map(id => ({id}))
      },
    },
  });

  revalidatePath("/kategoria/slug", "page");
  return updatedRecipe;
}

export async function removeRecipe(id: Recipe["id"]) {
  await db.recipe.delete({
    where: {
      id,
    },
  });

  revalidatePath("/kategoria/slug", "page");
}
