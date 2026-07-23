import React, { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleSearch from "./VehicleSearch";
import VehicleFilters from "./VehicleFilters";
import { Button } from "../ui";

const InventorySidebar = ({
  searchQuery,
  onSearchChange,
  selectedStock,
  onStockChange,
  selectedFuelType,
  onFuelTypeChange,
  fuelTypeOptions,
  selectedTransmission,
  onTransmissionChange,
  transmissionOptions,
  selectedCategory,
  onCategoryChange,
  categoryOptions,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (isMobileFilterOpen) {
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
  }, [isMobileFilterOpen]);

  return (
    <>
      {/* Desktop View (Sidebar) */}
      <div className="hidden lg:flex flex-col w-full relative">
        <div className="bg-surface border border-border p-6 rounded-3xl sticky top-28 shadow-sm">
          <h2 className="text-h6-size font-heading font-semibold mb-6 text-foreground tracking-tight">
            Refine Search
          </h2>
          
          <div className="mb-8">
            <VehicleSearch
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>

          <div className="w-full h-px bg-border mb-8"></div>

          <VehicleFilters
            selectedStock={selectedStock}
            onStockChange={onStockChange}
            selectedFuelType={selectedFuelType}
            onFuelTypeChange={onFuelTypeChange}
            fuelTypeOptions={fuelTypeOptions}
            selectedTransmission={selectedTransmission}
            onTransmissionChange={onTransmissionChange}
            transmissionOptions={transmissionOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            categoryOptions={categoryOptions}
          />
        </div>
      </div>

      {/* Mobile View (Search + Filter Button) */}
      <div className="flex lg:hidden flex-col w-full mb-2">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <VehicleSearch
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="h-[46px] w-[46px] shrink-0 rounded-xl bg-surface border border-border text-foreground hover:bg-surface-hover hover:border-primary/50 transition-all flex items-center justify-center shadow-sm cursor-pointer group"
          >
            <Filter size={18} className="group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4 overscroll-none"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              className="relative w-full max-w-md bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-border shrink-0">
                <h2 className="text-h5-size font-heading font-semibold text-foreground tracking-tight">
                  Refine Search
                </h2>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-surface-hover transition-colors text-muted hover:text-foreground cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <VehicleFilters
                  selectedStock={selectedStock}
                  onStockChange={onStockChange}
                  selectedFuelType={selectedFuelType}
                  onFuelTypeChange={onFuelTypeChange}
                  fuelTypeOptions={fuelTypeOptions}
                  selectedTransmission={selectedTransmission}
                  onTransmissionChange={onTransmissionChange}
                  transmissionOptions={transmissionOptions}
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                  categoryOptions={categoryOptions}
                />
              </div>
              
              <div className="p-6 border-t border-border bg-background shrink-0">
                <Button 
                  variant="primary" 
                  className="w-full py-4 rounded-xl font-mono tracking-widest uppercase text-[10px]"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InventorySidebar;
