"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">
          Shopping Cart
        </h1>

        <p>Your cart is empty.</p>

        <Link
          href="/stores"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-6">

        {items.map((item) => (

          <div
            key={item.id}
            className="border rounded-lg p-4 flex gap-6 items-center"
          >

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded"
              />
            )}

            <div className="flex-1">

              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                ₦{item.price.toLocaleString()}
              </p>

              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                  className="border px-3 py-1 rounded"
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>

              </div>

            </div>

            <div className="text-right">

              <p className="font-bold">
                ₦
                {(
                  item.price *
                  item.quantity
                ).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="text-red-600 mt-4"
              >
                Remove
              </button>

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

        <Link
          href="/checkout"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded"
        >
          Proceed to Checkout
        </Link>

      </div>

    </div>
  );
}