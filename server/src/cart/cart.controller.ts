import { Request, Response } from "express";
import { CartService } from "./cart.service";
import mongoose from "mongoose";

// локален тип за този контролер
type ReqWithUser = Request & { user?: { id: string; role?: "user" | "admin" } };

export const getCart = async (req: ReqWithUser, res: Response) => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;

  const cart = await CartService.getCart(userId, cartId);
  res.json(cart || { items: [] });
};

export const addToCart = async (req: ReqWithUser, res: Response) => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;
  const { productId, quantity } = req.body;

  const cart = await CartService.addToCart(userId, cartId, productId, quantity);

  // cookie за гост
  if (!userId && !cartId && cart?._id) {
    res.cookie("cartId", (cart._id as mongoose.Types.ObjectId).toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  }

  res.status(200).json(cart);
};

export const removeFromCart = async (req: ReqWithUser, res: Response) => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;
  const { productId, priceAtTheTime } = req.body; // добавяме цената

  const cart = await CartService.removeFromCart(userId, cartId, productId, priceAtTheTime);
  res.status(200).json(cart);
};

export const clearCart = async (req: ReqWithUser, res: Response) => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;

  await CartService.clearCart(userId, cartId);
  res.status(200).json({ message: "Cart cleared" });
};
