import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import ProductItem from "./productitem";

const LatestCollection = () => {
  const { products } = useContext(shopContext);
  const [latestproducts, setlatestproducts] = useState([]);

  useEffect(() => {
    setlatestproducts(products.slice(0, 12));
  }, [products]);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-gray-600">LATEST</span>{" "}
          <span className="text-black">COLLECTIONS</span>
        </h2>
      </div>
      <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center pb-6">
        Explore our latest arrivals that blend trend, comfort, and style. Shop
        now to stay ahead of the fashion curve.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
        {latestproducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
