
"use client";

import Link from "next/link";
import {
  FaStore,
  FaBoxOpen,
  FaShoppingCart,
  FaPlusCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function MerchantDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Welcome */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Merchant Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your store, products and customer orders from one place.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="bg-white rounded-xl shadow p-6">
          <FaStore
            className="text-blue-600 text-4xl mb-4"
          />

          <h2 className="text-lg font-semibold">
            My Store
          </h2>

          <p className="text-gray-500 mt-2">
            View and manage your store profile.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaBoxOpen
            className="text-green-600 text-4xl mb-4"
          />

          <h2 className="text-lg font-semibold">
            Products
          </h2>

          <p className="text-gray-500 mt-2">
            Add, edit and manage your products.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaShoppingCart
            className="text-purple-600 text-4xl mb-4"
          />

          <h2 className="text-lg font-semibold">
            Orders
          </h2>

          <p className="text-gray-500 mt-2">
            View customer orders and fulfil purchases.
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
            href="/merchant/store/create"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition"
          >
            <FaPlusCircle className="text-3xl mb-4" />

            <h3 className="font-semibold text-lg">
              Create Store
            </h3>

            <p className="mt-2 text-blue-100">
              Register your business.
            </p>
          </Link>

          <Link
            href="/merchant/store/me"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaStore className="text-3xl text-blue-600 mb-4" />

            <h3 className="font-semibold text-lg">
              My Store
            </h3>

            <p className="text-gray-500 mt-2">
              View your store details.
            </p>
          </Link>

          <Link
            href="/merchant/products/create"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaBoxOpen className="text-3xl text-green-600 mb-4" />

            <h3 className="font-semibold text-lg">
              Add Product
            </h3>

            <p className="text-gray-500 mt-2">
              Upload a new product.
            </p>
          </Link>

          <Link
            href="/merchant/orders"
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <FaShoppingCart className="text-3xl text-purple-600 mb-4" />

            <h3 className="font-semibold text-lg">
              Orders
            </h3>

            <p className="text-gray-500 mt-2">
              Manage incoming orders.
            </p>
          </Link>

        </div>

      </div>

      {/* Footer Card */}

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-blue-700">
            Grow Your Business
          </h2>

          <p className="text-gray-600 mt-2">
            Keep your inventory updated and respond to customer orders promptly.
          </p>

        </div>

        <Link
          href="/merchant/products/create"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Product
          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
}

