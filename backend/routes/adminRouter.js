import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAdminUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

// Test Admin Route
router.get("/users", authMiddleware, adminMiddleware, getAdminUsers);

router.patch(
  "/users/:userId/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole,
);

export default router;
