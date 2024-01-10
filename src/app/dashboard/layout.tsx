"use client";

import { ReactNode } from "react";
import { Header } from "../../components/organisms/Header";
import { Box, Center, Paper } from "@mantine/core";

const classes = {
  main: "pt-12",
  wrapper: "w-full container px-4 py-10",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Center>
          <Box className={classes.wrapper}>{children}</Box>
        </Center>
      </main>
    </>
  );
}
