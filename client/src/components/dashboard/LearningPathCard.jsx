import { Link } from "react-router-dom";
import { Code2, Cpu, Network } from "lucide-react";
import ProgressBar from "./ProgressBar";

const ICONS_BY_KEY = { code: Code2, cpu: Cpu, network: Network };

export default function LearningPathCard({ path }) {
  const Icon = ICONS_BY_KEY[path.icon] || Code2;

  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-3"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--color-accent-soft)" }}
        >
          <Icon size={18} style={{ color: "var(--color-accent-strong)" }} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{path.title}</h3>
          <p className="text-sm mt-0.5 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
            {path.description}
          </p>
        </div>
      </div>

      <ProgressBar percent={path.progress} />

      <div className="flex items-center justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
        <span>{path.progress}% complete</span>
        <span>
          {path.topicsCompleted}/{path.totalTopics} topics
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mt-1">
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Last studied {path.lastStudied}
        </p>
        <Link
          to="/learning-paths"
          className="rounded-lg px-3 py-1.5 text-xs font-medium shrink-0"
          style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent-strong)" }}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
