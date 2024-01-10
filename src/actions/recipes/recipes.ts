"use server";

import { db } from "@/lib/db";
import { Recipe } from "@prisma/client";
import slugify from "slugify";

export async function getRecipe(slug: string) {
  try {
    return await db.recipe.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        categories: {
          include: {
            parent: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
}

export async function getRecipes() {
  try {
    return await db.recipe.findMany({
      include: {
        categories: {
          include: {
            parent: true,
          },
        },
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
  data: Pick<Recipe, "categoryIds" | "ingredients" | "macro" | "name" | "steps">
) {
  let slug = slugify(data.name);

  const sameSlugRecipe = await db.recipe.findFirst({
    where: {
      slug,
    },
  });

  if (sameSlugRecipe) {
    slug += (Math.random() + 1).toString(36).substring(7);
  }

  return await db.recipe.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function editRecipe(
  id: string,
  data: Pick<Recipe, "categoryIds" | "ingredients" | "macro" | "name" | "steps">
) {
  return await db.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      slug: slugify(data.name),
    },
  });
}

export async function removeRecipe(id: Recipe["id"]) {
  await db.recipe.delete({
    where: {
      id,
    },
  });
}
