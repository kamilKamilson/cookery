"use server";

import { db } from "@/lib/db";
import { Recipe } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getRecipe(slug: string) {
  try {
    return await db.recipe.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        category: {
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

export async function getRecipesByCategories(categoryId: string) {
  const category = await db.recipeCategory.findFirst({
    where: {
      id: categoryId,
    },
    include: {
      children: true,
    },
  });

  const categoryIds = [
    categoryId,
    ...(category?.children.map(({ id }) => id) ?? []),
  ];

  const recipes = await db.recipe.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    orderBy: {
      name: "desc",
    },
  });

  return recipes ?? [];
}

export async function getRecipes() {
  try {
    return await db.recipe.findMany({
      include: {
        category: {
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
  data: Pick<Recipe, "categoryId" | "ingredients" | "macro" | "name" | "steps">
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

  revalidatePath("/kategoria/[...slug]", "page");

  return await db.recipe.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function editRecipe(
  id: string,
  data: Pick<Recipe, "categoryId" | "ingredients" | "macro" | "name" | "steps">
) {
  const recipe = await db.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      slug: slugify(data.name),
    },
  });

  revalidatePath("/kategoria/[...slug]", "page");
  return recipe;
}

export async function removeRecipe(id: Recipe["id"]) {
  await db.recipe.delete({
    where: {
      id,
    },
  });

  revalidatePath("/kategoria/[...slug]", "page");
}
