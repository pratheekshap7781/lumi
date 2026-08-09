import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Placeholder only — the real dashboard (Continue Learning, My Learning
// Paths, Overall Progress, Upload) is built in a later stage.
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-semibold">Welcome back, {user?.name}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Your dashboard will live here soon.
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 rounded-lg px-5 py-2 text-sm border"
        style={{ borderColor: "var(--color-text-muted)" }}
      >
        Log out
      </button>
    </div>
  );
}
