import apiClient from './client';

export const hospitalsAPI = {
  createRequest: async (requestData) => {
    try {
      const response = await apiClient.post('/hospitals/requests', requestData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
            ...requestData,
            status: 'Pending Approval',
            date: new Date().toISOString().split('T')[0]
          });
        }, 500);
      });
    }
  },

  getRequestsList: async () => {
    try {
      const response = await apiClient.get('/hospitals/requests');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { id: 'REQ-101', bloodGroup: 'O+', units: 4, priority: 'Urgent', patientName: 'Sanjay Dutt', status: 'Dispatched', date: '2026-07-19' },
          { id: 'REQ-102', bloodGroup: 'AB-', units: 2, priority: 'Critical', patientName: 'Rohit Sharma', status: 'Pending Approval', date: '2026-07-19' },
          { id: 'REQ-103', bloodGroup: 'A+', units: 5, priority: 'Normal', patientName: 'Aditi Rao', status: 'Completed', date: '2026-07-18' }
        ]);
      });
    }
  },

  getCompatibleMatches: async (bloodGroup) => {
    try {
      const response = await apiClient.get(`/hospitals/matches/${bloodGroup}`);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { name: 'Amit Verma', group: bloodGroup, phone: '99887 76655', distance: 1.8, status: 'Available' },
          { name: 'Rajesh Sharma', group: bloodGroup, phone: '98765 11223', distance: 3.4, status: 'Available' },
          { name: 'Neha Sen', group: bloodGroup, phone: '98765 00112', distance: 5.2, status: 'Available' }
        ]);
      });
    }
  }
};
