import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { sendAuthCookie, clearAuthCookie } from "../utils/token.js";
import { toPublicUser } from "../utils/formatUser.js";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_SIGNUP_FIELDS = [
  "name",
  "email",
  "password",
  "gender",
  "dateOfBirth",
  "country",
  "contactNumber",
];

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, gender, dateOfBirth, country, contactNumber } = req.body;

    // 1. Check all required fields were sent
    const missingField = REQUIRED_SIGNUP_FIELDS.find((field) => !req.body[field]);
    if (missingField) {
      return res.status(400).json({ error: `Missing required field: ${missingField}` });
    }

    // 2. Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    // 3. Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    // 4. Check whether the email is already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    // 5. Hash the password — never store it as plain text
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 6. Create the user
    const user = await User.create({
      name,
      email,
      passwordHash,
      gender,
      dateOfBirth,
      country,
      contactNumber,
    });

    // 7. Log the new user in immediately by issuing a token
    sendAuthCookie(res, user._id);

    return res.status(201).json({ user: toPublicUser(user) });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Explicitly include passwordHash — it's excluded by default (select: false)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");

    // Use the same generic error for "no such user" and "wrong password"
    // so we don't reveal which one was incorrect.
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    sendAuthCookie(res, user._id);

    return res.status(200).json({ user: toPublicUser(user) });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logged out successfully." });
});

// GET /api/auth/me
router.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({ user: toPublicUser(req.user) });
});

// PATCH /api/auth/onboarding
// Marks onboarding as complete after the user finishes the "Meet Lumi" screen.
router.patch("/onboarding", requireAuth, async (req, res) => {
  try {
    req.user.onboardingCompleted = true;
    await req.user.save();
    return res.status(200).json({ user: toPublicUser(req.user) });
  } catch (error) {
    console.error("Onboarding update error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
