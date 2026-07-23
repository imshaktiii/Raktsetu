import apiClient from './client';

export const adminAPI = {
  getDonors: async () => {
    const response = await apiClient.get('/admin/donors');
    return response.data;
  },

  deleteDonor: async (id) => {
    const response = await apiClient.delete(`/admin/donors/${id}`);
    return response.data;
  },

  getRequests: async () => {
    const response = await apiClient.get('/admin/requests');
    return response.data;
  },

  deleteRequest: async (id) => {
    const response = await apiClient.delete(`/admin/requests/${id}`);
    return response.data;
  },

  getCamps: async () => {
    const response = await apiClient.get('/admin/camps');
    return response.data;
  },

  deleteCamp: async (id) => {
    const response = await apiClient.delete(`/admin/camps/${id}`);
    return response.data;
  }
};
