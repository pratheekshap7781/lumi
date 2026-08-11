import { Link } from "react-router-dom";
import { ArrowRight, FolderOpen } from "lucide-react";
import LearningPathCard from "./LearningPathCard";
import EmptyState from "./EmptyState";

// This is a PREVIEW only — the dashboard shows at most a few paths.
// The full set lives on the dedicated /learning-paths page (a future
// stage); this section just points the way there.
export default function LearningPathsPreview({ paths }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Your Learning Paths</h2>
        {paths.length > 0 && (
          <Link
            to="/learning-paths"
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-accent-strong)" }}
          >
            View all
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {paths.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-accent-soft)" }}
            >
              <FolderOpen size={22} style={{ color: "var(--color-accent-strong)" }} />
            </div>
          }
          title="No learning paths yet."
          description="Once you upload study material, your generated learning paths will show up here."
        />
      )}
    </section>
  );
}
