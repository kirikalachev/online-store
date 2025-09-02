// src/types/cart.ts
import type { Product } from "./product";

export interface RawCartItem {
  productId: string;
  quantity: number;
  priceAtTheTime: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}
