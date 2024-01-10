"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput, TextInput } from "react-hook-form-mantine";
import { Button, Center, Paper, Stack } from "@mantine/core";
import { signIn } from "next-auth/react";
import { texts } from "@/lib/texts";

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

const labels = {
  username: "Nazwa użytkownika",
  password: "Hasło",
};

export default function LoginPage() {
  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
    } catch (error) {}
  };

  return (
    <Center>
      <Paper w={400} shadow="sm" p="md" mt="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              control={control}
              name="username"
              label={labels.username}
            />
            <PasswordInput
              control={control}
              name="password"
              label={labels.password}
            />
            <Button type="submit">{texts.login}</Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
