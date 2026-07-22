import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    // Redirect to inventory if authenticated but not an admin
    return <Navigate to="/inventory" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
