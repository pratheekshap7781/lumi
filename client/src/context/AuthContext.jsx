import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // `checking` is true only while we're finding out if a cookie session
  // already exists (e.g. on page refresh). Routes wait for this before
  // deciding whether to redirect to /login.
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  async function signup(payload) {
    const data = await authApi.signup(payload);
    setUser(data.user);
    return data.user;
  }

  async function login(payload) {
    const data = await authApi.login(payload);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  async function completeOnboarding() {
    const data = await authApi.completeOnboarding();
    setUser(data.user);
    return data.user;
  }

  return (
    <AuthContext.Provider
      value={{ user, checking, signup, login, logout, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
