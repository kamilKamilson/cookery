import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Header } from "@/components/organisms/Header";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { LoginModal } from "@/components/modals/LoginModal";
import { AddRecipeModal } from "@/components/modals/AddRecipeModal";
import { EditRecipeModal } from "@/components/modals/EditRecipeModal";

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
        <link rel="icon" type="image/png" href="/favicon.png" />
        <ColorSchemeScript />
      </head>
      <body className={montserrat.variable}>
        <MantineProvider theme={theme}>
          <ModalsProvider
            modals={{
              loginModal: LoginModal,
              addRecipeModal: AddRecipeModal,
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
