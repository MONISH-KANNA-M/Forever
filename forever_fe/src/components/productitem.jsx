import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { shopContext } from "../context/shopContext";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(shopContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x400?text=Image+Not+Found";
  };

  return (
    <div className="text-gray-700 cursor-pointer group">
      <Link to={`/products/${id}`} className="block">
        <div className="overflow-hidden relative">
          <img
            src={
              image && image.length > 0
                ? image[0]
                : "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt={name}
            className="w-full h-64 object-cover hover:scale-110 transition ease-in-out duration-300"
            onError={handleImageError}
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
            </span>
          </div>
        </div>
        <p className="pb-2 pt-3 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency} {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
