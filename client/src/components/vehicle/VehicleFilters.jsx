import React from "react";
import { Select } from "../ui";

const VehicleFilters = ({
  selectedStock,
  onStockChange,
  selectedFuelType,
  onFuelTypeChange,
  fuelTypeOptions,
  selectedTransmission,
  onTransmissionChange,
  transmissionOptions,
  selectedCategory,
  onCategoryChange,
  categoryOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
      <div className="w-full sm:w-40">
        <Select
          value={selectedStock}
          onChange={(e) => onStockChange(e.target.value)}
          options={[
            { value: "All", label: "All Stock" },
            { value: "In Stock", label: "In Stock" },
            { value: "Out of Stock", label: "Out of Stock" },
          ]}
        />
      </div>

      <div className="w-full sm:w-40">
        <Select
          value={selectedFuelType}
          onChange={(e) => onFuelTypeChange(e.target.value)}
          options={fuelTypeOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Fuel Types" : option,
          }))}
        />
      </div>

      <div className="w-full sm:w-40">
        <Select
          value={selectedTransmission}
          onChange={(e) => onTransmissionChange(e.target.value)}
          options={transmissionOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Transmissions" : option,
          }))}
        />
      </div>

      <div className="w-full sm:w-40">
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Categories" : option,
          }))}
        />
      </div>
    </div>
  );
};

export default VehicleFilters;
