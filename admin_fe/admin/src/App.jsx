import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Add from "./pages/Add";
import List from "./pages/list";
import Orders from "./pages/orders";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const App = () => {
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");
  const isAuthenticated = adminToken && adminUser;

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(adminUser);
      toast.success(`Welcome back, ${user.name}!`, {
        duration: 3000,
      });
    }
  }, [isAuthenticated, adminUser]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <div className="flex w-full">
                  <Sidebar />
                  <div className="flex-1 p-6 text-gray-600 text-base">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                      />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/add" element={<Add />} />
                      <Route path="/list" element={<List />} />
                      <Route path="/orders" element={<Orders />} />
                    </Routes>
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
