"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import { getMyStore } from "@/store/storeService";

export default function MyStorePage() {
  const token = useAuthStore((state) => state.access);

  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      if (!token) return;

      try {
        const data = await getMyStore(token);
        setStore(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [token]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!store) {
    return <h2>No store found.</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Store
      </h1>

      <p><strong>Name:</strong> {store.name}</p>

      <p><strong>Description:</strong> {store.description}</p>

      <p><strong>Phone:</strong> {store.phone_number}</p>

      <p><strong>WhatsApp:</strong> {store.whatsapp_number}</p>

      <p>
        <strong>Verified:</strong>{" "}
        {store.is_verified ? "Yes" : "No"}
      </p>

      <p>
        <strong>Products:</strong>{" "}
        {store.product_count}
      </p>
    </div>
  );
}