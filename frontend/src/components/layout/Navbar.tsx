
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { access, role, logout } = useAuthStore();

  // Hide Navbar on authentication pages
  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          KwariMart
        </Link>

        {/* Navigation */}

        <nav className="flex items-center gap-6">

          <Link
            href="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href="/stores"
            className="hover:text-blue-600 transition"
          >
            Stores
          </Link>

          <Link
            href="/cart"
            className="hover:text-blue-600 transition"
          >
            Cart
          </Link>

          {!access ? (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "merchant" && (
                <Link
                  href="/merchant/dashboard"
                  className="hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              )}

              {role === "customer" && (
                <Link
                  href="/customer/orders"
                  className="hover:text-blue-600 transition"
                >
                  My Orders
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}

