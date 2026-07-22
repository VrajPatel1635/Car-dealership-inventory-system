import { useState, useCallback } from "react";
import { vehicleService } from "../services/vehicle_service";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vehicleService.getAllVehicles();
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
