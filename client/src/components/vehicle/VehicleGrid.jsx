import React from "react";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
  }
};

const VehicleGrid = ({ vehicles, onPurchaseClick }) => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[auto]"
    >
      {vehicles.map((vehicle) => (
        <motion.div 
          key={vehicle._id} 
          variants={item}
          className="flex flex-col h-full"
        >
          <VehicleCard
            vehicle={vehicle}
            onPurchaseClick={onPurchaseClick}
            isFeatured={false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VehicleGrid;
