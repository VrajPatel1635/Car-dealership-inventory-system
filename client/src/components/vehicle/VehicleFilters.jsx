import React from "react";
import { Select, Input } from "../ui";

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
  priceRange,
  onPriceRangeChange,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full">
        <label className="block text-label-size font-mono text-muted mb-2 uppercase tracking-wider">
          Availability
        </label>
        <Select
          value={selectedStock}
          onChange={(e) => onStockChange(e.target.value)}
          options={[
            { value: "All", label: "All Stock" },
            { value: "In Stock", label: "In Stock" },
            { value: "Out of Stock", label: "Out of Stock" },
          ]}
          className="w-full bg-surface border-border focus:border-primary"
        />
      </div>

      <div className="w-full">
        <label className="block text-label-size font-mono text-muted mb-2 uppercase tracking-wider">
          Fuel Type
        </label>
        <Select
          value={selectedFuelType}
          onChange={(e) => onFuelTypeChange(e.target.value)}
          options={fuelTypeOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Fuel Types" : option,
          }))}
          className="w-full bg-surface border-border focus:border-primary"
        />
      </div>

      <div className="w-full">
        <label className="block text-label-size font-mono text-muted mb-2 uppercase tracking-wider">
          Transmission
        </label>
        <Select
          value={selectedTransmission}
          onChange={(e) => onTransmissionChange(e.target.value)}
          options={transmissionOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Transmissions" : option,
          }))}
          className="w-full bg-surface border-border focus:border-primary"
        />
      </div>

      <div className="w-full">
        <label className="block text-label-size font-mono text-muted mb-2 uppercase tracking-wider">
          Category
        </label>
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions.map((option) => ({
            value: option,
            label: option === "All" ? "All Categories" : option,
          }))}
          className="w-full bg-surface border-border focus:border-primary"
        />
      </div>

      <div className="w-full">
        <label className="block text-label-size font-mono text-muted mb-2 uppercase tracking-wider">
          Price Range
        </label>
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            placeholder="Min Price"
            value={priceRange?.min || ""}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="w-full bg-surface border-border focus:border-primary"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={priceRange?.max || ""}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="w-full bg-surface border-border focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
