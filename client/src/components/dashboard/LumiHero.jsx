import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LumiOrb from "../LumiOrb";

// The dashboard's centerpiece. Copy and CTA change depending on whether
// the student has any real learning data yet — a brand-new account
// should never be greeted with fake progress.
export default function LumiHero({ userName, hasLearningData }) {
  return (
    <div
      className="rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-10 overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        backgroundImage: `
          radial-gradient(circle at 12% 15%, var(--color-blob-1) 0%, transparent 45%),
          radial-gradient(circle at 90% 85%, var(--color-blob-3) 0%, transparent 40%)
        `,
      }}
    >
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 max-w-md order-2 sm:order-1">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
          Hi, {userName}
          <br />
          I'm Lumi, your personal{" "}
          <span style={{ color: "var(--color-accent)" }}>study companion</span>.
        </h1>

        {hasLearningData ? (
          <>
            <p style={{ color: "var(--color-text-muted)" }}>Let's make some progress today.</p>
            <Link
              to="/learning-paths"
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Continue Learning
              <ArrowRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <p style={{ color: "var(--color-text-muted)" }}>
              Upload your study material and I'll build your personalized learning journey.
            </p>
            <Link
              to="/study-materials"
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Upload Study Material
              <ArrowRight size={16} />
            </Link>
          </>
        )}
      </div>

      {/* Bubble stacked above the orb in normal document flow — no
          absolute positioning, so this can't drift into an overlap at
          any screen size. The gap is generous enough to clear the
          orb's glow halo (see LumiOrb's blur-xl glow layer). */}
      <div className="flex flex-col items-center gap-8 order-1 sm:order-2 shrink-0 max-w-full">
        <div
          className="relative z-10 rounded-2xl px-4 py-2 text-sm border text-center max-w-[12rem]"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            boxShadow: "0 8px 20px -6px rgba(16,24,40,0.12)",
          }}
        >
          Let's make today productive!
        </div>
        <LumiOrb size={140} />
      </div>
    </div>
  );
}
