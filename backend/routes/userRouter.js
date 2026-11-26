import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  removeProfilePicture,
  getUserPreferences,
  updateUserPreferences,
  deleteAccount,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
========================================
GET PROFILE
GET /api/users/profile
========================================
*/
router.get("/profile", authMiddleware, getProfile);

/*
========================================
UPDATE PROFILE
PUT /api/users/profile
========================================
*/
router.put("/profile", authMiddleware, updateProfile);

/*
========================================
CHANGE PASSWORD
PUT /api/users/password
========================================
*/
router.put("/password", authMiddleware, changePassword);

// Delete account
router.delete("/account", authMiddleware, deleteAccount);

// User preferences
router.get("/preferences", authMiddleware, getUserPreferences);
router.put("/preferences", authMiddleware, updateUserPreferences);

/*
========================================
UPLOAD PROFILE PICTURE
POST /api/users/profile-picture
========================================
*/
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("profile_picture"),
  uploadProfilePicture,
);

/*
========================================
REMOVE PROFILE PICTURE
DELETE /api/users/profile-picture
========================================
*/
router.delete("/profile-picture", authMiddleware, removeProfilePicture);

export default router;
