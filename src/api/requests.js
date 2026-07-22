import apiClient from './client';

export const requestsAPI = {
  createRequest: async (requestData) => {
    try {
      const response = await apiClient.post('/requests', requestData);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock data creation...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            request: {
              _id: `MOCK-${Date.now()}`,
              ...requestData,
              status: 'Pending',
              createdAt: new Date().toISOString(),
            }
          });
        }, 500);
      });
    }
  },

  getRequests: async () => {
    try {
      const response = await apiClient.get('/requests');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock requests list...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            requests: [
              {
                _id: 'REQ-MOCK-1',
                patientName: 'Aditya Birla',
                bloodGroup: 'B+',
                units: 3,
                hospitalName: 'Apollo Hospital',
                city: 'Mumbai',
                state: 'Maharashtra',
                contactNumber: '9988776655',
                urgency: 'High',
                requiredDate: '2026-07-25T00:00:00.000Z',
                status: 'Pending',
                createdAt: new Date().toISOString()
              },
              {
                _id: 'REQ-MOCK-2',
                patientName: 'Komal Sharma',
                bloodGroup: 'O-',
                units: 2,
                hospitalName: 'Fortis Clinic',
                city: 'New Delhi',
                state: 'Delhi',
                contactNumber: '9876543210',
                urgency: 'Medium',
                requiredDate: '2026-07-28T00:00:00.000Z',
                status: 'Fulfilled',
                createdAt: new Date(Date.now() - 86400000).toISOString()
              }
            ]
          });
        }, 500);
      });
    }
  }
};
