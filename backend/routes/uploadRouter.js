import express from "express";

import upload from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Generic single-image upload endpoint
// Returns the Cloudinary image URL
router.post(
  "/",
  requireAuth,
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(422).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(201).json({
      success: true,
      data: {
        url: req.file.path,
      },
    });
  }
);

export default router;