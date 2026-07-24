import express from "express";
import { body } from "express-validator";

import * as storeController from "../controllers/storeController.js";
import * as orderController from "../controllers/orderController.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Store
router.get(
  "/:businessName",
  storeController.getStore
);

// Product
router.get(
  "/:businessName/products/:productId",
  storeController.getStoreProduct
);

// Place Order
router.post(
  "/:businessName/orders",
  [
    body("customerName")
      .trim()
      .notEmpty()
      .withMessage("Your name is required"),

    body("customerPhone")
      .trim()
      .notEmpty()
      .withMessage("A phone number is required"),

    body("items")
      .isArray({ min: 1 })
      .withMessage("Add at least one product to your order"),
  ],
  validate,
  orderController.placeOrder
);

export default router;