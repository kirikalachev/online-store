import { apiFetch } from './apiClient';
import type { CartItem, RawCartItem } from "@/types/cart";
import { mapRawCartItem } from "@/utils/transform";

export type CartResponse = {
  items: CartItem[];
};

/**
 * Взимане на текущата cart (user или guest)
 */
export async function getCart(): Promise<CartResponse> {
  const res = await apiFetch('/cart');

  if (!res.ok) throw new Error("Failed to fetch cart");

  const data: { items: RawCartItem[] } = await res.json();
  const items = data.items.map(mapRawCartItem);

  return { items };
}

/**
 * Добавяне на продукт в cart
 * @param productId - ID на продукта
 * @param quantity - количество
 */
export async function addToCart(productId: string, quantity: number = 1): Promise<CartResponse> {
  const res = await apiFetch('/cart/add', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to add to cart: ${errorText}`);
  }

  const data: { items: RawCartItem[] } = await res.json();
  const items = data.items.map(mapRawCartItem);

  return { items };
}

/**
 * Премахване на продукт от cart
 * @param productId - ID на продукта
 */
export async function removeFromCart(productId: string): Promise<CartResponse> {
  const res = await apiFetch('/cart/remove', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to remove from cart: ${errorText}`);
  }

  const data: { items: RawCartItem[] } = await res.json();
  const items = data.items.map(mapRawCartItem);

  return { items };
}

/**
 * Изчистване на cart (например при successful order)
 */
export async function clearCart(): Promise<{ message: string }> {
  const res = await apiFetch('/cart/clear', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to clear cart: ${errorText}`);
  }

  return res.json();
}
