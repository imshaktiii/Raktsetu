import apiClient from './client';

export const bloodStockAPI = {
  getStock: async () => {
    const response = await apiClient.get('/blood-stock');
    return response.data;
  }
};
