"use client";

import Link from "next/link";
import { FaArrowRight, FaBoxOpen, FaStore } from "react-icons/fa";

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  product_count: number;
}

interface Props {
  store: Store;
}

export default function StoreCard({ store }: Props) {
  return (
    <Link href={`/stores/${store.id}`}>
      <article
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          {store.logo ? (
            <img
              src={store.logo}
              alt={store.name}
              className="
                h-full
                w-full
                object-cover
                group-hover:scale-105
                transition-transform
                duration-500
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaStore
                size={60}
                className="text-gray-300"
              />
            </div>
          )}

          <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 shadow text-sm font-medium">
            <FaBoxOpen className="inline mr-2 text-blue-600" />
            {store.product_count}
          </div>
        </div>

        <div className="p-6">

          <h2 className="text-xl font-bold text-gray-900">
            {store.name}
          </h2>

          <p className="mt-3 text-gray-600 line-clamp-2">
            {store.description}
          </p>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-blue-600 font-semibold">
              Browse Store
            </span>

            <FaArrowRight
              className="
                text-blue-600
                group-hover:translate-x-1
                transition-transform
              "
            />

          </div>

        </div>
      </article>
    </Link>
  );
}