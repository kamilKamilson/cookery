import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  MantineTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Header } from "@/components/organisms/Header";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { LoginModal } from "@/components/modals/LoginModal";
import { AddModal } from "@/components/modals/AddModal";
import { EditRecipeModal } from "@/components/modals/EditRecipeModal";
import { SearchModal } from "@/components/modals/SearchModal";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Cookery",
  description: "Przepisy",
};

const theme = {
  primaryColor: "beige",
  colors: {
    beige: [
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
      "#C89D83",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <ColorSchemeScript />
      </head>
      <body className={montserrat.variable}>
        <MantineProvider theme={theme as unknown as MantineTheme}>
          <ModalsProvider
            modals={{
              searchModal: SearchModal,
              loginModal: LoginModal,
              addModal: AddModal,
              editRecipeModal: EditRecipeModal,
            }}
          >
            <SessionProviderWrapper>
              <Header />
              <main className="py-16">{children}</main>
            </SessionProviderWrapper>
          </ModalsProvider>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
