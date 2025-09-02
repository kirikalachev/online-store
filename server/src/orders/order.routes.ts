// src/orders/order.routes.ts
import express from "express";
import {
  checkout,
  getUserOrders,
  getPendingOrders,
  updateOrderStatus
} from "./order.controller";
import { authMiddleware } from "../auth/auth.middleware";
//adminMiddleware
const router = express.Router();

router.post("/checkout", authMiddleware, checkout);
router.get("/my-orders", authMiddleware, getUserOrders);

// Admin routes
router.get("/pending", authMiddleware, getPendingOrders);
router.post("/update-status", authMiddleware, updateOrderStatus);

export default router;
