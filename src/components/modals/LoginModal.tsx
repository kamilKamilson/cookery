"use client";

import { ContextModalProps } from "@mantine/modals";
import { setErrorMap, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput, TextInput } from "react-hook-form-mantine";
import { Button } from "../atoms/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(0, "Pole jest wymagane"),
  password: z.string().min(0, "Pole jest wymagane"),
});

type Schema = z.infer<typeof schema>;

const classes = {
  form: "flex flex-col gap-4",
};

export const LoginModal = ({ context, id, innerProps }: ContextModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    ("use server");
    signIn("credentials", { ...data, redirect: false })
      .then(({ ok, status }: any) => {
        if (ok) {
          setSuccess(true);
          setTimeout(() => {
            context.closeModal(id);
            router.refresh();
          }, 2000);
        }
        if (!ok && status === 401) {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput
        color="beige"
        control={control}
        name="username"
        label="Nazwa użytkownika"
      />
      <PasswordInput control={control} name="password" label="Hasło" />
      <Button
        className="w-full"
        isLoading={loading}
        isSuccess={success}
        isError={error}
      >
        Zaloguj
      </Button>
    </form>
  );
};
