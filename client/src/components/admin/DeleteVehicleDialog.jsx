import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && vehicle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overscroll-none"
          data-lenis-prevent="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={!isLoading ? onClose : undefined}
            aria-hidden="true"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="relative w-full max-w-md bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="p-8 pb-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-3">
                  <AlertTriangle size={28} strokeWidth={2} />
                </div>
                
                <div>
                  <h3 className="text-h4-size font-heading font-semibold mb-2 text-foreground tracking-tight">
                    Delete Vehicle
                  </h3>
                  <p className="text-body-sm-size text-muted leading-relaxed px-4">
                    Are you sure you want to delete the <span className="font-semibold text-foreground">{vehicle.year} {vehicle.make} {vehicle.model}</span>? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-8 pb-8 pt-2 flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 rounded-xl py-6 font-mono uppercase tracking-widest text-[10px]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={onConfirm}
                loading={isLoading}
                className="flex-1 rounded-xl py-6 font-mono uppercase tracking-widest text-[10px] bg-error hover:bg-error/90 text-white border-error"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteVehicleDialog;
