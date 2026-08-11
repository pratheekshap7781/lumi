import { Link } from "react-router-dom";

// Used by any dashboard section that has no real data yet — new
// learning paths, progress, and activity all render through this so
// "no data" looks intentional rather than broken.
export default function EmptyState({ icon, title, description, actionLabel, actionTo }) {
  return (
    <div
      className="rounded-2xl border border-dashed p-8 flex flex-col items-center text-center gap-2"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
    >
      {icon}
      <p className="font-medium mt-1">{title}</p>
      {description && (
        <p className="text-sm max-w-sm" style={{ color: "var(--color-text-muted)" }}>
          {description}
        </p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-3 rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
