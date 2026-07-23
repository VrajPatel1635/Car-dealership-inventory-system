import { useState, useMemo, useEffect } from "react";

export const useVehicleFilters = (vehicles = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState("All");
  const [selectedFuelType, setSelectedFuelType] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const updateSearchQuery = (query) => setSearchQuery(query);
  const updateStockFilter = (stock) => setSelectedStock(stock);
  const updateFuelTypeFilter = (fuelType) => setSelectedFuelType(fuelType);
  const updateTransmissionFilter = (transmission) =>
    setSelectedTransmission(transmission);
  const updateCategoryFilter = (category) => setSelectedCategory(category);
  const updatePriceRange = (range) => setPriceRange(range);

  // Cache the full list of vehicles to ensure dropdown options don't shrink when filtered
  const [initialVehicles, setInitialVehicles] = useState([]);
  useEffect(() => {
    if (vehicles.length > 0 && initialVehicles.length === 0) {
      setInitialVehicles(vehicles);
    }
  }, [vehicles, initialVehicles]);

  const fuelTypeOptions = useMemo(() => {
    const types = new Set(initialVehicles.map((v) => v.fuelType).filter(Boolean));
    return ["All", ...Array.from(types).sort()];
  }, [initialVehicles]);

  const transmissionOptions = useMemo(() => {
    const types = new Set(initialVehicles.map((v) => v.transmission).filter(Boolean));
    return ["All", ...Array.from(types).sort()];
  }, [initialVehicles]);

  const categoryOptions = useMemo(() => {
    const types = new Set(initialVehicles.map((v) => v.category).filter(Boolean));
    return ["All", ...Array.from(types).sort()];
  }, [initialVehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // The backend now handles query, fuel, transmission, category, and price.
      // We only need to filter by stock locally since it's not supported by the backend search.
      let matchesStock = true;
      if (selectedStock === "In Stock") {
        matchesStock = vehicle.stock > 0;
      } else if (selectedStock === "Out of Stock") {
        matchesStock = vehicle.stock === 0;
      }

      return matchesStock;
    });
  }, [vehicles, selectedStock]);

  return {
    filteredVehicles,
    searchQuery,
    selectedStock,
    selectedFuelType,
    selectedTransmission,
    selectedCategory,
    priceRange,
    fuelTypeOptions,
    transmissionOptions,
    categoryOptions,
    updateSearchQuery,
    updateStockFilter,
    updateFuelTypeFilter,
    updateTransmissionFilter,
    updateCategoryFilter,
    updatePriceRange,
  };
};
