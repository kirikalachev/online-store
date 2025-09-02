// src/cart/cart.routes.ts
import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from "./cart.controller";
import { authMiddleware } from "../auth/auth.middleware"; // ако имаш JWT middleware

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/clear", clearCart); // ще се извиква при successful order

export default router;
