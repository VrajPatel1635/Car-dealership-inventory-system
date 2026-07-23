import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PackagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
            if (window.lenis) window.lenis.stop();
            reset({ quantity: 1 });
        } else {
            document.body.style.overflow = "unset";
            if (window.lenis) window.lenis.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            if (window.lenis) window.lenis.start();
        };
    }, [isOpen, reset]);

    return (
        <AnimatePresence>
            {isOpen && vehicle && (
                <div 
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overscroll-none" 
                  data-lenis-prevent="true"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        onClick={!isLoading ? onClose : undefined}
                        aria-hidden="true"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        className="relative w-full max-w-md bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden"
                    >
                        <div className="p-8 pb-6">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                                    <PackagePlus size={28} strokeWidth={2} />
                                </div>
                                
                                <div>
                                    <h3 className="text-h4-size font-heading font-semibold mb-2 text-foreground tracking-tight">
                                        Restock Vehicle
                                    </h3>
                                    <p className="text-body-sm-size text-muted leading-relaxed px-4">
                                        Add new stock for the <span className="font-semibold text-foreground">{vehicle.year} {vehicle.make} {vehicle.model}</span>. Current stock is <span className="font-semibold text-foreground font-mono">{vehicle.stock}</span>.
                                    </p>
                                </div>
                            </div>
                            
                            {error && (
                                <Alert variant="error" className="mt-4 w-full text-left">
                                    {error}
                                </Alert>
                            )}
                            
                            <form id="restock-form" onSubmit={handleSubmit(onConfirm)} className="mt-6">
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
                        
                        <div className="px-8 pb-8 pt-2 flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 rounded-xl py-6 font-mono uppercase tracking-widest text-[10px]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="restock-form"
                                variant="primary"
                                loading={isLoading}
                                className="flex-1 rounded-xl py-6 font-mono uppercase tracking-widest text-[10px]"
                            >
                                Restock
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RestockDialog;
