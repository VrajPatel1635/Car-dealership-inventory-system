import api from "./api";

export const vehicleService = {
  getAllVehicles: async () => {
    const response = await api.get("/vehicles");
    return response.data;
  },
  createVehicle: async (vehicleData) => {
    const response = await api.post("/vehicles", vehicleData);
    return response.data;
  },
  updateVehicle: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },
  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },
  purchaseVehicle: async (id) => {
    const response = await api.post(`/vehicles/${id}/purchase`);
    return response.data;
  },
  restockVehicle: async (id, quantity) => {
    const response = await api.post(`/vehicles/${id}/restock`, { quantity });
    return response.data;
  },
};
