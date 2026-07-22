import React, { useEffect } from "react";
import { useVehicles } from "../hooks/useVehicles";
import { VehicleGrid } from "../components/vehicle";
import { Spinner, Alert, EmptyState } from "../components/ui";

const Inventory = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicles();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-h3-size font-heading font-bold text-foreground mb-2">
          Vehicle Inventory
        </h1>
        <p className="text-body-size text-muted">
          Browse our complete selection of premium vehicles.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      ) : vehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          description="Our inventory is currently empty. Please check back later."
        />
      ) : (
        <VehicleGrid vehicles={vehicles} />
      )}
    </div>
  );
};

export default Inventory;
