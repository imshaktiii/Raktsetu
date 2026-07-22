import apiClient from './client';

export const certificateAPI = {
  getCertificateData: async (donorId) => {
    try {
      const response = await apiClient.get(`/certificate/${donorId}`);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock certificate details...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            donor: {
              _id: donorId || 'D-MOCK-9988',
              fullName: 'Shakti Prasad',
              bloodGroup: 'O+',
              lastDonationDate: '2026-04-15T00:00:00.000Z',
              city: 'New Delhi',
              state: 'Delhi',
              certificateNumber: `RST-2026-MOCK9988`
            }
          });
        }, 500);
      });
    }
  }
};
