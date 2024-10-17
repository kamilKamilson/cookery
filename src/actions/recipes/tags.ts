"use server";

import { db } from "@/lib/db";
import { Tag } from "@prisma/client";

export async function getTag(id: string) {
  const tag = await db.tag.findFirst({
    where: {
      id,
    },
  });

  return tag ?? null;
}

export async function getTags() {
  try {
    return await db.tag.findMany();
  } catch (error) {
    return [];
  }
}

export async function addTag(
  data: Pick<Tag, "name">
) {
  try {
    return await db.tag.create({
      data: {
        name: data.name
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}