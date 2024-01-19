"use client";

import {  Prisma} from ".prisma/client";
import { RecipeItem } from "./RecipeItem";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const classes = {
  list: "grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
};

type RecipeListProps = { recipes: Prisma.RecipeGetPayload<{include: {
  category: true
}}>[] }

export const RecipeList = ({ recipes }: RecipeListProps) => {
  const [search, setSearch] = useState("");

  const filteredRecipes = search
    ? recipes.filter(({ name }) =>
        name
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(search.toLowerCase().replaceAll(" ", ""))
      )
    : recipes;

  return (
    <div>
      <TextInput
        className="mt-4"
        leftSection={<IconSearch />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={classes.list}>
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};
