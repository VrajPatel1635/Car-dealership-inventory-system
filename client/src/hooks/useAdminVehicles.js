import { useState } from "react";
import { vehicleService } from "../services/vehicle_service";
import { useVehicles } from "./useVehicles";

export const useAdminVehicles = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const createVehicle = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await vehicleService.createVehicle(data);
      await fetchVehicles();
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || err.message || "Failed to create vehicle",
      );
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateVehicle = async (id, data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await vehicleService.updateVehicle(id, data);
      await fetchVehicles();
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || err.message || "Failed to update vehicle",
      );
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteVehicle = async (id) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await vehicleService.deleteVehicle(id);
      await fetchVehicles();
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || err.message || "Failed to delete vehicle",
      );
      throw err;
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
    isSubmitting,
    submitError,
  };
};
