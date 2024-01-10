"use client";

import { removeRecipe } from "@/actions/recipes/recipes";
import { RecipeCategories } from "@/components/molecules/RecipeCategories";
import { Button, Group, Pill, PillGroup, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Prisma, Recipe } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const RecipeItem = ({
  data,
}: {
  data: Prisma.RecipeGetPayload<{
    include: {
      categories: {
        include: {
          parent: true;
        };
      };
    };
  }>;
}) => {
  const router = useRouter();

  const openModal = () =>
    modals.openConfirmModal({
      title: "Potwierdź akcję",
      children: (
        <Stack>
          <Text size="sm">Tej akcji nie można cofnąć.</Text>
        </Stack>
      ),
      labels: { confirm: "Usuń", cancel: "Anuluj" },
      onConfirm: () => onRemove(),
    });

  const onRemove = async () => {
    await removeRecipe(data.id);
    router.refresh();
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 border-solid">
      <Text className="font-bold">{data.name}</Text>
      <Text className="mb-4 text-sm text-gray-600">{data.macro}</Text>
      <RecipeCategories categories={data.categories} />
      <Group>
        <Link href={`/dashboard/recipes/edit/${data.slug}`}>
          <Button>Edytuj</Button>
        </Link>

        <Button variant="outline" color="red" onClick={openModal}>
          Usuń
        </Button>
      </Group>
    </div>
  );
};
