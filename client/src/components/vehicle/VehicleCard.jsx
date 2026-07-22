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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const isOutOfStock = stock === 0;
  const stockText = isOutOfStock ? "Out of Stock" : `In Stock (${stock})`;
  const stockVariant = isOutOfStock ? "error" : "success";

  return (
    <div className="card flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-surface border border-border">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-h5-size font-heading font-semibold text-foreground leading-tight">
              {make} {model}
            </h2>
            <p className="text-body-sm-size text-muted mt-1">{year}</p>
          </div>
          <Badge variant={stockVariant} className="shrink-0 ml-2">
            {stockText}
          </Badge>
        </div>

        <div className="mb-6">
          <span className="text-h4-size font-heading font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>

        <div className="mt-auto">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-body-sm-size mb-6">
            <div>
              <dt className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">
                Mileage
              </dt>
              <dd className="font-medium text-foreground">
                {formatNumber(mileage)} mi
              </dd>
            </div>
            <div>
              <dt className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">
                Fuel Type
              </dt>
              <dd className="font-medium text-foreground">{fuelType}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">
                Transmission
              </dt>
              <dd className="font-medium text-foreground">{transmission}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">
                Color
              </dt>
              <dd className="font-medium text-foreground">{color}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">
                Category
              </dt>
              <dd className="font-medium text-foreground">{category}</dd>
            </div>
          </dl>
          <Button
            variant="primary"
            className="w-full"
            disabled={isOutOfStock}
            onClick={() => onPurchaseClick && onPurchaseClick(vehicle)}
          >
            {isOutOfStock ? "Out of Stock" : "Purchase"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
