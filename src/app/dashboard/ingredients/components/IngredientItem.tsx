"use client";

import { removeIngredient } from "@/actions/ingredients/ingredients";
import { Pill, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Ingredient } from "@prisma/client";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type IngredientItemProps = {
  data: Ingredient;
};

export const IngredientItem = ({ data: { name, id } }: IngredientItemProps) => {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Potwierdź akcję",
      children: (
        <Stack>
          <Text size="sm">
            Uwaga! Do jakiej kategorii chcesz przypisać składniki, które
            posiadają usuwaną kategorię?
          </Text>
        </Stack>
      ),
      labels: { confirm: "Usuń", cancel: "Anuluj" },
      onConfirm: () => onRemove(),
    });

  const router = useRouter();

  const onRemove = async () => {
    try {
      await removeIngredient(id);
      notifications.show({
        title: "Sukces",
        message: "Składnik usunięty poprawnie",
        icon: <IconCheck />,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Błąd",
        message: (error as Error).message,
        icon: <IconX />,
        color: "red",
      });
    }
    router.refresh();
  };

  return (
    <Pill withRemoveButton className="text-sm" onRemove={openModal}>
      {name}
    </Pill>
  );
};
