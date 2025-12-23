import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 p-4">
      <div className="flex flex-col gap-6 pt-6 text-[15px]">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            />
          </svg>
          <p className="hidden md:block">Dashboard</p>
        </NavLink>

        <NavLink
          to="/add"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
        >
          <img className="w-5 h-5" src={assets.parcel_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
