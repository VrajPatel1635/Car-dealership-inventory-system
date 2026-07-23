import { useState, useCallback } from "react";
import { vehicleService } from "../services/vehicle_service";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = useCallback(async (filters = null) => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      
      // Determine if there are any active backend-supported filters
      const hasBackendFilters = filters && (
        (filters.searchQuery && filters.searchQuery.trim() !== "") ||
        (filters.selectedFuelType && filters.selectedFuelType !== "All") ||
        (filters.selectedTransmission && filters.selectedTransmission !== "All") ||
        (filters.selectedCategory && filters.selectedCategory !== "All") ||
        (filters.priceRange?.min && filters.priceRange.min !== "") ||
        (filters.priceRange?.max && filters.priceRange.max !== "")
      );

      if (hasBackendFilters) {
        const params = {};
        if (filters.searchQuery?.trim()) params.query = filters.searchQuery.trim();
        if (filters.selectedFuelType && filters.selectedFuelType !== "All") params.fuelType = filters.selectedFuelType;
        if (filters.selectedTransmission && filters.selectedTransmission !== "All") params.transmission = filters.selectedTransmission;
        if (filters.selectedCategory && filters.selectedCategory !== "All") params.category = filters.selectedCategory;
        if (filters.priceRange?.min) params.minPrice = filters.priceRange.min;
        if (filters.priceRange?.max) params.maxPrice = filters.priceRange.max;
        
        data = await vehicleService.searchVehicles(params);
      } else {
        data = await vehicleService.getAllVehicles();
      }
      
      setVehicles(data);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to fetch vehicles",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { vehicles, isLoading, error, fetchVehicles };
};
