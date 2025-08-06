import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("full name is required")
     if (!formData.email.trim())
      return toast.error("full name is required")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
  return toast.error("Please enter a valid email address");
}if (!formData.password.trim()) {
  return toast.error("Password is required");

  
}

if (formData.password.length < 6) {
  return toast.error("Password must be at least 6 characters long")};
  return true;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const success=validateForm()
    if(success===true) {
signup(formData)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-gray-800 text-white py-2 rounded-xl hover:bg-gray-700 transition duration-200"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="inline-block mr-2 animate-spin" size={18} />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
