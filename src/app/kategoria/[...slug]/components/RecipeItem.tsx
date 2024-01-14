"use client";

import { removeRecipe } from "@/actions/recipes/recipes";
import { Box, Button, ButtonGroup, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const classes = {
  title: "font-bold text-base font-sans my-0",
  recipe:
    "border border-solid border-beige/20 rounded-md shadow-sm p-4 no-underline text-brown-dark",
  recipeMacro: "text-xs mt-1 text-beige-dark ",
};
export const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const { status } = useSession();

  const onRemove = (event: any) => {
    event.preventDefault();
    modals.openConfirmModal({
      title: "Czy jesteś pewny?",
      children: <Text size="sm">Tej akcji nie można cofnąć</Text>,
      labels: { confirm: "Usuń", cancel: "Anuluj" },
      onConfirm: async () => {
        await removeRecipe(recipe.id);
      },
    });
  };

  const onEdit = (event: any) => {
    event.preventDefault();
    modals.openContextModal({
      modal: "editRecipeModal",
      title: "Edytuj przepis",
      innerProps: {
        recipe,
      },
      size: "lg",
    });
  };

  return (
    <Box
      component={Link}
      href={`/przepis/${recipe.slug}`}
      key={recipe.id}
      className={classes.recipe}
    >
      <h3 className={classes.title}>{recipe.name}</h3>
      <p className={classes.recipeMacro}>{recipe.macro}</p>
      {status === "authenticated" && (
        <ButtonGroup className="gap-4 mt-4">
          <Button fullWidth onClick={onEdit}>
            edytuj
          </Button>
          <Button fullWidth variant="outline" onClick={onRemove}>
            usuń
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};
