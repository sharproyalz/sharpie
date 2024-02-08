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
        primary: "#00ADB5",
        secondary: "#282828",
        white_accent: "#EEEEEE",
        black_accent: "#1E1E1E",
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
