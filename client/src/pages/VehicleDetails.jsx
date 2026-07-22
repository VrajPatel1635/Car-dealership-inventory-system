import React from "react";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  return (
    <div className="container py-12">
      <h1 className="heading text-h3-size mb-4">Vehicle Details</h1>
      <p className="text-body-size text-muted">
        Placeholder for vehicle ID: {id}
      </p>
    </div>
  );
};

export default VehicleDetails;
