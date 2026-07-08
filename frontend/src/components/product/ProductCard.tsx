"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import type { Product } from "@/types/product";


interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group">

      <div className="h-56 bg-gray-100 overflow-hidden">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

      </div>

      <div className="p-5">

        <h3 className="text-xl font-bold line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="text-2xl font-bold text-blue-600">
            ₦{Number(product.price).toLocaleString()}
          </span>

          <span className="text-sm text-gray-500">
            Stock: {product.stock_quantity}
          </span>

        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaShoppingCart />
          View Product
        </Link>

      </div>

    </div>
  );
}