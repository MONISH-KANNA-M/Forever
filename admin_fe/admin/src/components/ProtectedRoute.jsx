import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");

  if (!adminToken || !adminUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
