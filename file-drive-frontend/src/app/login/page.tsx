"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      Cookies.set("accessToken", res.data.accessToken);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful! Please login.");
      setIsRegisterMode(false);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isRegisterMode) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isRegisterMode ? "Sign Up" : "Sign In"}
          </h1>
          <p className="text-gray-600">
            {isRegisterMode ? "Create a new account" : "Access your file storage"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!email || !password || loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded font-medium transition-colors"
          >
            {loading
              ? isRegisterMode
                ? "Signing up..."
                : "Signing in..."
              : isRegisterMode
              ? "Sign Up"
              : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            {isRegisterMode ? "Already have an account?" : "New user?"}{" "}
            <button
              onClick={() => setIsRegisterMode((prev) => !prev)}
              className="text-blue-600 hover:underline font-medium"
            >
              {isRegisterMode ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
