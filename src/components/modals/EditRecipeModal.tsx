"use client";

import { ContextModalProps } from "@mantine/modals";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MultiSelect,
  NumberInput,
  TextInput,
  Textarea,
} from "react-hook-form-mantine";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { editRecipe } from "@/actions/recipes/recipes";
import { Category, Recipe, Tag } from "@prisma/client";
import { getCategories } from "@/actions/recipes/categories";
import { getTags } from "@/actions/recipes/tags";

const schema = z.object({
  name: z.string(),
  ingredients: z.string(),
  steps: z.string(),
  macro: z.string(),
  calories: z.number().min(10),
  categoryIds: z.array(z.string()).min(1, "Minimum jedna kategoria"),
  tagIds: z.array(z.string()),
});

type Schema = z.infer<typeof schema>;

const classes = {
  form: "flex flex-col gap-4",
};

export const EditRecipeModal = ({
  context,
  id,
  innerProps: { recipe },
}: ContextModalProps<{
  recipe: Recipe;
}>) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const newRecipe = await editRecipe(recipe.id, data);
      setSuccess(true);
      reset(newRecipe);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setTags);
    reset(recipe);
  }, [reset, recipe]);

  const categoriesData = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const tagsData = tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput control={control} name="name" label="Nazwa" />
      <MultiSelect
        control={control}
        name="categoryIds"
        data={categoriesData}
        label="Kategorie"
      />
      <MultiSelect
        control={control}
        name="tagIds"
        data={tagsData}
        label="Tagi"
      />
      <Textarea
        control={control}
        autosize
        minRows={4}
        maxRows={6}
        name="ingredients"
        label="Składniki"
      />
      <Textarea
        control={control}
        autosize
        minRows={4}
        maxRows={6}
        name="steps"
        label="Przygotowanie"
      />
      <NumberInput control={control} name="calories" label="Kalorie" />
      <TextInput control={control} name="macro" label="Makro" />

      <Button
        className="w-full"
        isLoading={loading}
        isSuccess={success}
        isError={error}
      >
        Edytuj przepis
      </Button>
    </form>
  );
};
