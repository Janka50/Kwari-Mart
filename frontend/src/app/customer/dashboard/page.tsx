"use client";

import Link from "next/link";
import {
  FaStore,
  FaShoppingCart,
  FaClipboardList,
  FaArrowRight,
  FaHeart,
  FaBoxOpen,
} from "react-icons/fa";

export default function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Welcome */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Customer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Discover amazing products from trusted local merchants.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="bg-white rounded-xl shadow p-6">
          <FaShoppingCart className="text-4xl text-blue-600 mb-4" />

          <h2 className="text-lg font-semibold">
            Shopping Cart
          </h2>

          <p className="text-gray-500 mt-2">
            View products you've added to your cart.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaClipboardList className="text-4xl text-green-600 mb-4" />

          <h2 className="text-lg font-semibold">
            My Orders
          </h2>

          <p className="text-gray-500 mt-2">
            Track your current and previous orders.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaHeart className="text-4xl text-red-500 mb-4" />

          <h2 className="text-lg font-semibold">
            Favorites
          </h2>

          <p className="text-gray-500 mt-2">
            Save your favourite stores and products.
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/stores"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition"
          >
            <FaStore className="text-3xl mb-4" />

            <h3 className="text-lg font-semibold">
              Browse Stores
            </h3>

            <p className="mt-2 text-blue-100">
              Explore trusted merchants.
            </p>
          </Link>

          <Link
            href="/cart"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaShoppingCart className="text-3xl text-blue-600 mb-4" />

            <h3 className="text-lg font-semibold">
              Shopping Cart
            </h3>

            <p className="text-gray-500 mt-2">
              Continue your shopping.
            </p>
          </Link>

          <Link
            href="/customer/orders"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaClipboardList className="text-3xl text-green-600 mb-4" />

            <h3 className="text-lg font-semibold">
              My Orders
            </h3>

            <p className="text-gray-500 mt-2">
              View order history.
            </p>
          </Link>

          <Link
            href="/stores"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaBoxOpen className="text-3xl text-purple-600 mb-4" />

            <h3 className="text-lg font-semibold">
              Shop Now
            </h3>

            <p className="text-gray-500 mt-2">
              Discover new products.
            </p>
          </Link>

        </div>

      </div>

      {/* Call To Action */}

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-blue-700">
            Start Shopping
          </h2>

          <p className="text-gray-600 mt-2">
            Browse hundreds of products from trusted merchants on KwariMart.
          </p>

        </div>

        <Link
          href="/stores"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Stores
          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
}

