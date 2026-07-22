import { useState, useMemo } from "react";

export const useVehicleFilters = (vehicles = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState("All");
  const [selectedFuelType, setSelectedFuelType] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");

  const updateSearchQuery = (query) => setSearchQuery(query);
  const updateStockFilter = (stock) => setSelectedStock(stock);
  const updateFuelTypeFilter = (fuelType) => setSelectedFuelType(fuelType);
  const updateTransmissionFilter = (transmission) =>
    setSelectedTransmission(transmission);

  const fuelTypeOptions = useMemo(() => {
    const types = new Set(vehicles.map((v) => v.fuelType).filter(Boolean));
    return ["All", ...Array.from(types).sort()];
  }, [vehicles]);

  const transmissionOptions = useMemo(() => {
    const types = new Set(vehicles.map((v) => v.transmission).filter(Boolean));
    return ["All", ...Array.from(types).sort()];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Search filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        vehicle.make?.toLowerCase().includes(query) ||
        vehicle.model?.toLowerCase().includes(query);

      // Stock filter
      let matchesStock = true;
      if (selectedStock === "In Stock") {
        matchesStock = vehicle.stock > 0;
      } else if (selectedStock === "Out of Stock") {
        matchesStock = vehicle.stock === 0;
      }

      // Fuel Type filter
      const matchesFuelType =
        selectedFuelType === "All" || vehicle.fuelType === selectedFuelType;

      // Transmission filter
      const matchesTransmission =
        selectedTransmission === "All" ||
        vehicle.transmission === selectedTransmission;

      return (
        matchesSearch && matchesStock && matchesFuelType && matchesTransmission
      );
    });
  }, [
    vehicles,
    searchQuery,
    selectedStock,
    selectedFuelType,
    selectedTransmission,
  ]);

  return {
    filteredVehicles,
    searchQuery,
    selectedStock,
    selectedFuelType,
    selectedTransmission,
    fuelTypeOptions,
    transmissionOptions,
    updateSearchQuery,
    updateStockFilter,
    updateFuelTypeFilter,
    updateTransmissionFilter,
  };
};
