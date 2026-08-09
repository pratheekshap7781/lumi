import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";

// Routing is set up now so future stages can add pages (Login, Dashboard,
// Upload, etc.) without restructuring the app. Only the Landing route
// is real for now — the rest will be added stage by stage.
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
