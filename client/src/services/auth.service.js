import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data.data;
};

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const getDrivers = async () => {
  const response = await api.get('/drivers/');
  return response.data.data;
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  getDrivers,
};
