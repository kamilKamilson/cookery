"use client";

import {
  addCategory,
  getCategories,
  removeCategory,
} from "@/actions/recipes/categories";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import {
  generateRandomHexColor,
  getFontColorFromBackgroundColor,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, Flex, Pill, Stack, Text } from "@mantine/core";
import { Prisma, RecipeCategory } from "@prisma/client";
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
  parent: z.string().nullable(),
});

type Schema = z.infer<typeof schema>;

export default function RecipeCategoriesPage() {
  const [categories, setCategories] = useState<
    Prisma.RecipeCategoryGetPayload<{
      include: {
        parent: true;
      };
    }>[]
  >([]);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      parent: null,
    },
  });

  const openModal = (id: string) =>
    modals.openConfirmModal({
      title: "Potwierdź akcję",
      children: (
        <Stack>
          <Text size="sm">Tej akcji nie można cofnąć.</Text>
        </Stack>
      ),
      labels: { confirm: "Usuń", cancel: "Anuluj" },
      onConfirm: () => onRemove(id),
    });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const newCategory = {
      color: data.color,
      name: data.name,
      parentId:
        categories.find((category) => category.name === data.parent)?.id ??
        null,
    };
    await addCategory(newCategory);

    notifications.show({
      title: "Sukces",
      message: "Kategoria przepisu dodana poprawnie",
      icon: <IconCheck />,
      color: "green",
    });
    setCategories(await getCategories());
    reset({
      name: "",
      color: generateRandomHexColor(),
      parent: null,
    });
  };

  const onRemove = async (id: string) => {
    await removeCategory(id);
    notifications.show({
      title: "Sukces",
      message: "Kategoria przepisu usunięta poprawnie",
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
        <StyledHeader>Dodaj nową kategorię przepisów</StyledHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput control={control} name="name" label="Nazwa" />
            <ColorInput control={control} name="color" label="Kolor" />
            <Select
              data={categories
                .filter((category) => !category.parentId)
                .map((category) => category.name)}
              control={control}
              name="parent"
              label="Kategoria nadrzędna"
            />
            <Button type="submit">Dodaj</Button>
          </Stack>
        </form>
        <StyledHeader>Kategorie przepisów</StyledHeader>
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
                {category.parent && `${category.parent.name} - `}
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
