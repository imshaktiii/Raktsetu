import apiClient from './client';

export const hospitalsAPI = {
  createRequest: async (requestData) => {
    const response = await apiClient.post('/hospitals/requests', requestData);
    return response.data;
  },

  getRequestsList: async () => {
    const response = await apiClient.get('/hospitals/requests');
    return response.data;
  },

  getCompatibleMatches: async (bloodGroup) => {
    const response = await apiClient.get(`/hospitals/matches/${bloodGroup}`);
    return response.data;
  }
};
