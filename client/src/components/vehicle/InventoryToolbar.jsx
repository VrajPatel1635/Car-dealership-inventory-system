import React from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleFilters from "./VehicleFilters";

const InventoryToolbar = ({
  searchQuery,
  onSearchChange,
  selectedStock,
  onStockChange,
  selectedFuelType,
  onFuelTypeChange,
  fuelTypeOptions,
  selectedTransmission,
  onTransmissionChange,
  transmissionOptions,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-4 bg-surface border border-border rounded-lg">
      <VehicleSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      <VehicleFilters
        selectedStock={selectedStock}
        onStockChange={onStockChange}
        selectedFuelType={selectedFuelType}
        onFuelTypeChange={onFuelTypeChange}
        fuelTypeOptions={fuelTypeOptions}
        selectedTransmission={selectedTransmission}
        onTransmissionChange={onTransmissionChange}
        transmissionOptions={transmissionOptions}
      />
    </div>
  );
};

export default InventoryToolbar;
