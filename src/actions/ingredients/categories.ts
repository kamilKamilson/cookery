"use server";

import { db } from "@/lib/db";

export async function getCategories() {
  try {
    return await db.ingredientCategory.findMany();
  } catch (error) {
    return [];
  }
}

export async function addCategory(data: { name: string; color: string }) {
  try {
    return await db.ingredientCategory.create({
      data,
    });
  } catch (error) {
    return false;
  }
}

export async function removeCategory(id: string) {
  try {
    await db.ingredient.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        categoryId: undefined,
      },
    });
    return await db.ingredientCategory.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
}
