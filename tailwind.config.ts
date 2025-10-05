import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-bebas)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
