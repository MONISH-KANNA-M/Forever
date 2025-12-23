import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/admin_assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white shadow">
      <img className="w-[80px]" src={assets.logo} alt="Logo" />
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full hover:bg-gray-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
