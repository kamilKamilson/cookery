"use client";

import { getCategories } from "@/actions/ingredients/categories";
import { saveIngredient } from "@/actions/ingredients/ingredients";
import { StyledHeader } from "@/components/atoms/StyledHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Group, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IngredientCategory } from "@prisma/client";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NumberInput, Select, TextInput } from "react-hook-form-mantine";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  category: z.string(),
});

type Schema = z.infer<typeof schema>;

export const AddNew = () => {
  const [categories, setCategories] = useState<IngredientCategory[]>([]);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const ingredientData = {
      name: data.name,
      categoryId: categories.find(({ name }) => name === data.category)
        ?.id as string,
    };

    try {
      await saveIngredient(ingredientData);
      notifications.show({
        title: "Sukces",
        message: "Składnik dodany poprawnie",
        icon: <IconCheck />,
        color: "green",
      });
      reset({
        name: "",
        category: null as unknown as string,
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Błąd",
        message: (error as Error).message,
        icon: <IconX />,
        color: "red",
      });
    }
  };

  const onReset = () => {
    reset({
      name: "",
      category: null as unknown as string,
    });
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <Box>
      <Stack>
        <StyledHeader>Dodaj nowy składnik</StyledHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput control={control} name="name" label="Nazwa" />
            <Select
              label="Kategoria"
              data={categories.map((category) => category.name)}
              control={control}
              name="category"
            />
            <Group>
              <Button variant="outline" onClick={onReset}>
                Resetuj
              </Button>
              <Button type="submit">Dodaj</Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
