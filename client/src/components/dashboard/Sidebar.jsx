import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Layers,
  Share2,
  TrendingUp,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import LumiOrb from "../LumiOrb";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", Icon: LayoutDashboard },
  { label: "My Learning Paths", to: "/learning-paths", Icon: BookOpen },
  { label: "Study Materials", to: "/study-materials", Icon: FileText },
  { label: "Quizzes", to: "/quizzes", Icon: HelpCircle },
  { label: "Flashcards", to: "/flashcards", Icon: Layers },
  { label: "Mind Maps", to: "/mind-maps", Icon: Share2 },
  { label: "Progress", to: "/progress", Icon: TrendingUp },
];

// `isOpen` / `onClose` control the mobile off-canvas behavior.
// On desktop (md and up) the sidebar is always visible in the layout.
export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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
    <>
      {/* Backdrop, mobile only, shown while the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 flex flex-col border-r
          transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          backgroundColor: "var(--color-bg-subtle)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="px-5 py-6 flex items-center gap-3">
          <LumiOrb size={40} sparkles={false} />
          <div className="min-w-0">
            <p className="font-semibold leading-tight">Lumi</p>
            <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
              Your AI Study Companion
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, to, Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive ? "" : "hover:bg-[var(--color-surface)]"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent-strong)" }
                  : { color: "var(--color-text)" }
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div
          className="px-3 py-4 border-t flex flex-col gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-colors duration-150 hover:bg-[var(--color-surface)]"
            style={{ color: "var(--color-text)" }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-150 hover:bg-[var(--color-surface)]"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
            })}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                {user?.email}
              </p>
            </div>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-colors duration-150 hover:bg-[var(--color-surface)]"
            style={{ color: "var(--color-text)" }}
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
