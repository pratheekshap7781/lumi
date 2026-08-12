import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import materialsRouter from "./routes/materials.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Allow the frontend (running on a different port) to call this API.
// `credentials: true` + an explicit origin (not "*") are required so the
// browser will send/receive our httpOnly auth cookie.
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse cookies (needed to read the auth token)
app.use(cookieParser());

// Routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/materials", materialsRouter);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Lumi server running at http://localhost:${PORT}`);
  });
}

start();
