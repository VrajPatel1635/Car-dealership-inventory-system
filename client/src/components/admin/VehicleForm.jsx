import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Button } from "../ui";

const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .min(1886, "Invalid year")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  price: z.coerce.number().min(0, "Price must be positive"),
  mileage: z.coerce.number().min(0, "Mileage must be positive"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  color: z.string().min(1, "Color is required"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
});

const VehicleForm = ({ defaultValues, onSubmit, isLoading, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: defaultValues || {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: "",
      transmission: "",
      color: "",
      stock: 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Make"
          placeholder="e.g. Toyota"
          error={!!errors.make}
          helperText={errors.make?.message}
          {...register("make")}
        />
        <Input
          label="Model"
          placeholder="e.g. Camry"
          error={!!errors.model}
          helperText={errors.model?.message}
          {...register("model")}
        />
        <Input
          label="Year"
          type="number"
          error={!!errors.year}
          helperText={errors.year?.message}
          {...register("year")}
        />
        <Input
          label="Price ($)"
          type="number"
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register("price")}
        />
        <Input
          label="Mileage"
          type="number"
          error={!!errors.mileage}
          helperText={errors.mileage?.message}
          {...register("mileage")}
        />
        <Input
          label="Fuel Type"
          placeholder="e.g. Gasoline, Electric"
          error={!!errors.fuelType}
          helperText={errors.fuelType?.message}
          {...register("fuelType")}
        />
        <Input
          label="Transmission"
          placeholder="e.g. Automatic, Manual"
          error={!!errors.transmission}
          helperText={errors.transmission?.message}
          {...register("transmission")}
        />
        <Input
          label="Color"
          placeholder="e.g. Black, White"
          error={!!errors.color}
          helperText={errors.color?.message}
          {...register("color")}
        />
        <Input
          label="Stock"
          type="number"
          error={!!errors.stock}
          helperText={errors.stock?.message}
          {...register("stock")}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          Save Vehicle
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;
