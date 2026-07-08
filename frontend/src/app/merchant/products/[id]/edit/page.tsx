"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

import {
  getProduct,
  updateProduct,
} from "@/services/productService";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const token = useAuthStore(
    (state) => state.access
  );

  const id = Number(params.id);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const product = await getProduct(id);

      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(
        product.stock_quantity.toString()
      );
      setIsActive(product.is_active);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      alert("Please login again.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append(
        "description",
        description
      );
      formData.append("price", price);
      formData.append(
        "stock_quantity",
        stock
      );
      formData.append(
        "is_active",
        String(isActive)
      );

      if (image) {
        formData.append("image", image);
      }

      await updateProduct(
        id,
        formData,
        token
      );

      alert("Product updated!");

      router.push(
        "/merchant/products/my"
      );
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          className="w-full border p-3 rounded"
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(
                e.target.checked
              )
            }
          />
          Active
        </label>

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
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}