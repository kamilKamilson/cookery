"use client";

import { getCategories } from "@/actions/recipes/categories";
import { addRecipe, editRecipe } from "@/actions/recipes/recipes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Prisma, RecipeCategory } from "@prisma/client";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MultiSelect, TextInput, Textarea } from "react-hook-form-mantine";
import { z } from "zod";
import { Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string(),
  ingredients: z.string(),
  steps: z.string(),
  macro: z.string(),
  categoryIds: z.array(z.string()),
});

type Schema = z.infer<typeof schema>;

type RecipeFormProps = {
  defaultValue?: Prisma.RecipeGetPayload<{ include: { categories: true } }>;
};

export const RecipeForm = ({ defaultValue }: RecipeFormProps) => {
  const [categories, setCategories] = useState<
    Prisma.RecipeCategoryGetPayload<{
      include: {
        children: true;
        parent: true;
      };
    }>[]
  >([]);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValue, categoryIds: [] },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      const response = defaultValue
        ? await editRecipe(defaultValue.id, data)
        : await addRecipe(data);

      if (defaultValue?.slug !== response.slug) {
        router.replace(`/dashboard/recipes/edit/${response.slug}`);
        return;
      }

      notifications.show({
        title: "Sukces",
        message: defaultValue
          ? "Przepis zedytowany poprawnie"
          : "Przepis dodany poprawnie",
        icon: <IconCheck />,
        color: "green",
      });
      reset({
        name: "",
        categoryIds: [],
        ingredients: "",
        macro: "",
        steps: "",
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

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (defaultValue && categories.length) {
      reset({
        categoryIds: defaultValue.categoryIds,
      });
    }
  }, [defaultValue, categories]);

  const selectData = [
    ...categories
      .filter(({ parentId, children }) => !parentId && children.length)
      .map(({ name: parentName, children }) => ({
        group: parentName,
        items: children.map(({ id, name }) => ({
          label: `${parentName} - ${name}`,
          value: id,
        })),
      })),
    {
      group: "bez kategorii nadrzędnej",
      items: categories
        .filter(({ parentId, children }) => !parentId && !children.length)
        .map(({ name, id }) => ({
          label: name,
          value: id,
        })),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput control={control} name="name" label="Nazwa" />
        <Textarea
          control={control}
          name="ingredients"
          autosize
          minRows={5}
          label="Składniki"
        />
        <Textarea
          control={control}
          name="steps"
          label="Przygotowanie"
          autosize
          minRows={5}
        />
        <MultiSelect
          label="Kategorie"
          control={control}
          name="categoryIds"
          data={selectData}
          searchable
        />
        <TextInput control={control} name="macro" label="Makro" />
        <Button type="submit">{defaultValue ? "Edytuj" : "Dodaj"}</Button>
      </Stack>
    </form>
  );
};
