import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAdminVehicles } from "../hooks/useAdminVehicles";
import {
  VehicleTable,
  VehicleForm,
  VehicleModal,
  DeleteVehicleDialog,
} from "../components/admin";
import { Button, Spinner, Alert, EmptyState } from "../components/ui";

const AdminDashboard = () => {
  const {
    vehicles,
    isLoading,
    error,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    isSubmitting,
    submitError,
  } = useAdminVehicles();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deletingVehicle, setDeletingVehicle] = useState(null);
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
      // Error is handled by hook and displayed in modal
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateVehicle(editingVehicle._id, data);
      setEditingVehicle(null);
      showSuccess("Vehicle updated successfully");
    } catch (err) {
      // Error is handled by hook and displayed in modal
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVehicle(deletingVehicle._id);
      setDeletingVehicle(null);
      showSuccess("Vehicle deleted successfully");
    } catch (err) {
      // Error is handled by hook and displayed in modal
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-h3-size font-heading font-bold text-foreground mb-2">
            Inventory Management
          </h1>
          <p className="text-body-size text-muted">
            Manage your vehicle inventory, pricing, and stock levels.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Add Vehicle
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" className="mb-6">
          {successMessage}
        </Alert>
      )}

      {error && !isSubmitting && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      {isLoading && !vehicles.length ? (
        <div className="flex justify-center items-center py-24">
          <Spinner size="lg" />
        </div>
      ) : vehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          description="Your inventory is empty. Click 'Add Vehicle' to get started."
        />
      ) : (
        <VehicleTable
          vehicles={vehicles}
          onEdit={(vehicle) => setEditingVehicle(vehicle)}
          onDelete={(vehicle) => setDeletingVehicle(vehicle)}
        />
      )}

      {/* Create Modal */}
      <VehicleModal
        isOpen={isCreateModalOpen}
        onClose={() => !isSubmitting && setIsCreateModalOpen(false)}
        title="Add New Vehicle"
      >
        {submitError && (
          <Alert variant="error" className="mb-4">
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
          <Alert variant="error" className="mb-4">
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
    </div>
  );
};

export default AdminDashboard;
