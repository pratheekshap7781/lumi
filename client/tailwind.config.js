/** @type {import('tailwindcss').Config} */
export default {
  // Enables toggling dark mode by adding a "dark" class to <html>,
  // instead of relying only on the OS-level preference.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
