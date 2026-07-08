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
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="bg-white rounded-2xl shadow border p-12">
          <div className="text-7xl mb-6">🛒</div>

          <h2 className="text-2xl font-bold">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-4">
            Browse our marketplace and discover amazing products.
          </p>

          <Link
            href="/stores"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
          >
            Browse Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">

          {items.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border p-6 flex gap-6"
            >

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center text-5xl">
                  📦
                </div>
              )}

              <div className="flex-1">

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-green-600 text-2xl font-bold mt-2">
                  ₦{item.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 mt-6">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition"
                  >
                    −
                  </button>

                  <span className="font-semibold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition"
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="flex flex-col justify-between text-right">

                <div>

                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>

                  <p className="text-2xl font-bold">
                    ₦
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:underline"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Order Summary */}

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

            <Link
              href="/checkout"
              className="block text-center mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/stores"
              className="block text-center mt-4 border border-gray-300 py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}