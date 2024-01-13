import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          dark: "#A07C66",
          DEFAULT: "#C89D83",
        },
        brown: {
          dark: "#231D1A",
          DEFAULT: "#362B25",
        },
        accent: {
          red: "#DD3636",
          green: "#5EB95C",
          gray: "#BEBEBE",
        },
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      dropShadow: {
        buttonText: "0 1px 5px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
export default config;
