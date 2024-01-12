"use server";

import { db } from "@/lib/db";
import { RecipeCategory } from "@prisma/client";

export async function getCategories() {
  try {
    return await db.recipeCategory.findMany({
      where: {
        parentId: {
          equals: null,
        },
      },
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
  data: Pick<RecipeCategory, "name" | "parentId">
) {
  console.log(data);
  try {
    return await db.recipeCategory.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeCategory(id: string) {
  try {
    const recipesWithCategory = await db.recipe.findMany({
      where: {
        categoryId: id,
      },
    });

    if (recipesWithCategory.length) {
      recipesWithCategory.forEach((recipe) => {
        db.recipe.update({
          where: {
            id: recipe.id,
          },
          data: {
            categoryId: undefined,
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
