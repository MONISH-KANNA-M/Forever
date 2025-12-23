import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import ProductItem from "./productitem";

const SearchResults = () => {
  const { products, search } = useContext(shopContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, products]);

  if (search.trim() === "") return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-gray-600">SEARCH</span>{" "}
          <span className="text-black">RESULTS</span>
        </h2>
      </div>
      <p className="text-center text-gray-600 mb-6">
        Found {searchResults.length} result
        {searchResults.length !== 1 ? "s" : ""} for "{search}"
      </p>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
          {searchResults.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found for "{search}"
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
