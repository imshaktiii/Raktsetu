import apiClient from './client';

export const bloodbanksAPI = {
  getInventory: async () => {
    const response = await apiClient.get('/bloodbanks/inventory');
    return response.data;
  },

  addUnit: async (unitData) => {
    const response = await apiClient.post('/bloodbanks/inventory', unitData);
    return response.data;
  },

  updateUnit: async (id, unitData) => {
    const response = await apiClient.put(`/bloodbanks/inventory/${id}`, unitData);
    return response.data;
  },

  deleteUnit: async (id) => {
    const response = await apiClient.delete(`/bloodbanks/inventory/${id}`);
    return response.data;
  }
};
