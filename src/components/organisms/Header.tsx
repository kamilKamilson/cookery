"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { modals } from "@mantine/modals";

const classes = {
  wrapper:
    "z-[99] bg-white shadow-sm h-16 w-full fixed left-0 top-0 flex items-center",
  innerWrapper: "container px-4 mx-auto flex items-center justify-between",
};

export const Header = () => {
  const { status } = useSession();

  const onLogin = () =>
    modals.openContextModal({
      modal: "loginModal",
      title: "Zaloguj",
      innerProps: {},
    });

  const onAddRecipe = () =>
    modals.openContextModal({
      modal: "addRecipeModal",
      title: "Dodaj przepis",
      innerProps: {},
      size: "lg",
    });

  return (
    <header className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <Link href={"/"} className="flex">
          <Image
            src={"./logo.svg"}
            alt="Cookery Logo"
            width={142}
            height={40}
          />
        </Link>
        {status === "authenticated" && (
          <Button onClick={onAddRecipe}>Dodaj przepis</Button>
        )}
        {status === "unauthenticated" && (
          <Button onClick={onLogin}>Zaloguj</Button>
        )}
      </div>
    </header>
  );
};
