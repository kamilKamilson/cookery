"use client";

import { ContextModalProps, modals } from "@mantine/modals";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TextInput } from "react-hook-form-mantine";
import { IconLoader2, IconSearch, IconSend } from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Pill,
  PillGroup,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const schema = z.object({
  search: z.string().min(0),
});

type Schema = z.infer<typeof schema>;

const classes = {
  form: "flex flex-col gap-4",
};

export const SearchModal = ({}: ContextModalProps) => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<
    Prisma.RecipeGetPayload<{ include: { categories: true; tags: true } }>[]
  >([]);

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    const recipes = await (
      await fetch("/api/search", {
        body: JSON.stringify({
          query: data.search,
        }),
        method: "POST",
      })
    ).json();

    setRecipes(recipes);
    setLoading(false);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="sm">
          <TextInput
            disabled={loading}
            control={control}
            name="search"
            leftSection={<IconSearch />}
            className="grow"
          />
          <Button type="submit">
            <IconSearch />
          </Button>
        </Flex>
      </form>
      <Stack gap={"md"}>
        {loading ? (
          <Flex my="md" justify={"center"}>
            <IconLoader2 className="animate-spin text-beige-dark" />
          </Flex>
        ) : recipes.length ? (
          recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/przepis/${recipe.slug}`}
              className="no-underline "
              onClick={() => modals.closeAll()}
            >
              <div className="p-2 bg-neutral-50 rounded-md">
                <Title order={6} className="text-beige-dark ">
                  {recipe.name}
                </Title>
                <PillGroup>
                  {recipe.categories.map((c) => (
                    <Pill bg="gray" c="white" key={c.id}>
                      {c.name}
                    </Pill>
                  ))}
                </PillGroup>
                <PillGroup className="mt-2">
                  {recipe.tags.map((t) => (
                    <Pill key={t.id}>{t.name}</Pill>
                  ))}
                </PillGroup>
                <Text size="xs" c={"gray"} mt="xs">
                  {recipe.macro}
                </Text>
              </div>
            </Link>
          ))
        ) : (
          <div className="font-medium text-neutral-400 text-center my-4">
            brak przepisów
          </div>
        )}
      </Stack>
    </Stack>
  );
};
