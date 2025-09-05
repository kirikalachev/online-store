// // src/orders/order.service.ts
import Order, { IOrder, IOrderItem } from "./order.model";
import Cart from "../cart/cart.model";
import mongoose from "mongoose";

export class OrderService {
  // Създаване на поръчка (checkout)
  static async createOrder(userId: string | null, cartId: string | null): Promise<IOrder> {
    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId }) || (cartId ? await Cart.findById(cartId) : null);
    } else if (cartId) {
      cart = await Cart.findById(cartId);
    }

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const total = cart.items.reduce((sum, item) => sum + item.priceAtTheTime * item.quantity, 0);

    const orderItems: IOrderItem[] = cart.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      priceAtTheTime: i.priceAtTheTime,
    }));

    const order = new Order({
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
      items: orderItems,
      total,
      status: "pending",
    });

    await order.save();

    cart.items = [];
    await cart.save();

    return order;
  }

  // Взима поръчка по ID с populate
  static async getOrderById(orderId: string): Promise<IOrder | null> {
    if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
    return await Order.findById(orderId)
      .populate("items.productId", "name price")
      .populate("userId", "username email");
  }

  // Взима всички поръчки на конкретен потребител с populate
  static async getOrdersByUser(userId: string): Promise<IOrder[]> {
    return await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId", "name price")
      .populate("userId", "username email");
  }

  // Взима всички чакащи поръчки с populate
  static async getPendingOrders(): Promise<IOrder[]> {
    return await Order.find({ status: "pending" })
      .sort({ createdAt: 1 })
      .populate("items.productId", "name price")
      .populate("userId", "username email");
  }

  // Променя статуса на поръчка
  static async updateOrderStatus(orderId: string, status: IOrder["status"]): Promise<IOrder> {
    if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.status = status;
    await order.save();
    return order;
  }

  // Взима всички поръчки (админ)
static async getAllOrders(): Promise<IOrder[]> {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("items.productId", "name price")
    .populate("userId", "username email");
}

// Отменя поръчка (регистриран потребител)
static async cancelOrder(orderId: string, userId: string): Promise<IOrder> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (String(order.userId) !== userId) throw new Error("Forbidden");
  if (order.status !== "pending") throw new Error("Cannot cancel processed order");
  order.status = "cancelled";
  await order.save();
  return order;
}

// Обновява детайли на поръчка (регистриран потребител)
static async updateOrderDetails(orderId: string, userId: string, updates: Partial<IOrder>): Promise<IOrder> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (String(order.userId) !== userId) throw new Error("Forbidden");
  // Позволяваме update на адрес, бележка и т.н.
  Object.assign(order, updates);
  await order.save();
  return order;
}

// Изтриване на поръчка (админ)
static async deleteOrder(orderId: string): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
  await Order.findByIdAndDelete(orderId);
}

// Взима поръчка по публичен линк/токен (гости)
static async getOrderByPublicLink(orderId: string, token: string): Promise<IOrder | null> {
  if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
  // Тук приемаме, че token съществува и е валиден
  return await Order.findOne({ _id: orderId, "publicToken": token })
    .populate("items.productId", "name price")
    .populate("userId", "username email");
}

}