"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuthStore } from "@/store/authStore";
import {
  getMyProducts,
  deleteProduct,
} from "@/services/productService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  image: string | null;
  is_active: boolean;
}

export default function MyProductsPage() {
  const token = useAuthStore(
    (state) => state.access
  );

  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    if (!token) return;

    try {
      const data = await getMyProducts(token);

      setProducts(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (
    id: number
  ) => {
    if (!token) return;

    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id, token);

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Products
        </h1>

        <Link
          href="/merchant/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Product
        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="border rounded-lg p-4 shadow"
          >

            {product.image && (

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />

            )}

            <h2 className="text-xl font-semibold mt-3">
              {product.name}
            </h2>

            <p>{product.description}</p>

            <p className="mt-2">
              ₦{product.price}
            </p>

            <p>
              Stock:
              {" "}
              {product.stock_quantity}
            </p>

            <p>
              Status:
              {" "}
              {product.is_active
                ? "Active"
                : "Inactive"}
            </p>

            <div className="flex gap-2 mt-4">

              <Link
                href={`/merchant/products/${product.id}/edit`}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(product.id)
                }
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}