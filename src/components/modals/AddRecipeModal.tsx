"use client";

import { ContextModalProps } from "@mantine/modals";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from "react-hook-form-mantine";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addRecipe } from "@/actions/recipes/recipes";
import { Prisma } from "@prisma/client";
import { getCategories } from "@/actions/recipes/categories";

const schema = z.object({
  name: z.string(),
  ingredients: z.string(),
  steps: z.string(),
  macro: z.string(),
  categoryId: z.string(),
});

type Schema = z.infer<typeof schema>;

const classes = {
  form: "flex flex-col gap-4",
};

export const AddRecipeModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await addRecipe(data);
      setSuccess(true);
      reset({
        name: "",
        categoryId: null as unknown as string,
        steps: "",
        ingredients: "",
        macro: "",
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const categoriesData = categories.map((parentCategory) => ({
    group: parentCategory.name,
    items: parentCategory.children.map((category) => ({
      label: `${parentCategory.name} - ${category.name}`,
      value: category.id,
    })),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput control={control} name="name" label="Nazwa" />
      <Select
        control={control}
        name="categoryId"
        data={categoriesData}
        label="Kategoria"
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
      <TextInput control={control} name="macro" label="Makro" />

      <Button
        className="w-full"
        isLoading={loading}
        isSuccess={success}
        isError={error}
      >
        Dodaj przepis
      </Button>
    </form>
  );
};
