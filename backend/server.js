import "dotenv/config";

import express from "express";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRouter.js";

const app = express();

// Test database connection
try {
  await pool.query("SELECT NOW()");
  console.log("✅ Connected to Supabase Database");
} catch (err) {
  console.error("❌ Database Connection Failed");
  console.error(err.message);
}

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
