import api from './api';

const getAllTrips = async () => {
  const response = await api.get('/trips');
  return response.data.data;
};

const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data.data;
};

const createTrip = async (tripData) => {
  const response = await api.post('/trips', tripData);
  return response.data.data;
};

const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);
  return response.data.data;
};

const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};

const getDriverTrips = async (driverId) => {
  const response = await api.get(`/trips/driver/${driverId}`);
  return response.data.data;
};

const updateTripStatus = async (id, status) => {
  const response = await api.patch(`/trips/${id}/status`, { status });
  return response.data.data;
};

export default {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getDriverTrips,
  updateTripStatus,
};
