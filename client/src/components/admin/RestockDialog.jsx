import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PackagePlus } from "lucide-react";
import { Button, Input, Alert } from "../ui";

const restockSchema = z.object({
    quantity: z.coerce.number().int().positive("Quantity must be a positive integer"),
});

const RestockDialog = ({
    isOpen,
    onClose,
    onConfirm,
    vehicle,
    isLoading,
    error,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(restockSchema),
        defaultValues: { quantity: 1 },
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            reset({ quantity: 1 });
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, reset]);

    if (!isOpen || !vehicle) return null;

    return (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={!isLoading ? onClose : undefined}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <PackagePlus size={20} />
                        </div>
                        <div>
                            <h3 className="text-h6-size font-heading font-semibold mb-1">
                                Restock Vehicle
                            </h3>
                            <p className="text-body-sm-size text-muted">
                                {vehicle.make} {vehicle.model} (Current Stock: {vehicle.stock})
                            </p>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="error" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <form id="restock-form" onSubmit={handleSubmit(onConfirm)}>
                        <Input
                            label="Quantity to Add"
                            type="number"
                            min="1"
                            error={!!errors.quantity}
                            helperText={errors.quantity?.message}
                            {...register("quantity")}
                        />
                    </form>
                </div>
                <div className="bg-background px-6 py-4 flex justify-end gap-3 border-t border-border">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="restock-form"
                        variant="primary"
                        loading={isLoading}
                    >
                        Restock
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RestockDialog;
