import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="page flex-center bg-background-secondary min-h-screen p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
