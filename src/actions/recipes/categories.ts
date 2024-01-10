"use server";

import { db } from "@/lib/db";
import { RecipeCategory } from "@prisma/client";

export async function getCategories() {
  try {
    return await db.recipeCategory.findMany({
      include: {
        parent: true,
        children: true,
      },
    });
  } catch (error) {
    return [];
  }
}

export async function addCategory(
  data: Pick<RecipeCategory, "name" | "parentId" | "color">
) {
  try {
    return await db.recipeCategory.create({
      data,
    });
  } catch (error) {
    return false;
  }
}

export async function removeCategory(id: string) {
  try {
    const recipesWithCategory = await db.recipe.findMany({
      where: {
        categoryIds: {
          has: id,
        },
      },
    });

    if (recipesWithCategory.length) {
      recipesWithCategory.forEach((recipe) => {
        db.recipe.update({
          where: {
            id: recipe.id,
          },
          data: {
            categoryIds: {
              set: recipe.categoryIds.filter((category) => category !== id),
            },
          },
        });
      });
    }

    await db.recipeCategory.updateMany({
      where: {
        parentId: id,
      },
      data: {
        parentId: null,
      },
    });

    return await db.recipeCategory.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
}
