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
  const handleChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };
  return (
    <section className="w-screen  flex flex-col md:flex-row items-center md:px-20 px-10 pt-10 bg-[#242526] h-screen">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left text-white">
        <p className="text-6xl font-semibold">Chating-App</p>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="md:w-1/2 mt-10 bg-[#242526] border md:space-y-3 border-gray-400 shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold pb-4 text-gray-400">
          Log in to your account
        </h1>
        <p className="text-gray-300 text-xm mb-4">It's quick and easy.</p>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Mobile number or email"
            required
            className="border-gray-400 text-gray-400 border p-2 rounded w-full mt-3"
          />
          <input
           onChange={handleChange}
            type="password"
            name="password"
            id="password"
            required
            placeholder="password"
            className="border-gray-400 text-gray-400 border p-2 rounded w-full mt-3"
          />

          <p className="text-xm text-gray-400 mt-3">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-600">
              Terms
            </a>
            .
          </p>
          <button
            disabled={isLoggingIn}
            type="submit"
            className="cursor-pointer bg-green-500 text-white w-full p-3 rounded flex items-center justify-center disabled:opacity-60"
          >
            {isLoggingIn ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="text-gray-200 w-6 h-6 animate-spin" />
                <span className="text-sm">Loging...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Link to="/signup" className="text-gray-400 underline">
          dont have an account ?
        </Link>
      </div>
    </section>
  );
}
