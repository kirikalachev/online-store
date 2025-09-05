// src/orders/order.routes.ts
import express from "express";
import { authMiddleware } from "../auth/auth.middleware";

// Контролери (някои все още не съществуват, ще ги добавим по-късно)
import {
  checkout,
  getUserOrders,
  getPendingOrders,
  updateOrderStatus,
  getOrderById,
  getAllOrders,       // нов
  cancelOrder,        // нов
  updateOrderDetails, // нов
  deleteOrder,        // нов
  getOrderByPublicLink, // нов за гости
} from "./order.controller";

const router = express.Router();

/* ---------------------- */
/* 1️⃣ Guests */
/* ---------------------- */
router.post("/checkout", checkout);
router.get("/public/:id", getOrderByPublicLink);

/* ---------------------- */
/* 3️⃣ Admin */
/* ---------------------- */
router.get("/admin/pending", authMiddleware, getPendingOrders);
router.patch("/admin/:id/status", authMiddleware, updateOrderStatus);
router.get("/admin/:id", authMiddleware, getOrderById);
router.delete("/admin/:id", authMiddleware, deleteOrder);
router.get("/admin", authMiddleware, getAllOrders);
/* ---------------------- */
/* 2️⃣ Authenticated users */
/* ---------------------- */
router.get("/my", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrderById);
router.patch("/:id/cancel", authMiddleware, cancelOrder);
router.put("/:id", authMiddleware, updateOrderDetails);

export default router;


// // src/orders/order.routes.ts
// import express from "express";
// import {
//   checkout,
//   getUserOrders,
//   getPendingOrders,
//   updateOrderStatus,
//   getOrderById,
// } from "./order.controller";
// import { authMiddleware } from "../auth/auth.middleware";
// //adminMiddleware
// const router = express.Router();
// // Non-admin routes
// router.get("/order/:id", getOrderById);
// router.post("/checkout", authMiddleware, checkout);
// router.get("/my-orders", authMiddleware, getUserOrders);

// // Admin routes
// router.get("/pending", authMiddleware, getPendingOrders);
// router.post("/update-status", authMiddleware, updateOrderStatus);

// export default router;
