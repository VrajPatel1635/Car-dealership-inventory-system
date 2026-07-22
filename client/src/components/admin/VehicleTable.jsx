import React from "react";
import { Edit, Trash2, PackagePlus } from "lucide-react";
import { Button } from "../ui";

const VehicleTable = ({ vehicles, onEdit, onDelete, onRestock }) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-left text-body-sm-size">
        <thead className="bg-background border-b border-border text-muted uppercase tracking-wider text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">Make & Model</th>
            <th className="px-6 py-4">Year</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle._id}
              className="hover:bg-background/50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-foreground">
                {vehicle.make} {vehicle.model}
              </td>
              <td className="px-6 py-4 text-muted">{vehicle.year}</td>
              <td className="px-6 py-4 text-foreground font-medium">
                {formatPrice(vehicle.price)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={
                    vehicle.stock === 0
                      ? "text-error font-medium"
                      : "text-foreground"
                  }
                >
                  {vehicle.stock}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted hover:text-primary"
                    onClick={() => onRestock(vehicle)}
                    aria-label="Restock vehicle"
                  >
                    <PackagePlus size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted hover:text-primary"
                    onClick={() => onEdit(vehicle)}
                    aria-label="Edit vehicle"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted hover:text-error"
                    onClick={() => onDelete(vehicle)}
                    aria-label="Delete vehicle"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
