import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
        setTopProducts(data.topProducts || []);
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <img
                src={assets.parcel_icon}
                alt="Products"
                className="w-6 h-6"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <img src={assets.add_icon} alt="Users" className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.orderStatus === "confirmed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Top Products
            </h2>
          </div>
          <div className="p-6">
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                      {product.bestseller && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No top products</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => (window.location.href = "/add")}
              className="flex items-center justify-center p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <img src={assets.add_icon} alt="Add" className="w-5 h-5 mr-2" />
              Add New Product
            </button>
            <button
              onClick={() => (window.location.href = "/list")}
              className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <img
                src={assets.order_icon}
                alt="List"
                className="w-5 h-5 mr-2"
              />
              Manage Products
            </button>
            <button
              onClick={() => (window.location.href = "/orders")}
              className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <img
                src={assets.parcel_icon}
                alt="Orders"
                className="w-5 h-5 mr-2"
              />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
