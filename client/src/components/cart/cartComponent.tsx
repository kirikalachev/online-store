'use client';

import { useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, clearCart } from "@/lib/api/cart";
import type { CartItem } from "@/types/cart";

export default function CartComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart();
        setCartItems(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleAdd = async (productId: string) => {
    const data = await addToCart(productId, 1);
    setCartItems(data.items);
  };

  const handleRemove = async (productId: string) => {
    const data = await removeFromCart(productId);
    setCartItems(data.items);
  };

  const handleClear = async () => {
    await clearCart();
    setCartItems([]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Моята количка</h2>
      {cartItems.length === 0 && <p>Количката е празна</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x {item.price}лв
            <button onClick={() => handleRemove(item.product._id)}>Премахни</button>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && <button onClick={handleClear}>Изчисти количката</button>}
    </div>
  );
}
