"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { signOut, useSession } from "next-auth/react";
import { modals } from "@mantine/modals";
import { IconLogout } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

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

  const onLogout = async () => {
    await signOut({
      redirect: false,
    });
  };

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
            src={"/logo.svg"}
            alt="Cookery Logo"
            width={142}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        {status === "authenticated" && (
          <div className="flex items-center gap-4">
            <Button onClick={onAddRecipe}>Dodaj przepis</Button>
            <ActionIcon
              onClick={onLogout}
              h={36}
              w={36}
              className="bg-beige-dark"
            >
              <IconLogout />
            </ActionIcon>
          </div>
        )}
        {status === "unauthenticated" && (
          <Button onClick={onLogin}>Zaloguj</Button>
        )}
      </div>
    </header>
  );
};
