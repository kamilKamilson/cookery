"use client";

import { Pill } from "@mantine/core";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export const SubCategoryItem = ({
  category,
}: {
  category: Prisma.RecipeCategoryGetPayload<{
    include: {
      parent: true;
    };
  }>;
}) => (
  <Link
    href={
      category?.parent
        ? `/kategoria/${category?.parent.slug}/${category.slug}`
        : `/kategoria/${category.slug}`
    }
  >
    <Pill>{category.name}</Pill>
  </Link>
);
