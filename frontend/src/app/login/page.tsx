
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      setAuth(data);

      if (data.role === "merchant") {
        router.push("/merchant/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            KwariMart
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Don't have an account?

          <Link
            href="/register"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

