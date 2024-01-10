"use client";

import { StyledHeader } from "@/components/atoms/StyledHeader";
import { Box, Stack } from "@mantine/core";
import { RecipeForm } from "../components/RecipeForm";
export const dynamic = "force-dynamic";

export default function RecipesAddNew() {
  return (
    <Box>
      <Stack>
        <StyledHeader>Dodaj nowy przepis</StyledHeader>
        <RecipeForm />
      </Stack>
    </Box>
  );
}
