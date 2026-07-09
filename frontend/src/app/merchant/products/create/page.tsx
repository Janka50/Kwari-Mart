"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { useAuthStore } from "@/store/authStore";
import {
  getMyProducts,
  deleteProduct,
} from "@/services/productService";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  stock?: number;
  stock_quantity?: number;
  image?: string | null;
  is_active?: boolean;
}

export default function MerchantProductsPage() {
  const token = useAuthStore((state) => state.access);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [token]);

  async function loadProducts() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMyProducts(token);

      setProducts(data.results ?? data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;

    if (!confirm("Delete this product?")) return;

    try {
      await deleteProduct(id, token);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            My Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products in your store.
          </p>

        </div>

        <Link
          href="/merchant/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </Link>

      </div>

      {products.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-16 text-center">

          <FaBoxOpen
            size={70}
            className="mx-auto text-gray-300 mb-6"
          />

          <h2 className="text-2xl font-bold">
            No Products Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Add your first product to start selling.
          </p>

          <Link
            href="/merchant/products/create"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <FaPlus />
            Create Product
          </Link>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <div className="h-56 bg-gray-100 flex items-center justify-center">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaBoxOpen
                    size={60}
                    className="text-gray-300"
                  />
                )}

              </div>

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <h2 className="text-xl font-bold">
                    {product.name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.is_active !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.is_active !== false
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                <p className="text-2xl font-bold text-blue-600 mt-4">
                  ₦{Number(product.price).toLocaleString()}
                </p>

                <p className="text-gray-500 mt-3">
                  Stock:{" "}
                  {product.stock_quantity ??
                    product.stock ??
                    0}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    href={`/merchant/products/${product.id}/edit`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

