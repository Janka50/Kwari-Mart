import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-4">
      <h1 className="text-4xl font-bold">
        Kwari Mart
      </h1>

      <Link
        href="/stores"
        className="block bg-blue-600 text-white px-6 py-3 rounded w-fit"
      >
        Browse Stores
      </Link>

      <Link
        href="/cart"
        className="block bg-green-600 text-white px-6 py-3 rounded w-fit"
      >
        View Cart
      </Link>
    </div>
  );
}