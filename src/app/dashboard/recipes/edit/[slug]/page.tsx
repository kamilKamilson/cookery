import { getRecipe } from "@/actions/recipes/recipes";
import { notFound } from "next/navigation";
import { RecipeForm } from "../../components/RecipeForm";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import { Button, Stack } from "@mantine/core";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default async function EditPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return notFound();
  }

  return (
    <div>
      <Stack>
        <Link prefetch={false} href={"/dashboard/recipes"}>
          <Button leftSection={<IconChevronLeft />}>Wróć do listy</Button>
        </Link>
        <StyledHeader>Edytuj przepis: {recipe.name}</StyledHeader>
        <RecipeForm defaultValue={recipe} />
      </Stack>
    </div>
  );
}
