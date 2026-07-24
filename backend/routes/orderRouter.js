import express from "express";
import { body } from "express-validator";

import * as orderController from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Dashboard Statistics
router.get(
  "/stats",
  requireAuth,
  orderController.getDashboardStats
);

// List All Orders
router.get(
  "/",
  requireAuth,
  orderController.listOrders
);

// Get Single Order
router.get(
  "/:id",
  requireAuth,
  orderController.getOrder
);

// Update Order Status
router.put(
  "/:id/status",
  requireAuth,
  [
    body("status")
      .isIn([
        "pending",
        "confirmed",
        "delivered",
        "cancelled",
      ])
      .withMessage("Invalid order status"),
  ],
  validate,
  orderController.updateOrderStatus
);

export default router;