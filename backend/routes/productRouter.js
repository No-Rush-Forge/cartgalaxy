import express from "express";
import { body } from "express-validator";

import * as productController from "../controllers/productController.js";
import { requireAuth } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Categories
router.get(
  "/categories",
  requireAuth,
  productController.listCategories
);

// Products
router.get(
  "/",
  requireAuth,
  productController.listProducts
);

// Create Product
router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required"),

    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be zero or more"),
  ],
  validate,
  productController.createProduct
);

// Get Single Product
router.get(
  "/:id",
  productController.getProduct
);

// Update Product
router.put(
  "/:id",
  requireAuth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  requireAuth,
  productController.deleteProduct
);

// Duplicate Product
router.post(
  "/:id/duplicate",
  requireAuth,
  productController.duplicateProduct
);

export default router;