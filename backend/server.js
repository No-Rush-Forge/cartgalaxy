
import "dotenv/config";

import express from "express";
import cors from "cors";
import multer from "multer";

import pool from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import adminRoutes from "./routes/adminRouter.js";
import userRoutes from "./routes/userRouter.js";
import storeRoutes from "./routes/storeRouter.js";

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

// Admin routes
app.use("/api/admin", adminRoutes);

// User routes
app.use("/api/users", userRoutes);

// Store routes
app.use("/api/store", storeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("API Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must not exceed 2 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Handles invalid image types rejected by Multer
  if (err.message?.includes("Only JPG, PNG and WEBP")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
