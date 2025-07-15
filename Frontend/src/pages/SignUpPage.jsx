import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { SignUp, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUp(formData);
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 animate-pulse">
          Chatting-App
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Start your journey with us 🚀
        </p>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="md:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-6 text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Create an Account
        </h2>
        <p className="text-sm text-gray-300 text-center">
          It's quick and easy — and free!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleChange}
            value={formData.fullName}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-md bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            required
            className="w-full p-3 rounded-md bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
          />

          <p className="text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition">
              Terms and Conditions
            </a>.
          </p>

          <button
            disabled={isSigningUp}
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold text-lg shadow-md hover:brightness-110 transition-all duration-200 disabled:opacity-60 flex items-center justify-center"
          >
            {isSigningUp ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing up...</span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:underline hover:text-cyan-300 transition"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
