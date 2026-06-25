"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [role, setRole] =
    useState("customer");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      password !== confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        username,
        email,
        password,
        role,
      });

      alert(
        "Registration successful"
      );

      router.push("/login");
    } catch (error) {
      console.error(error);

      alert(
        "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
           type="text"
           placeholder="Username"
           value={username}
           onChange={(e) =>
           setUsername(e.target.value)
        }
      />
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >
            <option value="customer">
              Customer
            </option>

            <option value="merchant">
              Merchant
            </option>
          </select>
        </div>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}