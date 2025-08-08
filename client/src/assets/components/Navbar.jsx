import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Home, Info, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo (left) */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Chatly
            </Link>
          </div>

          {/* Center navigation */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
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

          {/* Right side (Profile / Logout) */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                <Home size={20} className="mr-2" />
                Home
              </Link>
              <Link
                to="/about"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                <Info size={20} className="mr-2" />
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                <Mail size={20} className="mr-2" />
                Contact
              </Link>
              {authUser && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    <User size={20} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
