import apiClient from './client';

export const certificateAPI = {
  getCertificateData: async (donorId) => {
    const response = await apiClient.get(`/certificate/${donorId}`);
    return response.data;
  }
};
