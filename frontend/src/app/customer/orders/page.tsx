"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import { getMyOrders } from "@/services/orderService";

interface Order {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  status: string;
  created_at: string;
}

export default function MyOrdersPage() {
  const token = useAuthStore((state) => state.access);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!token) return;

    try {
      const data = await getMyOrders(token);
      setOrders(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="border rounded-lg p-6"
            >

              <h2 className="text-xl font-semibold">
                {order.product_name}
              </h2>

              <p className="mt-2">
                Quantity: {order.quantity}
              </p>

              <p>
                Unit Price:
                ₦{order.unit_price}
              </p>

              <p>
                Total:
                ₦{order.total_price}
              </p>

              <p>
                Status:
                <span className="font-semibold ml-2">
                  {order.status}
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}