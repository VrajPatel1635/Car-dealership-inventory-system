import React, { useEffect, useState, useMemo } from "react";
import { Plus, CarFront, AlertCircle, DollarSign, Package } from "lucide-react";
import { useAdminVehicles } from "../hooks/useAdminVehicles";
import {
  VehicleTable,
  VehicleForm,
  VehicleModal,
  DeleteVehicleDialog,
  RestockDialog,
} from "../components/admin";
import { Button, Spinner, Alert, EmptyState } from "../components/ui";

const MetricCard = ({ title, value, icon: Icon, description, trend, colorClass }) => (
  <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm flex flex-col justify-between h-[160px]">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className="bg-surface-hover px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted font-semibold">
          {trend}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-h4-size font-mono font-bold text-foreground tracking-tight mb-1">{value}</h3>
      <p className="text-body-sm-size font-medium text-muted">{title}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const {
    vehicles,
    isLoading,
    error,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    restockVehicle,
    isSubmitting,
    submitError,
  } = useAdminVehicles();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deletingVehicle, setDeletingVehicle] = useState(null);
  const [restockingVehicle, setRestockingVehicle] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await createVehicle(data);
      setIsCreateModalOpen(false);
      showSuccess("Vehicle created successfully");
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateVehicle(editingVehicle._id, data);
      setEditingVehicle(null);
      showSuccess("Vehicle updated successfully");
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVehicle(deletingVehicle._id);
      setDeletingVehicle(null);
      showSuccess("Vehicle deleted successfully");
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleRestockSubmit = async (data) => {
    try {
      await restockVehicle(restockingVehicle._id, data.quantity);
      setRestockingVehicle(null);
      showSuccess("Vehicle restocked successfully");
    } catch (err) {
      // Error handled by hook
    }
  };

  // Metrics Calculations
  const formatValue = (val) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);
  const totalVehicles = vehicles.length;
  const outOfStock = useMemo(() => vehicles.filter(v => v.stock === 0).length, [vehicles]);
  const totalValue = useMemo(() => vehicles.reduce((sum, v) => sum + (v.price * v.stock), 0), [vehicles]);
  const totalStock = useMemo(() => vehicles.reduce((sum, v) => sum + v.stock, 0), [vehicles]);

  return (
    <div className="container py-8 md:py-10 max-w-7xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-h3-size font-heading font-bold text-foreground mb-2 tracking-tight">
            Inventory Management
          </h1>
          <p className="text-body-size text-muted">
            Manage your fleet, pricing, and stock levels in real-time.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="group relative flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-mono uppercase tracking-widest text-[10px] font-bold rounded-full px-8 h-14 transition-all duration-300 shadow-lg shadow-primary/25 overflow-hidden cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus size={16} strokeWidth={2.5} />
            Add Vehicle
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard 
          title="Unique Models" 
          value={totalVehicles} 
          icon={CarFront} 
          colorClass="bg-primary/10 text-primary" 
        />
        <MetricCard 
          title="Total Units in Stock" 
          value={totalStock} 
          icon={Package} 
          colorClass="bg-blue-500/10 text-blue-500" 
        />
        <MetricCard 
          title="Total Inventory Value" 
          value={formatValue(totalValue)} 
          icon={DollarSign} 
          colorClass="bg-green-500/10 text-green-500" 
        />
        <MetricCard 
          title="Out of Stock Models" 
          value={outOfStock} 
          icon={AlertCircle} 
          colorClass={outOfStock > 0 ? "bg-error/10 text-error" : "bg-surface-hover text-muted"} 
          trend={outOfStock > 0 ? "ACTION NEEDED" : "HEALTHY"}
        />
      </div>

      {successMessage && (
        <Alert variant="success" className="mb-6 rounded-2xl border border-success/30 shadow-sm">
          {successMessage}
        </Alert>
      )}

      {error && !isSubmitting && (
        <Alert variant="error" className="mb-6 rounded-2xl border border-error/30 shadow-sm">
          {error}
        </Alert>
      )}

      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden mb-12">
        {isLoading && !vehicles.length ? (
          <div className="flex justify-center items-center py-32">
            <Spinner size="lg" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-24">
            <EmptyState
              title="No vehicles found"
              description="Your inventory is empty. Click 'Add Vehicle' to get started."
            />
          </div>
        ) : (
          <VehicleTable
            vehicles={vehicles}
            onEdit={(vehicle) => setEditingVehicle(vehicle)}
            onDelete={(vehicle) => setDeletingVehicle(vehicle)}
            onRestock={(vehicle) => setRestockingVehicle(vehicle)}
          />
        )}
      </div>

      {/* Create Modal */}
      <VehicleModal
        isOpen={isCreateModalOpen}
        onClose={() => !isSubmitting && setIsCreateModalOpen(false)}
        title="Add New Vehicle"
      >
        {submitError && (
          <Alert variant="error" className="mb-6">
            {submitError}
          </Alert>
        )}
        <VehicleForm
          onSubmit={handleCreateSubmit}
          isLoading={isSubmitting}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </VehicleModal>

      {/* Edit Modal */}
      <VehicleModal
        isOpen={!!editingVehicle}
        onClose={() => !isSubmitting && setEditingVehicle(null)}
        title="Edit Vehicle"
      >
        {submitError && (
          <Alert variant="error" className="mb-6">
            {submitError}
          </Alert>
        )}
        {editingVehicle && (
          <VehicleForm
            defaultValues={editingVehicle}
            onSubmit={handleEditSubmit}
            isLoading={isSubmitting}
            onCancel={() => setEditingVehicle(null)}
          />
        )}
      </VehicleModal>

      {/* Delete Dialog */}
      <DeleteVehicleDialog
        isOpen={!!deletingVehicle}
        onClose={() => !isSubmitting && setDeletingVehicle(null)}
        onConfirm={handleDeleteConfirm}
        vehicle={deletingVehicle}
        isLoading={isSubmitting}
      />

      {/* Restock Dialog */}
      <RestockDialog
        isOpen={!!restockingVehicle}
        onClose={() => !isSubmitting && setRestockingVehicle(null)}
        onConfirm={handleRestockSubmit}
        vehicle={restockingVehicle}
        isLoading={isSubmitting}
        error={submitError}
      />
    </div>
  );
};

export default AdminDashboard;

