import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useVehicles } from "../hooks/useVehicles";
import { useVehicleFilters } from "../hooks/useVehicleFilters";
import { usePurchaseVehicle } from "../hooks/usePurchaseVehicle";
import {
  VehicleGrid,
  InventorySidebar,
  PurchaseDialog,
} from "../components/vehicle";
import { Spinner, Alert, EmptyState } from "../components/ui";

const SEARCH_DEBOUNCE_MS = 350;

const Inventory = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicles();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const {
    filteredVehicles,
    searchQuery,
    selectedStock,
    selectedFuelType,
    selectedTransmission,
    selectedCategory,
    priceRange,
    fuelTypeOptions,
    transmissionOptions,
    categoryOptions,
    updateSearchQuery,
    updateStockFilter,
    updateFuelTypeFilter,
    updateTransmissionFilter,
    updateCategoryFilter,
    updatePriceRange,
  } = useVehicleFilters(vehicles);

  const { purchaseVehicle, isPurchasing, purchaseError } = usePurchaseVehicle();
  const [purchasingVehicle, setPurchasingVehicle] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchVehicles({
        searchQuery,
        selectedFuelType,
        selectedTransmission,
        selectedCategory,
        priceRange,
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [
    fetchVehicles,
    searchQuery,
    selectedFuelType,
    selectedTransmission,
    selectedCategory,
    priceRange,
  ]);

  const handleVehiclePurchase = async () => {
    try {
      await purchaseVehicle(purchasingVehicle._id);
      setPurchasingVehicle(null);
      setSuccessMessage("Vehicle purchased successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchVehicles({
        searchQuery,
        selectedFuelType,
        selectedTransmission,
        selectedCategory,
        priceRange,
      });
    } catch (err) {
      // Error is handled by hook and displayed in dialog
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Dynamic Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-16 px-6 lg:px-12 overflow-hidden flex items-end min-h-[40vh] border-b border-border"
      >
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto max-w-[1400px] z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-h1-size font-heading font-bold text-foreground mb-4 leading-none tracking-tight"
          >
            Curated<br/>
            <span className="text-primary italic">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-body-lg-size text-muted max-w-xl"
          >
            Browse our complete selection of premium, hand-picked vehicles designed for exceptional performance and timeless elegance.
          </motion.p>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        {successMessage && (
          <Alert variant="success" className="mb-8 max-w-2xl">
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert variant="error" className="mb-8 max-w-2xl">
            {error}
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
            <InventorySidebar
              searchQuery={searchQuery}
              onSearchChange={updateSearchQuery}
              selectedStock={selectedStock}
              onStockChange={updateStockFilter}
              selectedFuelType={selectedFuelType}
              onFuelTypeChange={updateFuelTypeFilter}
              fuelTypeOptions={fuelTypeOptions}
              selectedTransmission={selectedTransmission}
              onTransmissionChange={updateTransmissionFilter}
              transmissionOptions={transmissionOptions}
              selectedCategory={selectedCategory}
              onCategoryChange={updateCategoryFilter}
              categoryOptions={categoryOptions}
              priceRange={priceRange}
              onPriceRangeChange={updatePriceRange}
            />
          </aside>

          {/* Main Content Area */}
          <main className="w-full flex-1 min-w-0">
            {isLoading && !vehicles.length ? (
              <div className="flex justify-center items-center py-24 w-full">
                <Spinner size="lg" />
              </div>
            ) : vehicles.length === 0 && !isLoading ? (
              <EmptyState
                title="Inventory Empty"
                description="We currently have no vehicles in stock. Please check back later."
              />
            ) : filteredVehicles.length === 0 ? (
              <EmptyState
                title="No matches found"
                description="Try adjusting your search or filters to find what you're looking for."
              />
            ) : (
              <VehicleGrid
                vehicles={filteredVehicles}
                onPurchaseClick={(vehicle) => setPurchasingVehicle(vehicle)}
              />
            )}
          </main>
        </div>
      </div>

      <PurchaseDialog
        isOpen={!!purchasingVehicle}
        onClose={() => !isPurchasing && setPurchasingVehicle(null)}
        onConfirm={handleVehiclePurchase}
        vehicle={purchasingVehicle}
        isLoading={isPurchasing}
        error={purchaseError}
      />
    </div>
  );
};

export default Inventory;
