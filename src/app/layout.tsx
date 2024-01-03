import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookery",
  description: "Własna lista przepisów",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
