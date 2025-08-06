import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"; // Adjust path if needed

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Left - Logo */}
          <div className="absolute left-0 pl-2">
            <span
              className="text-3xl font-bold text-gray-800"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Chatly
            </span>
          </div>

          {/* Center - Nav Links */}
          <div className="mx-auto flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition">
              Contact
            </Link>
          </div>

          {/* Right - Auth Buttons */}
          <div className="absolute right-0 flex items-center space-x-3 pr-2">
           

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 px-4 py-1 rounded-xl hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 px-4 py-1 rounded-xl hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
