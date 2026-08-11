import { Menu } from "lucide-react";
import { getTimeOfDayGreeting } from "../../utils/greeting";

export default function DashboardHeader({ userName, onMenuClick }) {
  return (
    <header className="px-4 sm:px-8 pt-6 pb-2 flex items-start gap-3">
      <button
        onClick={onMenuClick}
        className="md:hidden mt-1 rounded-lg p-2 border shrink-0"
        style={{ borderColor: "var(--color-border)" }}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-semibold truncate">
          {getTimeOfDayGreeting()},{" "}
          <span style={{ color: "var(--color-accent-strong)" }}>{userName}</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Ready to continue your learning journey?
        </p>
      </div>
    </header>
  );
}
