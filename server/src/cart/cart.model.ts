// cart.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
    product: mongoose.Types.ObjectId,
    quantity: number,
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId
  items: ICartItem[]
  createdAt: Date
  updatedAt: Date
}

const CartSchema =  new Schema<ICart> ({
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
}, 
    { timestamps: true }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);

