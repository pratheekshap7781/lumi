import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, HelpCircle, PlayCircle, History } from "lucide-react";
import EmptyState from "./EmptyState";

const TYPE_CONFIG = {
  completed: { Icon: CheckCircle2, tint: "#4CAF7D" },
  quiz: { Icon: HelpCircle, tint: "#6C8CFF" },
  started: { Icon: PlayCircle, tint: "#F5A623" },
};

export default function RecentActivity({ activity, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Recent Activity</h2>
        {activity.length > 0 && (
          <Link
            to="/progress"
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-accent-strong)" }}
          >
            View all
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {activity.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {activity.map((item) => {
            const { Icon, tint } = TYPE_CONFIG[item.type] || { Icon: CheckCircle2, tint: "#8B7CF6" };
            return (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tint}22` }}
                >
                  <Icon size={16} style={{ color: tint }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate">{item.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {item.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          icon={<History size={28} style={{ color: "var(--color-text-muted)" }} />}
          title="No activity yet."
          description="Your learning activity will appear here once you begin."
        />
      )}
    </div>
  );
}
