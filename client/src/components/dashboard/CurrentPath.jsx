import { Link } from "react-router-dom";
import { Compass, Plus, Code2, FileText } from "lucide-react";
import ProgressBar from "./ProgressBar";

const AWAITING_COPY = {
  uploaded: {
    title: "Your material has been uploaded.",
    description: "Ready for Lumi to process.",
  },
  processing: {
    title: "Processing your material...",
    description: "This won't take long.",
  },
  failed: {
    title: "Something went wrong processing your material.",
    description: "Try uploading it again.",
  },
};

// `path` is null for a user with no active learning path — shown as an
// inviting prompt to upload, never as fake progress. Once a real path
// exists (from an upload → Lumi processing → path generation), pass
// the real path object here instead and this same component renders
// the active view.
//
// `latestMaterial` (used only when `path` is null) reflects a real
// uploaded file that hasn't been turned into a path yet — this is
// honest status, not a fabricated learning path.
export default function CurrentPath({ path, latestMaterial }) {
  return (
    <section>
      <h2 className="font-semibold mb-3">Current Path</h2>

      {path ? (
        <div
          className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-4"
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
                <h3 className="text-lg font-semibold truncate">{path.title}</h3>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  Current topic: <span style={{ color: "var(--color-text)" }}>{path.currentTopic}</span>
                </p>
              </div>
            </div>
            <span className="text-lg font-semibold shrink-0" style={{ color: "var(--color-accent-strong)" }}>
              {path.progress}%
            </span>
          </div>

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
      ) : latestMaterial ? (
        <div
          className="rounded-2xl border p-6 sm:p-8 flex items-center gap-4"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <FileText size={24} style={{ color: "var(--color-accent-strong)" }} />
          </div>
          <div>
            <p className="font-medium">
              {(AWAITING_COPY[latestMaterial.status] || AWAITING_COPY.uploaded).title}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {(AWAITING_COPY[latestMaterial.status] || AWAITING_COPY.uploaded).description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--color-accent-soft)" }}
            >
              <Compass size={24} style={{ color: "var(--color-accent-strong)" }} />
            </div>
            <div>
              <p className="font-medium">No active path yet</p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                Upload a file to create your first learning path.
              </p>
            </div>
          </div>

          <Link
            to="/study-materials"
            className="w-28 h-28 rounded-2xl border border-dashed flex flex-col items-center justify-center gap-1.5 text-xs font-medium shrink-0 transition-colors duration-150 hover:bg-[var(--color-bg-subtle)]"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent-strong)" }}
          >
            <Plus size={20} />
            Upload
            <br />
            your file
          </Link>
        </div>
      )}
    </section>
  );
}
