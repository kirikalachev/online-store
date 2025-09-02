// src/cart/cart.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtTheTime: number; // snapshot на цената
}

export interface ICart extends Document {
  userId?: Types.ObjectId | null; // null за гост
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      priceAtTheTime: { type: Number, required: true, min: 0 }
    }
  ]
}, {
  timestamps: true
});

// Индекс за бързо намиране на cart по userId
cartSchema.index({ userId: 1 });

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;
