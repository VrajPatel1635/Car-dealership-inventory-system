import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <ShoppingCart size={28} strokeWidth={2} />
                </div>
                
                <div>
                  <h3 className="text-h4-size font-heading font-semibold mb-2 text-foreground tracking-tight">
                    Confirm Acquisition
                  </h3>
                  <p className="text-body-sm-size text-muted leading-relaxed px-4">
                    You are about to acquire the <span className="font-semibold text-foreground">{vehicle.year} {vehicle.make} {vehicle.model}</span>.
                  </p>
                </div>
                
                <div className="w-full bg-background rounded-2xl p-5 mt-4 border border-border text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-muted font-mono font-semibold">Total Price</span>
                    <span className="text-h5-size font-mono font-bold text-primary tracking-tight">{formatPrice(vehicle.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-muted font-mono font-semibold">Stock Remaining</span>
                    <span className="text-sm font-mono font-medium text-foreground">{vehicle.stock}</span>
                  </div>
                </div>

                {error && (
                  <Alert variant="error" className="mt-4 w-full text-left">
                    {error}
                  </Alert>
                )}
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
                className="flex-1 rounded-xl py-6 font-mono uppercase tracking-widest text-[10px]"
              >
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseDialog;
