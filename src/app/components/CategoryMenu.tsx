"use client";

import {
  Button,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export const CategoryMenu = ({
  category,
}: {
  category: Prisma.RecipeCategoryGetPayload<{
    include: {
      children: true;
    };
  }>;
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Menu shadow="md" width={300} opened={opened} onChange={setOpened}>
      <MenuTarget>
        <Button>{category.name}</Button>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem component={Link} href={`/kategoria/${category.slug}`}>
          wszystkie
        </MenuItem>
        {category.children.map((child) => (
          <MenuItem
            key={child.id}
            component={Link}
            href={`/kategoria/${category.slug}/${child.slug}`}
          >
            {child.name}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );
};
