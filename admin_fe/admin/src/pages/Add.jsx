import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import toast from "react-hot-toast";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");

  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");

      const productData = {
        name,
        price: parseFloat(price),
        description,
        category,
        subcategory,
        bestseller,
        sizes,
        image1: image1 ? URL.createObjectURL(image1) : "",
        image2: image2 ? URL.createObjectURL(image2) : "",
        image3: image3 ? URL.createObjectURL(image3) : "",
        image4: image4 ? URL.createObjectURL(image4) : "",
        date: Date.now(),
      };

      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Reset form
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now use the form state to submit to the backend
    console.log({
      name,
      description,
      price,
      category,
      subcategory,
      bestseller,
      sizes,
      image1,
      image2,
      image3,
      image4,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-4 p-6"
    >
      <p className="mb-2 font-medium">Upload Images</p>
      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, idx) => (
          <label key={idx} htmlFor={`image${idx + 1}`}>
            <img
              className="w-20 h-20 object-cover border rounded"
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt={`upload-${idx + 1}`}
            />
            <input
              type="file"
              id={`image${idx + 1}`}
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (idx === 0) setImage1(file);
                if (idx === 1) setImage2(file);
                if (idx === 2) setImage3(file);
                if (idx === 3) setImage4(file);
              }}
            />
          </label>
        ))}
      </div>

      <div>
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Write description here..."
        />
      </div>

      <div>
        <p className="mb-2">Product Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Sub Category</p>
        <select
          value={subcategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Product Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL"].map((size) => (
            <p
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 rounded-md cursor-pointer border ${
                sizes.includes(size)
                  ? "bg-slate-600 text-white"
                  : "bg-slate-200"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="bg-gray-600 text-white px-6 py-2 rounded-full mt-4"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
