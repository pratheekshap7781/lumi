import { Link } from "react-router-dom";
import LumiOrb from "../components/LumiOrb";

export default function ComingSoon({
  title = "This part of Lumi is still being built.",
  description = "Check back soon — for now, head back to your dashboard.",
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
      <LumiOrb size={72} />
      <h1 className="text-2xl font-semibold mt-2">{title}</h1>
      <p className="max-w-sm" style={{ color: "var(--color-text-muted)" }}>
        {description}
      </p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
