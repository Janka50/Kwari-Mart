"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { getStore } from "@/services/storeService";
import { getStoreProducts } from "@/services/productService";

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  phone_number: string;
  whatsapp_number: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  stock_quantity: number;
}

export default function StoreDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadStore();
    loadProducts();
  }, []);

  const loadStore = async () => {
    try {
      const data = await getStore(id);
      setStore(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getStoreProducts(id);
      setProducts(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  if (!store) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      {store.logo && (
        <img
          src={store.logo}
          alt={store.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <h1 className="text-4xl font-bold mt-6">
        {store.name}
      </h1>

      <p className="mt-3">
        {store.description}
      </p>

      <p className="mt-2">
        📞 {store.phone_number}
      </p>

      <p>
        WhatsApp: {store.whatsapp_number}
      </p>

      <hr className="my-8" />

      <h2 className="text-3xl font-bold mb-6">
        Products
      </h2>

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

            <h3 className="text-xl font-semibold mt-3">
              {product.name}
            </h3>

            <p>{product.description}</p>

            <p className="font-bold mt-2">
              ₦{product.price}
            </p>

            <Link
              href={`/products/${product.id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Product
            </Link>
          </div>
        ))}

      </div>

    </div>
  );
}