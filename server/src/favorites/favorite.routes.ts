import { Router, RequestHandler } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { toggleFavoriteController, getProductsWithFavoritesController } from "./favorite.controller";

const router = Router();

// POST /api/favorites/:productId - добавяне/премахване от любими
router.post("/:productId", authMiddleware, toggleFavoriteController as RequestHandler);

// GET /api/favorites/products - всички продукти със състоянието на любими
router.get("/products", authMiddleware, getProductsWithFavoritesController as RequestHandler);

export default router;
