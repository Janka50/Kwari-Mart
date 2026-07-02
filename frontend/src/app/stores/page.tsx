"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getStores } from "@/services/storeService";

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  product_count: number;
}

export default function StoresPage() {
  const [stores, setStores] =
    useState<Store[]>([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const data = await getStores();
      setStores(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Marketplace
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {stores.map((store) => (

          <div
            key={store.id}
            className="border rounded-lg shadow p-5"
          >

            {store.logo && (

              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-48 object-cover rounded"
              />

            )}

            <h2 className="text-2xl font-semibold mt-4">
              {store.name}
            </h2>

            <p className="mt-2">
              {store.description}
            </p>

            <p className="mt-3 text-gray-600">
              Products:
              {" "}
              {store.product_count}
            </p>

            <Link
              href={`/stores/${store.id}`}
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded"
            >
              View Store
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}