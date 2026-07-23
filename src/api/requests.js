import apiClient from './client';

export const requestsAPI = {
  createRequest: async (requestData) => {
    const response = await apiClient.post('/requests', requestData);
    return response.data;
  },

  getRequests: async () => {
    const response = await apiClient.get('/requests');
    return response.data;
  }
};
