/** @type {import('tailwindcss').Config} */
export default {
  // Enables toggling dark mode by adding a "dark" class to <html>,
  // instead of relying only on the OS-level preference.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.08)" },
        },
        sparkle: {
          "0%, 100%": { opacity: 0, transform: "scale(0.6)" },
          "50%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        floatY: "floatY 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
