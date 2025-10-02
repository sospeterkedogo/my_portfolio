/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors: {
        customGray: '#666666',
      },
      fontFamily: {
        oswald: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
