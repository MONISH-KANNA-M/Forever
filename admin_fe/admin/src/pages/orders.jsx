import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Orders fetch error:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        toast.success("Order status updated successfully");
        fetchOrders(); // Refresh the list
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Order Management
      </h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Customer: {order.user?.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {order.user?.email || "No email"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on: {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="mt-4 lg:mt-0 lg:text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product?.image1}
                          alt={item.product?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.product?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Shipping Address:
                </h4>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-900">{order.shippingAddress?.name}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress?.address}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}{" "}
                    {order.shippingAddress?.pincode}
                  </p>
                  <p className="text-gray-600">
                    Phone: {order.shippingAddress?.phone}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400">
            Orders will appear here once customers place them
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
