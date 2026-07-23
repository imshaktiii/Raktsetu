import apiClient from './client';

export const campsAPI = {
  getCamps: async () => {
    const response = await apiClient.get('/camps');
    return response.data;
  },

  createCamp: async (campData) => {
    const response = await apiClient.post('/camps', campData);
    return response.data;
  },

  registerForCamp: async (id) => {
    const response = await apiClient.put(`/camps/${id}/register`);
    return response.data;
  }
};
