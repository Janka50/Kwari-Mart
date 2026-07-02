"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getProduct } from "@/services/productService";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: number;
  store: number;
  store_name: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
  stock_quantity: number;
  is_active: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);

  const addItem = useCartStore(
    (state) => state.addItem
  );

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg border"
            />
          )}
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Sold by {product.store_name}
          </p>

          <p className="text-3xl font-bold text-green-600 mt-6">
            ₦{product.price}
          </p>

          <p className="mt-6">
            {product.description}
          </p>

          <p className="mt-6">
            <strong>Stock Available:</strong>{" "}
            {product.stock_quantity}
          </p>

          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image,
                quantity: 1,
                stock_quantity: product.stock_quantity,
              });

              alert("Added to cart!");
            }}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}