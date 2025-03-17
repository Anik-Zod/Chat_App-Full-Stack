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
    <div className="w-screen flex flex-col md:flex-row items-center md:px-20 px-10 pt-10 bg-[#242526] h-screen">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left text-white">
        <p className="text-6xl font-semibold">Chating-App</p>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="md:w-1/2 mt-10 bg-[#242526] border md:space-y-3 border-gray-400 shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold pb-4 text-gray-400">Create an account</h1>
        <p className="text-gray-300 text-sm mb-4">It's quick and easy.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            onChange={handleChange}
            value={formData.fullName}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            autoComplete="name"
            required
            className="border border-gray-400 text-gray-400 p-2 rounded w-full"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="border border-gray-400 text-gray-400 p-2 rounded w-full"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            id="password"
            name="password"
            placeholder="New password"
            autoComplete="new-password"
            required
            className="border border-gray-400 text-gray-400 p-2 rounded w-full"
          />

          <p className="text-sm text-gray-400">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-600">Terms</a>.
          </p>

          <button
            disabled={isSigningUp}
            type="submit"
            className="cursor-pointer bg-green-500 text-white w-full p-3 rounded flex items-center justify-center disabled:opacity-60"
          >
            {isSigningUp ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="text-gray-200 w-6 h-6 animate-spin" />
                <span className="text-sm">Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <Link to="/login" className="text-gray-400 underline block text-center mt-3">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
