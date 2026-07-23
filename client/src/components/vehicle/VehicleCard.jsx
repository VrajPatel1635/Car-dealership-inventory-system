import React from "react";
import { Badge, Button } from "../ui";

const VehicleCard = ({ vehicle, onPurchaseClick }) => {
  const {
    make,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    color,
    category,
    stock,
  } = vehicle;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const isOutOfStock = stock === 0;
  const stockText = isOutOfStock ? "Sold Out" : `${stock} Available`;
  const opacityClass = isOutOfStock ? "opacity-60 grayscale" : "opacity-100";

  return (
    <div className={`card group flex flex-col h-full bg-surface border border-border p-5 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-sm relative overflow-hidden ${opacityClass}`}>
      {/* Decorative hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className="font-mono text-[11px] text-muted bg-background px-2.5 py-1 rounded-full border border-border tracking-wider font-medium">
            {year}
          </div>
          <Badge variant={isOutOfStock ? "error" : "success"} className="shrink-0 font-mono tracking-wider uppercase text-[9px]">
            {stockText}
          </Badge>
        </div>

        <div className="mb-6">
          <h2 className="text-h5-size font-heading text-foreground leading-tight tracking-tight mb-1 transition-colors group-hover:text-primary">
            <span className="font-bold">{make}</span>{" "}
            <span className="font-medium text-foreground-secondary">{model}</span>
          </h2>
          <p className="font-mono text-muted text-[10px] mt-2 uppercase tracking-widest">{category} • {color}</p>
        </div>

        <div className="mb-5 mt-auto">
          <div className="text-h4-size font-mono font-semibold text-primary tracking-tight">
            {formatPrice(price)}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-border pt-4 mb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-mono tracking-widest text-muted">Mileage</span>
            <span className="font-medium text-xs text-foreground-secondary">{formatNumber(mileage)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-mono tracking-widest text-muted">Fuel</span>
            <span className="font-medium text-xs text-foreground-secondary">{fuelType}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-mono tracking-widest text-muted">Trans</span>
            <span className="font-medium text-xs text-foreground-secondary">{transmission}</span>
          </div>
        </div>

        <Button
          variant={isOutOfStock ? "outline" : "primary"}
          className={`w-full py-3 text-xs uppercase tracking-widest font-mono transition-transform duration-300 ${!isOutOfStock && 'group-hover:translate-y-0 translate-y-1 opacity-90 group-hover:opacity-100'}`}
          disabled={isOutOfStock}
          onClick={() => onPurchaseClick && onPurchaseClick(vehicle)}
        >
          {isOutOfStock ? "Unavailable" : "Acquire"}
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
