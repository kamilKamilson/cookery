"use client";

import {
  addCategory,
  getCategories,
  removeCategory,
} from "@/actions/ingredients/categories";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import {
  generateRandomHexColor,
  getFontColorFromBackgroundColor,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, Flex, Pill, Stack, Text } from "@mantine/core";
import { IngredientCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorInput, Select, TextInput } from "react-hook-form-mantine";
import { z } from "zod";
import { modals } from "@mantine/modals";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const schema = z.object({
  name: z.string().min(1),
  color: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function IngredientsCategories() {
  const [categories, setCategories] = useState<IngredientCategory[]>([]);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const openModal = (id: string) =>
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
      onConfirm: () => onRemove(id),
    });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await addCategory(data);
    notifications.show({
      title: "Sukces",
      message: "Kategoria składnika dodana poprawnie",
      icon: <IconCheck />,
      color: "green",
    });
    setCategories(await getCategories());
    reset({
      name: "",
      color: generateRandomHexColor(),
    });
  };

  const onRemove = async (id: string) => {
    await removeCategory(id);
    notifications.show({
      title: "Sukces",
      message: "Kategoria składnika usunięta poprawnie",
      icon: <IconCheck />,
      color: "green",
    });
    setCategories(await getCategories());
  };

  useEffect(() => {
    reset({
      color: generateRandomHexColor(),
    });
  }, [reset]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <Box>
      <Stack>
        <StyledHeader>Dodaj nową kategorię składników</StyledHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput control={control} name="name" label="Nazwa" />
            <ColorInput control={control} name="color" label="Kolor" />
            <Button type="submit">Dodaj</Button>
          </Stack>
        </form>
        <StyledHeader>Kategorie składników</StyledHeader>
        {categories.length ? (
          <Flex className="flex-wrap gap-2">
            {categories.map((category) => (
              <Pill
                onRemove={() => openModal(category.id)}
                withRemoveButton
                className="font-bold uppercase"
                c={getFontColorFromBackgroundColor(category.color)}
                bg={category.color}
              >
                {category.name}
              </Pill>
            ))}
          </Flex>
        ) : (
          <Center>
            <Text>Brak kategorii</Text>
          </Center>
        )}
      </Stack>
    </Box>
  );
}
