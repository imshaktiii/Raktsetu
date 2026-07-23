import apiClient from './client';

export const donorsAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },

  getDonationHistory: async () => {
    const response = await apiClient.get('/donors/history');
    return response.data;
  },

  getAchievements: async () => {
    const response = await apiClient.get('/donors/achievements');
    return response.data;
  },

  searchDonors: async (bloodGroup, city) => {
    const response = await apiClient.get("/donors/search", {
      params: {
        bloodGroup,
        city,
      },
    });
    return response.data;
  }
};
