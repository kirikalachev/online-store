'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api/apiClient'; // адаптирай пътя
import { IOrder, PopulatedUser } from '@/types/order';

const STATUSES: IOrder['status'][] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

export default function AdminOrdersPage() {
  const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Pending поръчки
        const pendingRes = await apiFetch('/orders/admin/pending');
        if (!pendingRes.ok) throw new Error('Неуспешно зареждане на pending поръчки');
        const pendingData: IOrder[] = await pendingRes.json();
        setPendingOrders(pendingData);

        // Всички поръчки
        const allRes = await apiFetch('/orders/admin');
        if (!allRes.ok) throw new Error('Неуспешно зареждане на всички поръчки');
        const allData: IOrder[] = await allRes.json();
        setAllOrders(allData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: IOrder['status']) => {
    try {
      const res = await apiFetch(`/orders/admin/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    });
      if (!res.ok) throw new Error('Неуспешна промяна на статус');

      const updated: IOrder = await res.json();

      // Обновяваме локално масивите
      setPendingOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
      setAllOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Зареждане на поръчки...</p>;
  if (error) return <p className="text-red-500">Грешка: {error}</p>;

  const renderTable = (orders: IOrder[]) => (
    <table className="w-full table-auto border-collapse mb-8">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Потребител</th>
          <th className="border px-4 py-2">Общо</th>
          <th className="border px-4 py-2">Статус</th>
          <th className="border px-4 py-2">Дата</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const user: PopulatedUser | null =
            typeof order.userId === 'object' ? order.userId : null;

          return (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                {user ? user.username : 'Гост'}
              </td>
              <td className="border px-4 py-2">
                {order.total.toFixed(2)} лв.
              </td>
              <td className="border px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value as IOrder['status'])
                  }
                  className="border rounded px-2 py-1"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Админ панел – Поръчки</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Чакащи поръчки</h2>
        {pendingOrders.length === 0 ? (
          <p>Няма pending поръчки.</p>
        ) : (
          renderTable(pendingOrders)
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Всички поръчки</h2>
        {allOrders.length === 0 ? (
          <p>Няма направени поръчки.</p>
        ) : (
          renderTable(allOrders)
        )}
      </section>
    </div>
  );
}
