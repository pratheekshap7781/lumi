export default function ProgressBar({ percent }) {
  return (
    <div
      className="w-full h-2 rounded-full overflow-hidden"
      style={{ backgroundColor: "var(--color-border)" }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${percent}%`, backgroundColor: "var(--color-accent)" }}
      />
    </div>
  );
}
