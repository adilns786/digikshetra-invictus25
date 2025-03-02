import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold transition-all duration-300 hover:text-gray-300">
          <Link to="/">Land Record System</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className="text-white transition duration-200 hover:text-gray-300"
          >
            Home
          </Link>
          {userRole === "User" && (
            <>
              <Link
                to="/landowner"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Dashboard
              </Link>
              <Link
                to="/landowner/properties"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Properties
              </Link>
              <Link
                to="/landowner/myproperty"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                My Properties
              </Link>
            </>
          )}
          {userRole === "User" && (
            <>
              <Link
                to="/buyer/search"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Search Properties
              </Link>
              <Link
                to="/buyer/favorites"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Favorites
              </Link>
            </>
          )}
          {userRole === "Register Officer" && (
            <>
              <Link
                to="/gov"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Government Dashboard
              </Link>
              <Link
                to="/gov/verify-properties"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Verify Properties
              </Link>
            </>
          )}
          <Link
            to="/help"
            className="text-white transition duration-200 hover:text-gray-300"
          >
            Help & Support
          </Link>
        </div>

        {/* Profile and Logout */}
        <div className="flex items-center space-x-4">
          {userRole && (
            <>
              <Link
                to="/profile"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Logout
              </button>
            </>
          )}
          {!userRole && (
            <>
              <Link
                to="/login"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white transition duration-200 hover:text-gray-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:hidden bg-gray-800 text-white p-4 space-y-4 transition-all duration-500 transform`}
      >
        <Link
          to="/"
          className="block text-white transition duration-200 hover:text-gray-300"
        >
          Home
        </Link>
        {userRole === "User" && (
          <>
            <Link
              to="/landowner"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Dashboard
            </Link>
            <Link
              to="/landowner/properties"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Properties
            </Link>
            <Link
              to="/landowner/myproperty"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              My Properties
            </Link>
          </>
        )}
        {userRole === "User" && (
          <>
            <Link
              to="/buyer/search"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Search Properties
            </Link>
            <Link
              to="/buyer/favorites"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Favorites
            </Link>
          </>
        )}
        {userRole === "Register Officer" && (
          <>
            <Link
              to="/gov"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Government Dashboard
            </Link>
            <Link
              to="/gov/verify-properties"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Verify Properties
            </Link>
          </>
        )}
        <Link
          to="/help"
          className="block text-white transition duration-200 hover:text-gray-300"
        >
          Help & Support
        </Link>
        {userRole && (
          <>
            <Link
              to="/profile"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Logout
            </button>
          </>
        )}
        {!userRole && (
          <>
            <Link
              to="/login"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-white transition duration-200 hover:text-gray-300"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
