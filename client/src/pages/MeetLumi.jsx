import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LumiOrb from "../components/LumiOrb";

export default function MeetLumi() {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleBegin() {
    setLoading(true);
    try {
      await completeOnboarding();
      navigate("/dashboard");
    } catch {
      // If this fails, the user can just try the button again —
      // no need to interrupt them with a scary error page.
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4"
      style={{
        background:
          "linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-via) 55%, var(--color-hero-to) 100%)",
      }}
    >
      <LumiOrb size={120} />
      <h1 className="text-3xl font-semibold mt-2">Hi, I'm Lumi.</h1>
      <p className="max-w-sm" style={{ color: "var(--color-text-muted)" }}>
        I'll help turn your study material into a clear, guided learning
        journey — one topic at a time. Upload what you're studying, and
        I'll walk with you through it, step by step.
      </p>
      <button
        onClick={handleBegin}
        disabled={loading}
        className="mt-2 rounded-lg px-6 py-2.5 font-medium text-white disabled:opacity-60"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        {loading ? "One moment..." : "Let's Begin"}
      </button>
    </div>
  );
}
