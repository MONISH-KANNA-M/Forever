import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";

const Searchbar = () => {
  const { search, setsSearch, showsearch, setShowsearch } =
    useContext(shopContext);
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowsearch(false);
        setsSearch("");
      }
    };

    if (showsearch) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showsearch, setShowsearch, setsSearch]);

  // Only show search bar if we're on collection page and search is active
  if (!showsearch || !location.pathname.includes("collection")) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="max-w-md mx-auto flex items-center justify-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-4 py-2 rounded-md bg-white">
          <input
            type="text"
            value={search}
            onChange={(e) => setsSearch(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 outline-none px-2 bg-transparent min-w-48"
            autoFocus
          />
          <img className="w-4 h-4" src={assets.search_icon} alt="Search" />
        </div>
        <img
          className="inline w-4 h-4 ml-3 cursor-pointer hover:opacity-70"
          src={assets.cross_icon}
          alt="Close"
          onClick={() => {
            setShowsearch(false);
            setsSearch("");
            toast.info("Search closed", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Searchbar;
