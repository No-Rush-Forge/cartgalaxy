import express from "express";
import { body } from "express-validator";

import * as userController from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.put(
  "/profile",
  requireAuth,
  upload.single("avatar"),
  userController.updateProfile
);

router.put(
  "/password",
  requireAuth,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),

    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  validate,
  userController.changePassword
);

router.put(
  "/theme",
  requireAuth,
  [
    body("theme")
      .isIn(["dark", "light"])
      .withMessage("Theme must be either 'dark' or 'light'"),
  ],
  validate,
  userController.updateTheme
);

export default router;