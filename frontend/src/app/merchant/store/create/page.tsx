"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { createStore } from "@/store/storeService";

export default function CreateStorePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.access);

  // State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication
    if (!token) {
      alert("Please login again.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("phone_number", phone);
      formData.append("whatsapp_number", whatsapp);
      if (logo) {
        formData.append("logo", logo);
      }

      const store = await createStore(formData, token);
      console.log("Store created:", store);

      alert("Store created successfully!");
      router.push("/merchant/store/me");
    } catch (error: any) {
      console.error("Error creating store:", error);
      console.log("Error response:", error.response);

      const errorMessage =
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        "Failed to create store.";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create Store</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}