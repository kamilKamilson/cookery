import { getCategory } from "@/actions/recipes/categories";
import { getRecipesByCategories } from "@/actions/recipes/recipes";
import { notFound } from "next/navigation";
import { RecipeList } from "./components/RecipeList";

const classes = {
  wrapper: "mx-auto container px-4 py-4 lg:py-10",
  title: "font-sans text-brown-dark text-xl md:text-2xl my-0",
  backButton: "text-xs mb-2",
};

export default async function CategoryPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  const recipes = await getRecipesByCategories(category.id);

  return (
    <div className={classes.wrapper}>
      <RecipeList recipes={recipes} />
    </div>
  );
}
