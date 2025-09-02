// src/orders/order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./order.service";

// Checkout - създава поръчка от текущата cart
export const checkout = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;

  try {
    const order = await OrderService.createOrder(userId, cartId);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Връща всички поръчки на текущия потребител
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const orders = await OrderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Връща всички чакащи поръчки (за админ или тестови цели)
export const getPendingOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.getPendingOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Променя статуса на поръчка
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { orderId, status } = req.body;

  try {
    const order = await OrderService.updateOrderStatus(orderId, status);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
