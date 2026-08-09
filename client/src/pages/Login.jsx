import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const user = await login({ email, password });
      navigate(user.onboardingCompleted ? "/dashboard" : "/meet-lumi");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Log in to continue where you left off.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 bg-transparent"
              style={{ borderColor: "var(--color-text-muted)" }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 bg-transparent"
              style={{ borderColor: "var(--color-text-muted)" }}
            />
          </div>

          {error && (
            <p className="text-sm rounded-lg px-3 py-2" style={{ color: "#dc2626", backgroundColor: "#fee2e2" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg py-2.5 font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm mt-6 text-center" style={{ color: "var(--color-text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium" style={{ color: "var(--color-accent)" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
