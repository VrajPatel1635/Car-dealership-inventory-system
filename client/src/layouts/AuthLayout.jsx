import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="page flex-center bg-background-secondary min-h-screen p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
