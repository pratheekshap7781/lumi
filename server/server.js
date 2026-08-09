import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend (running on a different port) to call this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Routes
app.use("/api/health", healthRouter);

app.listen(PORT, () => {
  console.log(`Lumi server running at http://localhost:${PORT}`);
});
