/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}",
            "./app/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        win: {
        },
      },
    },
  },
  plugins: [],
};

