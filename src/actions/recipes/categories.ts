"use server";

import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import slugify from "slugify";

export async function getCategory(slug: string) {
  const category = await db.category.findFirst({
    where: {
      slug,
    },
  });

  return category ?? null;
}

export async function getCategories() {
  try {
    return await db.category.findMany();
  } catch (error) {
    return [];
  }
}

export async function addCategory(
  data: Pick<Category, "name">
) {
  try {
    return await db.category.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
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
        categoryIds: {
          has: id
        }
      },
    });

    if (recipesWithCategory.length) {
      recipesWithCategory.forEach((recipe) => {
        db.recipe.update({
          where: {
            id: recipe.id,
          },
          data: {
            categories: {
              disconnect: { id }
            }
          },
        });
      });
    }

    return await db.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
}
