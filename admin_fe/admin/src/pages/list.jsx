import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setList(data.products || []);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully");
        await fetchList();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6">
      <p className="mb-2 text-xl font-semibold">All Products List</p>

      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-100 font-semibold">
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border-b gap-3 md:gap-0"
        >
          <img
            className="w-12 h-12 object-cover rounded"
            src={item.image1}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>₹{item.price}</p>
          <p
            onClick={() => removeProduct(item._id)}
            className="text-right md:text-center cursor-pointer text-red-600 text-lg"
          >
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
