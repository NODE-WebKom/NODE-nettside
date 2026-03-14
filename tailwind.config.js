/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        win: {
          bg: "#c0c0c0",
          mid: "#808080",
          dark: "#404040",
        },
      },
    },
  },
  plugins: [],
};

// finks dette