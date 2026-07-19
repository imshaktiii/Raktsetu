import apiClient from './client';

export const adminAPI = {
  getUsers: async () => {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { id: 'USR-892', name: 'Rajesh Sharma', role: 'Donor', email: 'rajesh@gmail.com', phone: '98765 11223', status: 'Active' },
          { id: 'USR-893', name: 'Metro Health Center', role: 'Hospital', email: 'contact@metrohealth.com', phone: '011-2550100', status: 'Pending Approval' },
          { id: 'USR-894', name: 'Red Cross East Delhi', role: 'Blood Bank', email: 'eastdelhi@redcross.org', phone: '98765 44332', status: 'Active' },
          { id: 'USR-895', name: 'Amit Verma', role: 'Donor', email: 'amit.verma@yahoo.com', phone: '99887 76655', status: 'Suspended' }
        ]);
      });
    }
  },

  approveHospitalLicense: async (id) => {
    try {
      const response = await apiClient.post(`/admin/hospitals/${id}/approve`);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, hospitalId: id });
        }, 300);
      });
    }
  },

  approveBloodBankLicense: async (id) => {
    try {
      const response = await apiClient.post(`/admin/bloodbanks/${id}/approve`);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, bankId: id });
        }, 300);
      });
    }
  },

  authorizeBloodCamp: async (id) => {
    try {
      const response = await apiClient.post(`/admin/camps/${id}/approve`);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, campId: id });
        }, 300);
      });
    }
  }
};
