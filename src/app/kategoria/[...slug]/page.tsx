import { getCategory } from "@/actions/recipes/categories";
import { Box, Button, Text, Title } from "@mantine/core";
import { SubCategoryItem } from "./components/SubCategoryItem";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { getRecipesByCategories } from "@/actions/recipes/recipes";
import { notFound } from "next/navigation";
import { RecipeItem } from "./components/RecipeItem";

const classes = {
  wrapper: "mx-auto container px-4 py-4 lg:py-10",
  recipes: "grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
  title: "font-sans text-brown-dark text-xl md:text-2xl",
  backButton: "text-xs mb-2",
};

export default async function CategoryPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const category = await getCategory(slug.at(-1) as string);

  if (!category) {
    return notFound();
  }

  const recipes = await getRecipesByCategories(category?.id);

  return (
    <div className={classes.wrapper}>
      {category?.parent && (
        <Button
          className={classes.backButton}
          leftSection={<IconChevronLeft size={16} />}
          component={Link}
          href={`/kategoria/${category.parent.slug}`}
        >
          wszystkie w kategorii {category.parent.name}
        </Button>
      )}
      <Title className={classes.title} order={2}>
        {category?.name}
      </Title>
      {category?.children && (
        <div className="flex gap-2 my-2">
          {category.children.map((child) => (
            <SubCategoryItem key={child.id} category={child} />
          ))}
        </div>
      )}

      <div className={classes.recipes}>
        {recipes.length ? (
          recipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <div>brak przepisów w tej kategorii</div>
        )}
      </div>
    </div>
  );
}
