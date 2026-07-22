import React from "react";

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="heading text-h3-size mb-2">{title}</h1>
      {subtitle && <p className="text-body-size text-muted">{subtitle}</p>}
    </div>
  );
};

export default AuthHeader;
