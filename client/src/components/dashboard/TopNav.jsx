import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import LumiOrb from "../LumiOrb";

// Kept intentionally minimal — quizzes, mind maps, flashcards, and
// summaries live inside a Learning Path rather than as top-level areas.
const NAV_LINKS = [
  { label: "Home", to: "/dashboard", Icon: Home },
  { label: "My Learning", to: "/learning-paths", Icon: BookOpen },
  { label: "Progress", to: "/progress", Icon: TrendingUp },
];

export default function TopNav() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{ backgroundColor: "var(--color-surface-glass)", borderColor: "var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
        <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0">
          <LumiOrb size={32} sparkles={false} />
          <span className="font-bold tracking-wide text-lg">LUMI</span>
        </NavLink>

        <nav className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to, Icon }) => (
            <NavLink
              key={label}
              to={to}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--color-surface)" : "transparent",
                color: isActive ? "var(--color-accent-strong)" : "var(--color-text-muted)",
                boxShadow: isActive ? "0 1px 2px rgba(16, 24, 40, 0.06)" : "none",
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-[var(--color-bg-subtle)] transition-colors duration-150"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((open) => !open)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-label="Open profile menu"
            >
              {initials}
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border p-2 z-40"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    boxShadow: "0 12px 30px -8px rgba(16,24,40,0.18)",
                  }}
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                      {user?.email}
                    </p>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--color-bg-subtle)]"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left hover:bg-[var(--color-bg-subtle)]"
                  >
                    <LogOut size={15} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="sm:hidden rounded-full p-2 hover:bg-[var(--color-bg-subtle)] transition-colors duration-150"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="sm:hidden px-4 pb-4 flex flex-col gap-1 border-t pt-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          {NAV_LINKS.map(({ label, to, Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
                color: isActive ? "var(--color-accent-strong)" : "var(--color-text)",
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
