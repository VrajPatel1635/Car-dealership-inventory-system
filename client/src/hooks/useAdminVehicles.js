import { useState } from "react";
import { vehicleService } from "../services/vehicle_service";
import { useVehicles } from "./useVehicles";

export const useAdminVehicles = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const createVehicle = async (vehicleData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await vehicleService.createVehicle(vehicleData);
      await fetchVehicles();
    } catch (apiError) {
      setApiError(
        apiError.response?.data?.error || apiError.message || "Failed to create vehicle",
      );
      throw apiError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await vehicleService.updateVehicle(id, vehicleData);
      await fetchVehicles();
    } catch (apiError) {
      setApiError(
        apiError.response?.data?.error || apiError.message || "Failed to update vehicle",
      );
      throw apiError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteVehicle = async (id) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await vehicleService.deleteVehicle(id);
      await fetchVehicles();
    } catch (apiError) {
      setApiError(
        apiError.response?.data?.error || apiError.message || "Failed to delete vehicle",
      );
      throw apiError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const restockVehicle = async (id, quantity) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await vehicleService.restockVehicle(id, quantity);
      await fetchVehicles();
    } catch (apiError) {
      setApiError(
        apiError.response?.data?.error || apiError.message || "Failed to restock vehicle",
      );
      throw apiError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    vehicles,
    isLoading,
    error,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    restockVehicle,
    isSubmitting,
    apiError,
  };
};
