import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookery",
  description: "Przepisy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <MantineProvider>
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
