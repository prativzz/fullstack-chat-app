import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Home, Info, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-zinc-900 tracking-tight">
              Chatly
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-zinc-700 hover:text-black transition">Home</Link>
            <Link to="/about" className="text-zinc-700 hover:text-black transition">About</Link>
            <Link to="/contact" className="text-zinc-700 hover:text-black transition">Contact</Link>

            {authUser && (
              <>
                <Link to="/profile" className="text-zinc-700 hover:text-black transition">Profile</Link>
                <button
                  onClick={logout}
                  className="text-zinc-700 hover:text-black transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-zinc-700 hover:text-black focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white rounded-b-lg shadow-sm">
            <div className="py-2 px-3 space-y-1">
              <Link
                to="/"
                className="flex items-center gap-2 px-2 py-2 text-zinc-700 hover:text-black transition"
                onClick={toggleMenu}
              >
                <Home size={20} />
                Home
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-2 py-2 text-zinc-700 hover:text-black transition"
                onClick={toggleMenu}
              >
                <Info size={20} />
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-2 py-2 text-zinc-700 hover:text-black transition"
                onClick={toggleMenu}
              >
                <Mail size={20} />
                Contact
              </Link>

              {authUser && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-2 py-2 text-zinc-700 hover:text-black transition"
                    onClick={toggleMenu}
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 px-2 py-2 w-full text-zinc-700 hover:text-black transition"
                  >
                    <LogOut size={20} />
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
