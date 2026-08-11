import { Link } from "react-router-dom";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LumiOrb from "../components/LumiOrb";
import Footer from "../components/dashboard/Footer";

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--color-bg)",
        backgroundImage: `
          radial-gradient(600px circle at 8% -10%, var(--color-blob-1) 0%, transparent 60%),
          radial-gradient(500px circle at 92% 8%, var(--color-blob-2) 0%, transparent 55%),
          radial-gradient(650px circle at 50% 110%, var(--color-blob-3) 0%, transparent 60%)
        `,
        backgroundAttachment: "fixed",
        color: "var(--color-text)",
      }}
    >
      <header
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ backgroundColor: "var(--color-surface-glass)", borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LumiOrb size={32} sparkles={false} />
            <span className="font-bold tracking-wide text-lg">LUMI</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-[var(--color-bg-subtle)] transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full flex flex-col-reverse sm:flex-row items-center gap-14">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5 max-w-lg">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border"
              style={{
                backgroundColor: "var(--color-surface-glass)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              ✦ Your AI study companion
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Learn smarter.
              <br />
              Achieve <span style={{ color: "var(--color-accent)" }}>more</span>.
            </h1>
            <p className="text-base sm:text-lg" style={{ color: "var(--color-text-muted)" }}>
              Your personal AI study companion that turns your study material into a
              personalized learning journey.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Get started
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium border transition-transform duration-150 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                Log in
              </Link>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: 240, height: 240 }}
          >
            <div
              className="absolute inset-0 rounded-full border border-dashed animate-spin"
              style={{ borderColor: "var(--color-border)", opacity: 0.7, animationDuration: "28s" }}
              aria-hidden="true"
            />
            <span
              className="absolute w-2 h-2 rounded-full animate-sparkle"
              style={{ top: "8%", right: "18%", backgroundColor: "var(--color-blob-3)", animationDelay: "0.3s" }}
              aria-hidden="true"
            />
            <span
              className="absolute w-1.5 h-1.5 rounded-full animate-sparkle"
              style={{ bottom: "14%", left: "10%", backgroundColor: "var(--color-blob-1)", animationDelay: "1.2s" }}
              aria-hidden="true"
            />
            <span
              className="absolute w-1.5 h-1.5 rounded-full animate-sparkle"
              style={{ top: "20%", left: "4%", backgroundColor: "var(--color-blob-2)", animationDelay: "2s" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full opacity-40 blur-lg"
              style={{ width: 130, height: 24, backgroundColor: "var(--color-blob-2)" }}
              aria-hidden="true"
            />
            <LumiOrb size={190} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
