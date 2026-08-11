import { Link } from "react-router-dom";
import { UploadCloud, FileText, File, Image } from "lucide-react";

const FILE_CHIPS = [
  { Icon: FileText, tint: "#E5484D" },
  { Icon: File, tint: "#F5A623" },
  { Icon: Image, tint: "#4C6FFF" },
];

// The actual upload → processing → learning-path pipeline isn't built
// yet, so this links to the Study Materials placeholder — the visual
// interaction is ready for when that pipeline exists.
export default function UploadCard() {
  return (
    <Link
      to="/study-materials"
      className="rounded-2xl border border-dashed p-6 sm:p-8 flex flex-col items-center text-center gap-3 transition-colors duration-150 hover:bg-[var(--color-bg-subtle)]"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-accent-soft)" }}
      >
        <UploadCloud size={22} style={{ color: "var(--color-accent-strong)" }} />
      </div>
      <p className="font-medium">Upload your file</p>
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        PDF, Notes, Images — Anything!
      </p>
      <div className="flex items-center gap-2 mt-1">
        {FILE_CHIPS.map(({ Icon, tint }, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${tint}1a` }}
          >
            <Icon size={14} style={{ color: tint }} />
          </div>
        ))}
      </div>
    </Link>
  );
}
