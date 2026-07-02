"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
import { createProduct } from "@/services/productService";

export default function CreateProductPage() {
  const router = useRouter();

  const token = useAuthStore((state) => state.access);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!token) {
      alert("Please login again.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock_quantity", stock);

      if (image) {
        formData.append("image", image);
      }

      const product = await createProduct(
        formData,
        token
      );

      console.log(product);

      alert("Product created successfully!");

      router.push("/merchant/products/my");
    } catch (error: any) {
      console.error(error);

      console.log(error.response);

      alert(
        error.response?.data?.detail ||
          "Failed to create product."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded"
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files
                ? e.target.files[0]
                : null
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}