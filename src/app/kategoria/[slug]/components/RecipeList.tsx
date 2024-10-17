"use client";

import { Prisma, Tag } from ".prisma/client";
import { RecipeItem } from "./RecipeItem";
import { useEffect, useState } from "react";
import { MultiSelect, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getTags } from "@/actions/recipes/tags";

const classes = {
  filters: "flex w-full gap-4 sm:flex-row flex-col",
  list: "grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
};

type RecipeListProps = {
  recipes: Prisma.RecipeGetPayload<{
    include: {
      categories: true;
      tags: true;
    };
  }>[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => {
  const [search, setSearch] = useState("");
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    getTags().then(setAllTags);
  }, []);

  useEffect(() => {
    if (allTags.length === 0 || recipes.length === 0) {
      return;
    }

    const tagsIds = Array.from(
      new Set(recipes.map((r) => r.tagIds.flat()).flat())
    );

    setAvailableTags(allTags.filter((t) => tagsIds.includes(t.id)));
  }, [allTags, recipes]);

  useEffect(() => {
    let filteredRecipes = recipes;

    if (search) {
      filteredRecipes = filteredRecipes.filter(({ name }) =>
        name
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(search.toLowerCase().replaceAll(" ", ""))
      );
    }

    if (tagsFilter.length > 0) {
      filteredRecipes = filteredRecipes.filter(({ tagIds }) =>
        tagIds.some((id) => tagsFilter.includes(id))
      );
    }

    setFilteredRecipes(filteredRecipes);
  }, [search, tagsFilter, recipes]);

  const tagsData = availableTags.map((t) => ({ label: t.name, value: t.id }));

  return (
    <div>
      <div className={classes.filters}>
        <TextInput
          className="w-full mt-6"
          leftSection={<IconSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MultiSelect
          label={"Filtrowanie po tagach"}
          data={tagsData}
          className="w-full"
          value={tagsFilter}
          onChange={setTagsFilter}
        />
      </div>

      <div className={classes.list}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <div>brak przepisów spełniających kryteria</div>
        )}
      </div>
    </div>
  );
};
