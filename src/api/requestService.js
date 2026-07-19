import apiClient from './client';

export const requestService = {
  getRequests: async (filters = {}) => {
    // API Placeholder: GET /requests
    const response = await apiClient.get('/requests', { params: filters });
    return response.data;
  },

  createRequest: async (requestData) => {
    // API Placeholder: POST /requests
    const response = await apiClient.post('/requests', requestData);
    return response.data;
  },

  approveRequest: async (id) => {
    // API Placeholder: POST /requests/:id/approve
    const response = await apiClient.post(`/requests/${id}/approve`);
    return response.data;
  },

  getCompatibleDonors: async (bloodGroup, maxDistanceKm = 10) => {
    // API Placeholder: GET /donors/matches?bloodGroup=O+&distance=10
    const response = await apiClient.get('/donors/matches', { params: { bloodGroup, maxDistanceKm } });
    return response.data;
  },

  getNotifications: async () => {
    // API Placeholder: GET /notifications
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  markNotificationsRead: async () => {
    // API Placeholder: POST /notifications/read-all
    const response = await apiClient.post('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (id) => {
    // API Placeholder: DELETE /notifications/:id
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  }
};
