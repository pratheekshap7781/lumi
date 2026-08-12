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

// Separate from request() above because file uploads need
// multipart/form-data — the browser sets that Content-Type (with the
// correct boundary) automatically as long as we don't set our own.
async function uploadRequest(path, formData) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    body: formData,
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

export const materialsApi = {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadRequest("/materials", formData);
  },
  list: () => request("/materials"),
  remove: (id) => request(`/materials/${id}`, { method: "DELETE" }),
};
