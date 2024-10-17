import { getRecipe } from "@/actions/recipes/recipes";
import { Button, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const classes = {
  button: "text-xs mb-2",
  wrapper: "mx-auto container px-4 py-4 lg:py-10",
  macro: "text-sm text-beige-dark mb-4 md:mb-10 mt-2",
  calories: "text-beige-dark mb-4 md:mb-10 mt-2",

  details:
    "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 text-sm md:text-base",
  title: "text-xl md:text-2xl my-0",
};

export default async function RecipePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return notFound();
  }

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{recipe.name}</h2>
      <div className={classes.calories}>Kalorie: {recipe.calories}</div>
      <div className={classes.macro}>Makro: {recipe.macro}</div>

      <div className={classes.details}>
        <div className="whitespace-pre">{recipe.ingredients}</div>
        <div>{recipe.steps}</div>
      </div>
    </div>
  );
}
