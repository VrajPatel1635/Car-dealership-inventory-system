import React from "react";

const AuthForm = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
      {children}
    </form>
  );
};

export default AuthForm;
