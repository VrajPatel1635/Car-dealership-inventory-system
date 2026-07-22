import { useState } from "react";
import { vehicleService } from "../services/vehicle_service";

export const usePurchaseVehicle = () => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);

  const purchaseVehicle = async (id) => {
    setIsPurchasing(true);
    setPurchaseError(null);
    try {
      const result = await vehicleService.purchaseVehicle(id);
      return result;
    } catch (err) {
      setPurchaseError(
        err.response?.data?.error ||
          err.message ||
          "Failed to purchase vehicle",
      );
      throw err;
    } finally {
      setIsPurchasing(false);
    }
  };

  return { purchaseVehicle, isPurchasing, purchaseError };
};
