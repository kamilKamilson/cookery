import { getRecipes } from "@/actions/recipes/recipes";
import { Box, Center } from "@mantine/core";
import { StyledHeader } from "../components/atoms/StyledHeader";
import { RecipeList } from "@/components/molecules/RecipeList";

const classes = {
  wrapper: "w-full container px-4 py-10",
};

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <Center>
        <Box className={classes.wrapper}>
          <StyledHeader>Przepisy</StyledHeader>
          <RecipeList data={recipes} />
        </Box>
      </Center>
    </main>
  );
}
