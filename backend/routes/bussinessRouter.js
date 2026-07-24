import express from "express";
import { body } from "express-validator";

import * as businessController from "../controllers/businessController.js";
import { requireAuth } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create Business
router.post(
  "/",
  requireAuth,
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Business name is required"),
  ],
  validate,
  businessController.createBusiness
);

// Get My Business
router.get(
  "/me",
  requireAuth,
  businessController.getMyBusiness
);

// Update My Business
router.put(
  "/me",
  requireAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  businessController.updateMyBusiness
);

export default router;