"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { createOrder } from "@/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();

  const token = useAuthStore((state) => state.access);

  const { items, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!token) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      await Promise.all(
        items.map((item) =>
          createOrder(
            item.id,
            item.quantity,
            token
          )
        )
      );

      clearCart();

      alert("Order placed successfully!");

      router.push("/customer/orders");

    } catch (error) {
      console.error(error);

      alert("Failed to place your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="space-y-4">

        {items.map((item) => (

          <div
            key={item.id}
            className="border rounded-lg p-5 flex justify-between items-center"
          >

            <div>

              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              <p>
                Quantity: {item.quantity}
              </p>

            </div>

            <div className="font-bold text-green-600">

              ₦
              {(
                item.price *
                item.quantity
              ).toLocaleString()}

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 border-t pt-8">

        <h2 className="text-3xl font-bold">

          Total:

          <span className="text-green-600 ml-3">

            ₦{total.toLocaleString()}

          </span>

        </h2>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded"
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </div>

    </div>
  );
}