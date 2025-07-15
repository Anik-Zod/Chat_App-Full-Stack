import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { isLoggingIn, login } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10">
      {/* Left Side */}
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left text-white">
        <h1 className="h-24 text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
          Chatting-App
        </h1>
        <p className=" text-lg text-gray-300">
          Connect with people around the world.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 space-y-6 text-white">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-400 text-center">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-md bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          />

          <p className="text-xs text-gray-400">
            By logging in, you agree to our{" "}
            <a href="#" className="text-cyan-400 underline hover:text-cyan-300">
              Terms & Conditions
            </a>.
          </p>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-md bg-gradient-to-r from-green-400 to-lime-500 text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoggingIn ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/signup"
            className="text-sm text-gray-300 hover:underline hover:text-cyan-300 transition"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}
