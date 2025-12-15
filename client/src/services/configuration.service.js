import api from './api';

const getConfiguration = async () => {
  const response = await api.get('/config');
  return response.data.data;
};

const updateConfiguration = async (configData) => {
  const response = await api.patch('/config', configData);
  return response.data.data;
};

export default {
  getConfiguration,
  updateConfiguration,
};
