import api from './api';

const getAllVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data.data;
};

const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data.data;
};

const createVehicle = async (vehicleData) => {
  const response = await api.post('/vehicles', vehicleData);
  return response.data.data;
};

const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data.data;
};

const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export default {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
