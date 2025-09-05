// src/orders/order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { IOrder } from "./order.model";

type ReqWithUser = Request & { user?: { id: string; role?: "user" | "admin" } };

// Checkout – създава поръчка
export const checkout = async (req: ReqWithUser, res: Response): Promise<void> => {
  const userId = req.user?.id || null;
  const cartId = req.cookies.cartId || null;

  try {
    const order = await OrderService.createOrder(userId, cartId) as IOrder & { _id: string };
    const populatedOrder = await OrderService.getOrderById(order._id);
    // const order = await OrderService.createOrder(userId, cartId);
    // const populatedOrder = await OrderService.getOrderById(order._id.toString());
    res.status(201).json(populatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Връща всички поръчки на текущия потребител
export const getUserOrders = async (req: ReqWithUser, res: Response): Promise<void> => {
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

// Връща всички чакащи поръчки
export const getPendingOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.getPendingOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Взима поръчка по ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await OrderService.getOrderById(id);
    if (!order) throw new Error("Order not found");
    res.json(order);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;           // ID от URL
  const { status } = req.body;         // статус от body

  if (!status) {
    res.status(400).json({ message: "Missing status" });
    return;
  }

  try {
    const order = await OrderService.updateOrderStatus(id, status) as IOrder & { _id: string };
    const populatedOrder = await OrderService.getOrderById(order._id);
    res.json(populatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};




// Връща всички поръчки (админ)
export const getAllOrders = async (req: ReqWithUser, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Отменя поръчка (регистриран потребител)
export const cancelOrder = async (req: ReqWithUser, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId)  {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const order = await OrderService.cancelOrder(id, userId);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Обновява детайли на поръчка (регистриран потребител)
export const updateOrderDetails = async (req: ReqWithUser, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
}
  try {
    const order = await OrderService.updateOrderDetails(id, userId, updates);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Изтриване на поръчка (админ)
export const deleteOrder = async (req: ReqWithUser, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await OrderService.deleteOrder(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Взима поръчка по публичен линк/токен (гости)
export const getOrderByPublicLink = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { token } = req.query;
  if (!token || typeof token !== "string") {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  try {
    const order = await OrderService.getOrderByPublicLink(id, token);
    if (!order) throw new Error("Order not found or invalid token");
    res.json(order);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
