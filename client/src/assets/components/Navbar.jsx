import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Home, Info, Mail, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-bold">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <span>Chatly</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-white transition">
              Home
            </Link>
            <Link to="/about" className="text-white/90 hover:text-white transition">
              About
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition">
              Contact
            </Link>
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="text-white/90 hover:text-white transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
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
              className="text-white p-2 rounded-lg hover:bg-white/20 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white shadow-xl rounded-b-lg">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={toggleMenu}
              >
                <Home size={20} className="mr-3" />
                Home
              </Link>
              <Link
                to="/about"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={toggleMenu}
              >
                <Info size={20} className="mr-3" />
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={toggleMenu}
              >
                <Mail size={20} className="mr-3" />
                Contact
              </Link>
              {authUser && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    onClick={toggleMenu}
                  >
                    <User size={20} className="mr-3" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut size={20} className="mr-3" />
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
