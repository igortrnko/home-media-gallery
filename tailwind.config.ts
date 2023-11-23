import type { Config } from "tailwindcss";
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      amber,
      blue,
      blueGrey,
      brown,
      common,
      cyan,
      deepOrange,
      deepPurple,
      green,
      grey,
      indigo,
      lightBlue,
      lightGreen,
      lime,
      orange,
      pink,
      purple,
      red,
      teal,
      yellow,
    },
    extend: {
      keyframes: {
        opacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        opacity: "opacity 0.7s ease-in",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
export default config;
