'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { IOrder, IOrderItem } from "@/types/order";
import { apiFetch } from "@/lib/api/apiClient";

export default function OrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await apiFetch(`/orders/order/${orderId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch order");
        }

        const data: IOrder = await res.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="p-6 text-center">Зареждане...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Грешка: {error}</div>;
  if (!order) return <div className="p-6 text-center text-gray-500">Поръчката не е намерена.</div>;

  const total = order.items.reduce(
    (sum, item) => sum + item.priceAtTheTime * item.quantity,
    0
  );
  console.log(order.userId);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📦 Поръчка #{orderId}</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Продукти</h3>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item: IOrderItem, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>
                {item.quantity} × {typeof item.productId === "string" ? item.productId : item.productId.name}
              </span>
              <span>{(item.quantity * item.priceAtTheTime).toFixed(2)} лв.</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold text-right">Общо: {total.toFixed(2)} лв.</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Данни за поръчката</h3>
        <p><strong>Статус:</strong> {order.status}</p>
        {order.userId && (
          <p>
            <strong>Потребител:</strong>{" "}
            {typeof order.userId === "string" ? order.userId : order.userId.username}
          </p>
        )}
        <p><strong>Създадена на:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        >
          Назад
        </button>
      </div>
    </div>
  );
}
