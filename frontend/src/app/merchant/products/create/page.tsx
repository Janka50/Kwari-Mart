"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
import { createProduct } from "@/services/productService";

export default function CreateProductPage() {
  const router = useRouter();

  const token = useAuthStore(
    (state) => state.access
  );

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stockQuantity, setStockQuantity] =
    useState("");

  const [isActive, setIsActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      alert("Login required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);

      formData.append(
        "description",
        description
      );

      formData.append(
        "price",
        price
      );

      formData.append(
        "stock_quantity",
        stockQuantity
      );

      formData.append(
        "is_active",
        String(isActive)
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      await createProduct(
        formData,
        token
      );

      alert(
        "Product created successfully"
      );

      router.push(
        "/merchant/products"
      );

    } catch (error) {
      console.error(error);
      alert(
        "Failed to create product"
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
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) =>
            setStockQuantity(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
        />

        <label className="flex gap-2">

          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(
                e.target.checked
              )
            }
          />

          Active Product

        </label>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Create Product
        </button>

      </form>

    </div>
  );
}