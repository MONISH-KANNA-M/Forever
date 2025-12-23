import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { shopContext } from "../context/shopContext";
import Title from "../components/title";
import Footer from "../components/footer";
import { authUtils } from "../services/api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!authUtils.isLoggedIn()) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    // Simulate loading orders from API
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock orders data
        const mockOrders = [
          {
            id: "ORD001",
            date: "2024-01-15",
            status: "shipped",
            total: 299.99,
            items: [
              {
                id: "1",
                name: "Classic White T-Shirt",
                image: "https://via.placeholder.com/80x80",
                quantity: 2,
                size: "M",
                price: 29.99,
              },
              {
                id: "2",
                name: "Denim Jeans",
                image: "https://via.placeholder.com/80x80",
                quantity: 1,
                size: "L",
                price: 89.99,
              },
            ],
          },
          {
            id: "ORD002",
            date: "2024-01-10",
            status: "delivered",
            total: 159.99,
            items: [
              {
                id: "3",
                name: "Casual Sneakers",
                image: "https://via.placeholder.com/80x80",
                quantity: 1,
                size: "42",
                price: 159.99,
              },
            ],
          },
          {
            id: "ORD003",
            date: "2024-01-05",
            status: "processing",
            total: 79.99,
            items: [
              {
                id: "4",
                name: "Hoodie Sweatshirt",
                image: "https://via.placeholder.com/80x80",
                quantity: 1,
                size: "XL",
                price: 79.99,
              },
            ],
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500 text-yellow-800";
      case "shipped":
        return "bg-blue-500 text-blue-800";
      case "delivered":
        return "bg-green-500 text-green-800";
      default:
        return "bg-gray-500 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title title1="MY" title2="ORDERS" />

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here
              </p>
              <button
                onClick={() => navigate("/collection")}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                      <p className="text-lg font-semibold">${order.total}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-3 border-t border-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      View Details
                    </button>
                    {order.status === "shipped" && (
                      <button className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
