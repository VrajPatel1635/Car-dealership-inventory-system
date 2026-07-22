import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button, Alert } from "../ui";

const PurchaseDialog = ({
  isOpen,
  onClose,
  onConfirm,
  vehicle,
  isLoading,
  error,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShoppingCart size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-h6-size font-heading font-semibold mb-2">
                Confirm Purchase
              </h3>
              <p className="text-body-sm-size text-muted">
                Are you sure you want to purchase the{" "}
                <strong>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </strong>
                ?
              </p>
              <p className="text-body-sm-size text-muted mt-2">
                Current Stock: {vehicle.stock}
              </p>
              {error && (
                <Alert variant="error" className="mt-4">
                  {error}
                </Alert>
              )}
            </div>
          </div>
        </div>
        <div className="bg-background px-6 py-4 flex justify-end gap-3 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            loading={isLoading}
          >
            Confirm Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDialog;
