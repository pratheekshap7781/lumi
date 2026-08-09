const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Small wrapper around fetch for talking to our own backend.
// `credentials: "include"` is essential — it tells the browser to send
// and accept our httpOnly auth cookie on every request.
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}

export const authApi = {
  signup: (payload) =>
    request("/auth/signup", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
  completeOnboarding: () => request("/auth/onboarding", { method: "PATCH" }),
};
