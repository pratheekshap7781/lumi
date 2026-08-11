import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function ContinueLearningCard({ path, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 flex flex-col gap-4 ${className}`}
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <Code2 size={20} style={{ color: "var(--color-accent-strong)" }} />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: "var(--color-text-muted)" }}
            >
              Continue your journey
            </p>
            <h2 className="text-lg font-semibold truncate">{path.title}</h2>
          </div>
        </div>
        <span className="text-lg font-semibold shrink-0" style={{ color: "var(--color-accent-strong)" }}>
          {path.progress}%
        </span>
      </div>

      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        Current topic: <span style={{ color: "var(--color-text)" }}>{path.currentTopic}</span>
      </p>

      <ProgressBar percent={path.progress} />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {path.topicsCompleted} of {path.totalTopics} topics completed
        </p>
        <Link
          to="/learning-paths"
          className="rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
