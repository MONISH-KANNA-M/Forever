import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import { toast } from "react-toastify";
import { authUtils } from "../services/api";

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { setShowsearch, cartitem } = useContext(shopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in using auth utils
    const userData = authUtils.getUserData();
    setUser(userData);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    setShowProfileDropdown(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleAdminClick = () => {
    // Open admin panel in a new tab
    window.open("http://localhost:5174", "_blank");
  };

  // Get total items count
  const getTotalItems = () => {
    let count = 0;
    if (cartitem) {
      Object.keys(cartitem).forEach((itemId) => {
        Object.keys(cartitem[itemId]).forEach((size) => {
          count += cartitem[itemId][size];
        });
      });
    }
    return count;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <Link to="/">
          <li className="flex flex-col items-center gap-1 border-b-2 border-transparent hover:border-black cursor-pointer">
            Home
          </li>
        </Link>
        <Link to="/collection">
          <li className="flex flex-col items-center gap-1 border-b-2 border-transparent hover:border-black cursor-pointer">
            Collection
          </li>
        </Link>
        <Link to="/about">
          <li className="flex flex-col items-center gap-1 border-b-2 border-transparent hover:border-black cursor-pointer">
            About
          </li>
        </Link>
        <Link to="/contact">
          <li className="flex flex-col items-center gap-1 border-b-2 border-transparent hover:border-black cursor-pointer">
            Contact
          </li>
        </Link>
        <li
          className="flex flex-col items-center gap-1 border-2 border-gray-300 rounded-full px-4 py-1 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
          onClick={handleAdminClick}
        >
          Admin
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
          onClick={() => {
            if (location.pathname.includes("collection")) {
              setShowsearch(true);
            } else {
              navigate("/collection");
              // Small delay to ensure navigation completes before showing search
              setTimeout(() => setShowsearch(true), 100);
            }
          }}
        />

        <div className="relative profile-dropdown">
          <img
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
            onClick={() => {
              if (authUtils.isLoggedIn()) {
                setShowProfileDropdown(!showProfileDropdown);
              } else {
                navigate("/login");
              }
            }}
          />
          {showProfileDropdown && authUtils.isLoggedIn() && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-10 min-w-48">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart">
          <div className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 cursor-pointer"
            />
            {cartitem && Object.keys(cartitem).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
        </Link>
        <img
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setvisible(true)}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {visible && (
        <div className="fixed top-0 right-0 w-2/3 h-full bg-black text-white z-50 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-600">
            <div className="flex items-center gap-2">
              <img
                src={assets.dropdown_icon}
                alt="Back"
                className="h-4 rotate-180"
              />
              <p className="cursor-pointer" onClick={() => setvisible(false)}>
                Back
              </p>
            </div>
          </div>
          <ul className="flex flex-col mt-4">
            <Link to="/" onClick={() => setvisible(false)}>
              <li className="py-2 pl-6 border-b border-gray-600 cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/collection" onClick={() => setvisible(false)}>
              <li className="py-2 pl-6 border-b border-gray-600 cursor-pointer">
                Collection
              </li>
            </Link>
            <Link to="/about" onClick={() => setvisible(false)}>
              <li className="py-2 pl-6 border-b border-gray-600 cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/contact" onClick={() => setvisible(false)}>
              <li className="py-2 pl-6 border-b border-gray-600 cursor-pointer">
                Contact
              </li>
            </Link>
            <li
              className="py-2 pl-6 border-b border-gray-600 cursor-pointer bg-gray-800 rounded-lg mx-4 my-1"
              onClick={() => {
                setvisible(false);
                handleAdminClick();
              }}
            >
              Admin
            </li>
            <li
              className="py-2 pl-6 border-b border-gray-600 cursor-pointer flex items-center gap-2"
              onClick={() => {
                setvisible(false);
                navigate("/collection");
                // Small delay to ensure navigation completes before showing search
                setTimeout(() => setShowsearch(true), 100);
              }}
            >
              <img src={assets.search_icon} alt="Search" className="w-4" />
              Search
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
