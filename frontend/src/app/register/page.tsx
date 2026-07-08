
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("customer");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username,
        email,
        password,
        role,
      });

      alert("Registration successful!");

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            KwariMart
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="Enter email"
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
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              required
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Account Type
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="customer">
                Customer
              </option>

              <option value="merchant">
                Merchant
              </option>
            </select>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Already have an account?

          <Link
            href="/login"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

