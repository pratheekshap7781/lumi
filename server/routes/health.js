import { Router } from "express";

const router = Router();

// GET /api/health
// Simple route to confirm the server is running.
// Useful for checking your setup and, later, for deployment checks.
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Lumi server is running",
  });
});

export default router;
