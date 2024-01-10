import { getRecipes } from "@/actions/recipes/recipes";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import { RecipeItem } from "./components/RecipeItem";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div>
      <StyledHeader>Przepisy</StyledHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} data={recipe} />
        ))}
      </div>
    </div>
  );
}
