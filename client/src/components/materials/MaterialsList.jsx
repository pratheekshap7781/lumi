import { FileText, Trash2 } from "lucide-react";
import { formatFileSize } from "../../utils/formatFileSize";

const STATUS_LABELS = {
  uploaded: "Uploaded",
  processing: "Processing",
  ready: "Ready",
  failed: "Failed",
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MaterialsList({ materials, onDelete }) {
  if (materials.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed p-8 text-center"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <p className="font-medium">No study materials yet.</p>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Files you upload will show up here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border divide-y"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      {materials.map((material) => (
        <div key={material.id} className="flex items-center gap-3 p-4" style={{ borderColor: "var(--color-border)" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#E5484D1a" }}
          >
            <FileText size={18} style={{ color: "#E5484D" }} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{material.originalName}</p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {formatFileSize(material.fileSize)} · Uploaded {formatDate(material.uploadedAt)}
            </p>
          </div>

          <span
            className="text-xs font-medium rounded-full px-2.5 py-1 shrink-0"
            style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent-strong)" }}
          >
            {STATUS_LABELS[material.status] || material.status}
          </span>

          <button
            onClick={() => onDelete(material)}
            className="rounded-lg p-2 shrink-0 hover:bg-[var(--color-bg-subtle)] transition-colors duration-150"
            style={{ color: "var(--color-text-muted)" }}
            aria-label={`Delete ${material.originalName}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
