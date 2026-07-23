import React from "react";
import { Edit2, Trash2, PackagePlus } from "lucide-react";

const VehicleTable = ({ vehicles, onEdit, onDelete, onRestock }) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/50">
          <tr>
            <th className="px-8 py-5 text-[10px] font-mono uppercase tracking-widest text-muted font-semibold">Make & Model</th>
            <th className="px-8 py-5 text-[10px] font-mono uppercase tracking-widest text-muted font-semibold">Year</th>
            <th className="px-8 py-5 text-[10px] font-mono uppercase tracking-widest text-muted font-semibold">Price</th>
            <th className="px-8 py-5 text-[10px] font-mono uppercase tracking-widest text-muted font-semibold">Stock</th>
            <th className="px-8 py-5 text-[10px] font-mono uppercase tracking-widest text-muted font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle._id}
              className="group hover:bg-surface-hover transition-colors duration-300"
            >
              <td className="px-8 py-6">
                <div className="flex flex-col">
                  <span className="font-heading font-semibold text-foreground text-base tracking-tight">
                    {vehicle.make}
                  </span>
                  <span className="text-body-sm-size text-muted font-medium">
                    {vehicle.model}
                  </span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="font-mono text-muted text-sm">{vehicle.year}</span>
              </td>
              <td className="px-8 py-6">
                <span className="font-mono text-primary font-bold text-base">
                  {formatPrice(vehicle.price)}
                </span>
              </td>
              <td className="px-8 py-6">
                {vehicle.stock === 0 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold bg-error/10 text-error">
                    OUT OF STOCK
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold bg-primary/10 text-primary">
                    {vehicle.stock} UNITS
                  </span>
                )}
              </td>
              <td className="px-8 py-6 text-right">
                <div className="inline-flex justify-end gap-2 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 min-w-max">
                  <button
                    onClick={() => onRestock(vehicle)}
                    className="p-2.5 rounded-xl text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                    title="Restock"
                  >
                    <PackagePlus size={18} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => onEdit(vehicle)}
                    className="p-2.5 rounded-xl text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 size={18} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => onDelete(vehicle)}
                    className="p-2.5 rounded-xl text-error hover:bg-error/10 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
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
