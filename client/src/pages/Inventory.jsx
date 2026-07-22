import React, { useEffect, useState } from "react";
import { useVehicles } from "../hooks/useVehicles";
import { useVehicleFilters } from "../hooks/useVehicleFilters";
import { usePurchaseVehicle } from "../hooks/usePurchaseVehicle";
import {
  VehicleGrid,
  InventoryToolbar,
  PurchaseDialog,
} from "../components/vehicle";
import { Spinner, Alert, EmptyState } from "../components/ui";

const Inventory = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicles();

  const {
    filteredVehicles,
    searchQuery,
    selectedStock,
    selectedFuelType,
    selectedTransmission,
    selectedCategory,
    fuelTypeOptions,
    transmissionOptions,
    categoryOptions,
    updateSearchQuery,
    updateStockFilter,
    updateFuelTypeFilter,
    updateTransmissionFilter,
    updateCategoryFilter,
  } = useVehicleFilters(vehicles);

  const { purchaseVehicle, isPurchasing, purchaseError } = usePurchaseVehicle();
  const [purchasingVehicle, setPurchasingVehicle] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handlePurchaseConfirm = async () => {
    try {
      await purchaseVehicle(purchasingVehicle._id);
      setPurchasingVehicle(null);
      setSuccessMessage("Vehicle purchased successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchVehicles();
    } catch (err) {
      // Error is handled by hook and displayed in dialog
    }
  };

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

      {successMessage && (
        <Alert variant="success" className="mb-6">
          {successMessage}
        </Alert>
      )}

      {isLoading && !vehicles.length ? (
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
        <>
          <InventoryToolbar
            searchQuery={searchQuery}
            onSearchChange={updateSearchQuery}
            selectedStock={selectedStock}
            onStockChange={updateStockFilter}
            selectedFuelType={selectedFuelType}
            onFuelTypeChange={updateFuelTypeFilter}
            fuelTypeOptions={fuelTypeOptions}
            selectedTransmission={selectedTransmission}
            onTransmissionChange={updateTransmissionFilter}
            transmissionOptions={transmissionOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={updateCategoryFilter}
            categoryOptions={categoryOptions}
          />

          {filteredVehicles.length === 0 ? (
            <EmptyState
              title="No matches found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <VehicleGrid
              vehicles={filteredVehicles}
              onPurchaseClick={(vehicle) => setPurchasingVehicle(vehicle)}
            />
          )}
        </>
      )}

      <PurchaseDialog
        isOpen={!!purchasingVehicle}
        onClose={() => !isPurchasing && setPurchasingVehicle(null)}
        onConfirm={handlePurchaseConfirm}
        vehicle={purchasingVehicle}
        isLoading={isPurchasing}
        error={purchaseError}
      />
    </div>
  );
};

export default Inventory;
