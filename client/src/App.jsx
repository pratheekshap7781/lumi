import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MeetLumi from "./pages/MeetLumi";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/meet-lumi"
              element={
                <ProtectedRoute>
                  <MeetLumi />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning-paths"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ComingSoon
                      title="Your Learning Paths"
                      description="This is where every learning path Lumi builds for you will live. Upload study material to create your first one."
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/study-materials"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ComingSoon
                      title="Study Materials"
                      description="Uploading PDFs, slides, and documents is coming soon — this is where you'll manage everything you've shared with Lumi."
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ComingSoon
                      title="Your progress will appear here once you start learning."
                      description="Detailed analytics across every path will live here soon."
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ComingSoon
                      title="Profile"
                      description="Account details and settings will live here soon."
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
