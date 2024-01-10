"use client";

import { Prisma } from "@prisma/client";
import { RecipeItem } from "./RecipeItem";
import { Flex, MultiSelect, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/recipes/categories";

type RecipeListProps = {
  data: Prisma.RecipeGetPayload<{
    include: {
      categories: {
        include: {
          parent: true;
        };
      };
    };
  }>[];
};

export const RecipeList = ({ data }: RecipeListProps) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<
    Prisma.RecipeCategoryGetPayload<{
      include: {
        parent: true;
        children: true;
      };
    }>[]
  >([]);
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);

  const filteredList = data
    .filter(({ name }) =>
      name
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(search.toLowerCase().replaceAll(" ", ""))
    )
    .filter(({ categoryIds }) =>
      currentCategories.length
        ? categoryIds.some((id) => currentCategories.includes(id))
        : true
    );

  const selectData = [
    ...categories
      .filter(({ parentId, children }) => !parentId && children.length)
      .map(({ name: parentName, children }) => ({
        group: parentName,
        items: children.map(({ id, name }) => ({
          label: `${parentName} - ${name}`,
          value: id,
        })),
      })),
    {
      group: "bez kategorii nadrzędnej",
      items: categories
        .filter(({ parentId, children }) => !parentId && !children.length)
        .map(({ name, id }) => ({
          label: name,
          value: id,
        })),
    },
  ];

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {});

  return (
    <div className="mt-2">
      <Stack>
        <TextInput
          name="search"
          leftSection={<IconSearch />}
          placeholder="Szukaj..."
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          className="w-full"
        />
        <MultiSelect
          placeholder="Kategorie"
          name="categoryIds"
          data={selectData}
          searchable
          value={currentCategories}
          onChange={setCurrentCategories}
        />
      </Stack>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredList.map((recipe) => (
          <RecipeItem data={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};
