// src/orders/order.service.ts
import Order, { IOrder, IOrderItem } from "./order.model";
import Cart from "../cart/cart.model";
import mongoose from "mongoose";

export class OrderService {
  // Създаване на поръчка от cart
  static async createOrder(userId: string | null, cartId: string | null) {
    // Взимаме cart
    const cart = await Cart.findOne(userId ? { userId } : { _id: cartId });
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    // Изчисляваме total
    const total = cart.items.reduce((sum, item) => sum + item.priceAtTheTime * item.quantity, 0);

    // Създаваме order
    const orderItems: IOrderItem[] = cart.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      priceAtTheTime: i.priceAtTheTime
    }));

    const order = new Order({
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
      items: orderItems,
      total,
      status: "pending"
    });

    await order.save();

    // Изчистваме cart
    cart.items = [];
    await cart.save();

    return order;
  }

  // Взимане на поръчка по id
  static async getOrderById(orderId: string) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
    return await Order.findById(orderId).populate("items.productId");
  }

  // Взимане на всички поръчки на user
  static async getOrdersByUser(userId: string) {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  }

  // Админ: всички чакащи поръчки
  static async getPendingOrders() {
    return await Order.find({ status: "pending" }).sort({ createdAt: 1 });
  }

  // Промяна на статус (само админ)
  static async updateOrderStatus(orderId: string, status: IOrder["status"]) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error("Invalid order ID");
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.status = status;
    await order.save();
    return order;
  }
}
