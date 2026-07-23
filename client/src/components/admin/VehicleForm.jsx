import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Button, Select } from "../ui";

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
  category: z.string().min(1, "Category is required"),
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
      category: "",
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
        <Select
          label="Fuel Type"
          error={!!errors.fuelType}
          helperText={errors.fuelType?.message}
          options={[
            { value: "", label: "Select fuel type" },
            { value: "Gasoline", label: "Gasoline" },
            { value: "Diesel", label: "Diesel" },
            { value: "Electric", label: "Electric" },
            { value: "Hybrid", label: "Hybrid" },
            { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
          ]}
          {...register("fuelType")}
        />
        <Select
          label="Transmission"
          error={!!errors.transmission}
          helperText={errors.transmission?.message}
          options={[
            { value: "", label: "Select transmission" },
            { value: "Automatic", label: "Automatic" },
            { value: "Manual", label: "Manual" },
            { value: "CVT", label: "CVT" },
            { value: "Dual-Clutch", label: "Dual-Clutch" },
          ]}
          {...register("transmission")}
        />
        <Input
          label="Color"
          placeholder="e.g. Black, White"
          error={!!errors.color}
          helperText={errors.color?.message}
          {...register("color")}
        />
        <Select
          label="Category"
          error={!!errors.category}
          helperText={errors.category?.message}
          options={[
            { value: "", label: "Select a category" },
            { value: "Sedan", label: "Sedan" },
            { value: "SUV", label: "SUV" },
            { value: "Hatchback", label: "Hatchback" },
            { value: "Coupe", label: "Coupe" },
            { value: "Convertible", label: "Convertible" },
            { value: "Wagon", label: "Wagon" },
            { value: "Pickup Truck", label: "Pickup Truck" },
            { value: "Van", label: "Van" },
            { value: "Minivan", label: "Minivan" },
          ]}
          {...register("category")}
        />
        <Input
          label="Stock"
          type="number"
          error={!!errors.stock}
          helperText={errors.stock?.message}
          {...register("stock")}
        />
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-xl px-8 py-5 font-mono uppercase tracking-widest text-[10px]"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          loading={isLoading}
          className="rounded-xl px-8 py-5 font-mono uppercase tracking-widest text-[10px]"
        >
          Save Vehicle
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;
