import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";

const NotFound = () => {
  return (
    <div className="container py-24 flex flex-col items-center justify-center text-center">
      <h1 className="heading text-h1-size mb-4">404</h1>
      <p className="text-body-lg-size text-muted mb-8">Page not found.</p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
