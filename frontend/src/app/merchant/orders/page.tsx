"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import {
  getMerchantOrders,
  updateOrderStatus,
} from "@/services/orderService";

interface Order {
  id: number;
  customer_email: string;
  product_name: string;
  quantity: number;
  total_price: string;
  status: string;
  created_at: string;
}

export default function MerchantOrdersPage() {
  const token = useAuthStore((state) => state.access);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!token) return;

    try {
      const data = await getMerchantOrders(token);
      setOrders(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (
    id: number,
    status: string
  ) => {
    if (!token) return;

    try {
      await updateOrderStatus(id, status, token);

      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order.");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Merchant Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="border rounded-lg p-6"
            >

              <h2 className="text-xl font-bold">
                {order.product_name}
              </h2>

              <p>
                Customer:
                {" "}
                {order.customer_email}
              </p>

              <p>
                Quantity:
                {" "}
                {order.quantity}
              </p>

              <p>
                Total:
                {" "}
                ₦{order.total_price}
              </p>

              <p className="mt-2">
                Status:
                {" "}
                <strong>{order.status}</strong>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

              <select
                className="border mt-4 p-2 rounded"
                value={order.status}
                onChange={(e) =>
                  changeStatus(
                    order.id,
                    e.target.value
                  )
                }
              >
                <option value="PENDING">
                  Pending
                </option>

                <option value="PROCESSING">
                  Processing
                </option>

                <option value="SHIPPED">
                  Shipped
                </option>

                <option value="DELIVERED">
                  Delivered
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}