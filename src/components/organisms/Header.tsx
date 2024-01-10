import { texts } from "@/lib/texts";
import {
  ActionIcon,
  Box,
  Center,
  Drawer,
  Flex,
  NavLink,
  Text,
} from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { IngredientsIcon } from "../atoms/icons/IngredientsIcon";
import { RecipeBookIcon } from "../atoms/icons/RecipeBookIcon";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

const classes = {
  wrapper: "fixed top-0 left-0 w-full h-12 bg-white shadow-sm bg-white z-[99]",
  inner: "container mx-auto h-full px-4",
};

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu">
        <NavLink
          label={texts.recipes}
          leftSection={<RecipeBookIcon />}
          variant="filled"
        >
          <NavLink label={texts.addNew} href="/dashboard/recipes/add-new" />
          <NavLink label={texts.list} href="/dashboard/recipes" />
          <NavLink
            label={texts.categories}
            href="/dashboard/recipes/categories"
          />
        </NavLink>
        <NavLink label={texts.ingredients} leftSection={<IngredientsIcon />}>
          <NavLink label={texts.list} href="/dashboard/ingredients" />
          <NavLink
            label={texts.categories}
            href="/dashboard/ingredients/categories"
          />
        </NavLink>
      </Drawer>
      <Box className={classes.wrapper}>
        <Flex
          align={"center"}
          justify={"space-between"}
          className={classes.inner}
        >
          <Link href={"/"} className="block h-[30px]">
            <Image src="/logo.png" width={100} height={30} alt="logo" />
          </Link>
          <ActionIcon variant="white" c="dark">
            <IconMenu2 onClick={open} />
          </ActionIcon>
        </Flex>
      </Box>
    </>
  );
};
