import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer";
import { assets } from "../assets/frontend_assets/assets";
import { shopContext } from "../context/shopContext";
import ProductItem from "../components/productitem";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, search } = useContext(shopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("");
  const location = useLocation();

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value.toLowerCase();
    if (subcategory.includes(value)) {
      setSubcategory(subcategory.filter((item) => item !== value));
    } else {
      setSubcategory([...subcategory, value]);
    }
  };

  const sortProducts = (productsList) => {
    let sortedProducts = [...productsList];
    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Initial setup
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Apply filters and sort
  useEffect(() => {
    const filtered = products.slice().filter((item) => {
      const catMatch =
        category.length === 0 ||
        category.includes(item.category?.toLowerCase());
      const subcatMatch =
        subcategory.length === 0 ||
        subcategory.includes(item.subCategory?.toLowerCase());

      // Add search filter
      const searchMatch =
        search.length === 0 ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return catMatch && subcatMatch && searchMatch;
    });

    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [category, subcategory, sortType, products, search]);

  // Loading state
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500">Loading products...</p>
          <p className="text-sm text-gray-400 mt-2">
            Please wait while we load the collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Collection</h1>

        <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">
          {/* Filter Panel */}
          <div className="min-w-60">
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center cursor-pointer gap-2"
            >
              FILTERS
              <img
                className={`h-3 sm:hidden transition-transform duration-300 ${
                  showFilter ? "rotate-90" : ""
                }`}
                src={assets.dropdown_icon}
                alt=""
              />
            </p>

            {/* Category Filter */}
            <div
              className={`border border-gray-300 p-5 py-3 mt-6 ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 capitalize"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3"
                      value={cat}
                      checked={category.includes(cat.toLowerCase())}
                      onChange={toggleCategory}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div
              className={`border border-gray-300 p-5 py-3 mt-6 ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-2 capitalize"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3"
                      value={sub}
                      checked={subcategory.includes(sub.toLowerCase())}
                      onChange={toggleSubcategory}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
              <div>
                <h2 className="font-semibold">ALL COLLECTIONS</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <select
                className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <div key={item._id || index} className="relative">
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">
                    No products match the selected filters.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
