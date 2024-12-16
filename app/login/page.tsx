"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSign, Key } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetEmailSent(true);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="card p-8 animate-fade-in w-1/4">
        <h2 className="text-3xl font-bold text-center text-text-50 mb-8">
          Welcome Back
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
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowResetModal(true)}
              className="font-medium text-xs text-accent-50 bg-transparent border-none cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary-100 w-full p-2 rounded-xl"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-accent-50">
            Sign up here
          </Link>
        </p>
      </div>
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-black border p-6 rounded-xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-text-50 mb-4">
              Reset Password
            </h3>
            <p className="text-text-50 mb-4">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-3">
              <div className="bg-text-100 flex items-center p-2 rounded-xl overflow-hidden">
                <AtSign size={22} />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="bg-transparent outline-none w-full ml-2"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary-100 w-full p-2 rounded-xl text-white"
                disabled={resetEmailSent}
              >
                {resetEmailSent ? "Email Sent" : "Send Reset Link"}
              </button>
            </form>
            {resetEmailSent && (
              <p className="text-green-500 text-sm text-center mt-2">
                Password reset email sent. Check your inbox.
              </p>
            )}
            <button
              onClick={() => setShowResetModal(false)}
              className="mt-4 text-accent-50 bg-transparent border-none cursor-pointer w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
