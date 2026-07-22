import React, { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "../ui";

const DeleteVehicleDialog = ({
  isOpen,
  onClose,
  onConfirm,
  vehicle,
  isLoading,
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
            <div className="shrink-0 w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-h6-size font-heading font-semibold mb-2">
                Delete Vehicle
              </h3>
              <p className="text-body-sm-size text-muted">
                Are you sure you want to delete the{" "}
                <strong>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </strong>
                ? This action cannot be undone.
              </p>
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
            className="bg-error hover:bg-error/90 text-white border-error"
            onClick={onConfirm}
            loading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVehicleDialog;
