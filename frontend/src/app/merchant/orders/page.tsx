
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaClipboardList,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";

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

export default function MerchantOrdersPage() {
  const token = useAuthStore((state) => state.access);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  async function loadOrders() {
    try {
      const data = await getMyOrders(token!);

      setOrders(data.results ?? data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const badgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center text-gray-500">
        Loading customer orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <Link
        href="/merchant/dashboard"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Merchant Orders
        </h1>

        <p className="text-gray-500 mt-2">
          View and monitor customer orders placed for your products.
        </p>

      </div>

      {orders.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-16 text-center">

          <FaClipboardList
            size={70}
            className="mx-auto text-gray-300 mb-6"
          />

          <h2 className="text-2xl font-bold">
            No Customer Orders
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't received any customer orders yet.
          </p>

          <Link
            href="/products/create"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <FaShoppingBag />
            Add Products
          </Link>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
            >

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    {order.product_name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Order received on{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div>

                  <p className="text-sm text-gray-500">
                    Quantity
                  </p>

                  <p className="text-lg font-semibold">
                    {order.quantity}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Unit Price
                  </p>

                  <p className="text-lg font-semibold text-blue-600">
                    ₦{Number(order.unit_price).toLocaleString()}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-green-600">
                    ₦{Number(order.total_price).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

