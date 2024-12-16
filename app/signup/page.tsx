"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSign, Key } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="card p-8 animate-fade-in w-1/4">
        <h2 className="text-3xl font-bold text-center text-text-100 mb-8">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="bg-text-100 flex items-center p-2 rounded-xl overflow-hidden">
            <AtSign size={22} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full ml-2"
              placeholder="Email"
              required
            />
          </div>
          <div className="bg-text-100 flex items-center p-2 rounded-xl overflow-hidden">
            <Key size={22} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full ml-2"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <button type="submit" className="bg-primary-100 w-full p-2 rounded-xl">
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-accent-100"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
