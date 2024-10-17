"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "react-hook-form-mantine";
import { Button } from "../atoms/Button";
import { useState } from "react";
import { addTag } from "@/actions/recipes/tags";

const schema = z.object({
  name: z.string(),
});

type Schema = z.infer<typeof schema>;

const classes = {
  form: "flex flex-col gap-4 my-4",
};

export const AddTag = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await addTag(data);
      setSuccess(true);
      reset({
        name: "",
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput control={control} name="name" label="Nazwa" />

      <Button
        className="w-full"
        isLoading={loading}
        isSuccess={success}
        isError={error}
      >
        Dodaj tag
      </Button>
    </form>
  );
};
