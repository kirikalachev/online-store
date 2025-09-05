'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCart, clearCart } from "@/lib/api/cart";
import { getProductsByIds } from "@/lib/api/products";
import { apiFetch } from "@/lib/api/apiClient";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Checkout form state (order.model fields)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const data = await getCart();
        if (data.items.length === 0) {
          setCartItems([]);
          return;
        }
        const products = await getProductsByIds(data.items.map(i => i.product._id));
        const combined: CartItemWithProduct[] = data.items.map(item => ({
          ...item,
          product: products.find(p => p._id === item.product._id)!
        }));
        setCartItems(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await apiFetch("/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: null,   // backend ще го вземе от req.user ако има логнат потребител
          cartId: null,   // backend ще го вземе от cookie-то
        }),
        credentials: "include", // <--- важно за Http-Only cookie
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create order");
      }

      const order = await res.json();

      await clearCart();
      router.push(`/orders/${order._id}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return <div className="p-6 text-center">Зареждане...</div>;

  if (cartItems.length === 0) return <div className="p-6 text-center text-gray-500">Количката е празна.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📝 Checkout</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Преглед на поръчката</h3>
        <ul className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <li key={`${item.product._id}-${item.price}`} className="flex justify-between py-2">
              <span>{item.quantity} × {item.product.name}</span>
              <span>{(item.quantity * item.price).toFixed(2)} лв.</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold text-right">Общо: {total.toFixed(2)} лв.</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Данни за доставка</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Име"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="border p-2 rounded-lg col-span-2"
          />
          <input
            type="text"
            placeholder="Улица, номер"
            value={street}
            onChange={e => setStreet(e.target.value)}
            className="border p-2 rounded-lg col-span-2"
          />
          <input
            type="text"
            placeholder="Град"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Пощенски код"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <textarea
            placeholder="Бележка (по желание)"
            value={note}
            onChange={e => setNote(e.target.value)}
            className="border p-2 rounded-lg col-span-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          {submitting ? "Обработва се..." : "Потвърди поръчката"}
        </button>
      </div>
    </div>
  );
}
