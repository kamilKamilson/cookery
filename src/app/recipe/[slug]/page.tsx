import { getRecipe } from "@/actions/recipes/recipes";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import { RecipeCategories } from "@/components/molecules/RecipeCategories";
import { Box, Button, Center, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const classes = {
  main: "md:pt-12",
  wrapper: "w-full container px-4 py-4  md:py-10",
};

export default async function RecipePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!slug) {
    return notFound();
  }

  const recipe = await getRecipe(slug);

  if (!recipe) {
    return notFound();
  }

  return (
    <main className={classes.main}>
      <Center>
        <Box className={classes.wrapper}>
          <Link href={"/"}>
            <Button className="mb-6" leftSection={<IconChevronLeft />}>
              Wróć do listy
            </Button>
          </Link>
          <StyledHeader>{recipe.name}</StyledHeader>
          <Text className="mb-4 text-xs md:text-sm">{recipe.macro}</Text>
          <RecipeCategories categories={recipe.categories} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4 md:gap-6">
            <div className="whitespace-pre-wrap  ">
              <Text className="text-sm md:text-base">{recipe.ingredients}</Text>
            </div>
            <div className=" text-sm md:text-base">{recipe.steps}</div>
          </div>
        </Box>
      </Center>
    </main>
  );
}
