import { Link } from "react-router-dom";
import { UploadCloud, PlusCircle, HelpCircle, Share2 } from "lucide-react";

const ACTIONS = [
  { label: "Upload Notes", to: "/study-materials", Icon: UploadCloud },
  { label: "Create New Path", to: "/learning-paths", Icon: PlusCircle },
  { label: "Take a Quiz", to: "/quizzes", Icon: HelpCircle },
  { label: "Generate Mind Map", to: "/mind-maps", Icon: Share2 },
];

// These lead to placeholder pages for now — the AI/upload/quiz/mind-map
// features themselves are built in later stages.
export default function QuickActions() {
  return (
    <section>
      <h2 className="font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ACTIONS.map(({ label, to, Icon }) => (
          <Link
            key={label}
            to={to}
            className="rounded-2xl border p-5 flex flex-col items-center text-center gap-2 transition-transform duration-150 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-accent-soft)" }}
            >
              <Icon size={18} style={{ color: "var(--color-accent-strong)" }} />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
