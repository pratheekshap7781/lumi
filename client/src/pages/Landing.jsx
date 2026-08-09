import { useTheme } from "../context/ThemeContext";

// Placeholder Landing page. This will be replaced with the real
// landing page design in a later stage — for now it just confirms
// the app, routing, and theme toggle all work.
export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm border"
        style={{
          borderColor: "var(--color-text-muted)",
          color: "var(--color-text)",
        }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <h1 className="text-4xl font-semibold">Lumi</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Your learning journey, with Lumi by your side.
      </p>
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        Project foundation set up successfully.
      </p>
    </div>
  );
}
