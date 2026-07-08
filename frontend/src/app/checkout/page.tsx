```tsx
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
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow border p-8">

            <h2 className="text-2xl font-bold mb-8">
              Order Items
            </h2>

            <div className="space-y-6">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-5"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-xl text-green-600">
                      ₦
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        <div>

          <div className="bg-white rounded-2xl shadow border p-8 sticky top-24">

            <h2 className="text-2xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">
                  Free
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-green-600">
                  ₦{total.toLocaleString()}
                </span>

              </div>

            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
```
