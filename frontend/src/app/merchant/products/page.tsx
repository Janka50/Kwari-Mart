"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuthStore } from "@/store/authStore";
import {
  getMyProducts,
  deleteProduct,
} from "@/services/productService";

export default function MerchantProductsPage() {
  const token = useAuthStore(
    (state) => state.access
  );

  const [products, setProducts] =
    useState<any[]>([]);

  const loadProducts = async () => {
    if (!token) return;

    try {
      const data = await getMyProducts(token);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [token]);

  const handleDelete = async (
    id: number
  ) => {
    if (!token) return;

    if (
      !confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    try {
      await deleteProduct(
        id,
        token
      );

      loadProducts();

    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          My Products
        </h1>

        <Link href="/merchant/products/create">
          Create Product
        </Link>

      </div>

      {products.length === 0 ? (

        <p>No products yet.</p>

      ) : (

        products.map((product) => (

          <div
            key={product.id}
            className="border rounded p-4 mb-4"
          >

            <h2 className="font-bold">
              {product.name}
            </h2>

            <p>
              ₦{product.price}
            </p>

            <p>
              Stock: {product.stock}
            </p>

            <div className="mt-4 flex gap-4">

              <Link
                href={`/merchant/products/${product.id}/edit`}
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(product.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
}