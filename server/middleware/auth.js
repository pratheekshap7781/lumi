import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/token.js";

// Protects a route: only lets the request through if it has a valid
// auth cookie. Attaches the logged-in user to req.user so later route
// handlers can use it.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Covers expired tokens, tampered tokens, and malformed tokens
    return res.status(401).json({ error: "Session expired. Please log in again." });
  }
}
