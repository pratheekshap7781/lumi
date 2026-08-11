import LumiOrb from "../LumiOrb";

// A small recurring presence — reused wherever Lumi has something calm
// and supportive to say. Not a chatbot, just a contextual message.
export default function LumiMessage({ title = "Lumi says", message, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-5 flex flex-col gap-3 ${className}`}
      style={{ backgroundColor: "var(--color-accent-soft)", borderColor: "var(--color-border)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
        {title}
      </p>
      <div className="flex items-start gap-3">
        <LumiOrb size={44} sparkles={false} />
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
          {message}
        </p>
      </div>
    </div>
  );
}
