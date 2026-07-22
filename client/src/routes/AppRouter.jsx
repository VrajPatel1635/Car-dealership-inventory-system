import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout, AdminLayout } from "../layouts";
import {
  Home,
  Login,
  Register,
  Inventory,
  VehicleDetails,
  AdminDashboard,
  NotFound,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
