// src/orders/order.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtTheTime: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId | null;  // null ако гост
  items: IOrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      priceAtTheTime: { type: Number, required: true, min: 0 },
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

// Индекс за бързо търсене по userId и status
orderSchema.index({ userId: 1, status: 1 });

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
