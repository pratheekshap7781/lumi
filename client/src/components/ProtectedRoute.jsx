import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any page that requires login with this component.
// - Not logged in           -> redirect to /login
// - Logged in, onboarding
//   not done, not already
//   on /meet-lumi            -> redirect to /meet-lumi
// - Otherwise               -> render the page
export default function ProtectedRoute({ children }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "var(--color-text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.onboardingCompleted && location.pathname !== "/meet-lumi") {
    return <Navigate to="/meet-lumi" replace />;
  }

  return children;
}
