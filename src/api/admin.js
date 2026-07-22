import apiClient from './client';

export const adminAPI = {
  getDonors: async () => {
    try {
      const response = await apiClient.get('/admin/donors');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock donors list...');
      return new Promise((resolve) => {
        resolve({
          success: true,
          donors: [
            { _id: 'D-MOCK-1', fullName: 'Rajesh Sharma', email: 'rajesh@gmail.com', phone: '9876543210', bloodGroup: 'O+', age: 29, gender: 'Male', city: 'Kolhapur', state: 'Maharashtra', available: true },
            { _id: 'D-MOCK-2', fullName: 'Amit Verma', email: 'amit@gmail.com', phone: '9988776655', bloodGroup: 'A+', age: 34, gender: 'Male', city: 'Kolhapur', state: 'Maharashtra', available: false }
          ]
        });
      });
    }
  },

  deleteDonor: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/donors/${id}`);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock donor deletion...');
      return new Promise((resolve) => {
        resolve({ success: true });
      });
    }
  },

  getRequests: async () => {
    try {
      const response = await apiClient.get('/admin/requests');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock requests list...');
      return new Promise((resolve) => {
        resolve({
          success: true,
          requests: [
            { _id: 'R-MOCK-1', patientName: 'Sanjay Dutt', bloodGroup: 'O+', units: 4, hospitalName: 'Apollo Hospital', city: 'Mumbai', contactNumber: '9988776655', urgency: 'High', requiredDate: '2026-07-25T00:00:00.000Z', status: 'Pending' }
          ]
        });
      });
    }
  },

  deleteRequest: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/requests/${id}`);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock request deletion...');
      return new Promise((resolve) => {
        resolve({ success: true });
      });
    }
  },

  getCamps: async () => {
    try {
      const response = await apiClient.get('/admin/camps');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock camps list...');
      return new Promise((resolve) => {
        resolve({
          success: true,
          camps: [
            { _id: 'C-MOCK-1', campName: 'Mega Civil Lines Donation Camp', organizerName: 'Red Cross', organizerEmail: 'camps@redcross.org', organizerPhone: '9876543210', venue: 'Civil Lines Hall', city: 'New Delhi', state: 'Delhi', date: '2026-07-24T00:00:00.000Z', startTime: '09:00 AM', endTime: '04:00 PM', totalSeats: 30, registeredDonors: 12, status: 'Upcoming' }
          ]
        });
      });
    }
  },

  deleteCamp: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/camps/${id}`);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock camp deletion...');
      return new Promise((resolve) => {
        resolve({ success: true });
      });
    }
  }
};
