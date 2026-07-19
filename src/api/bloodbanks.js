import apiClient from './client';

export const bloodbanksAPI = {
  getInventory: async () => {
    try {
      const response = await apiClient.get('/bloodbanks/inventory');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { id: 1, bloodGroup: 'O+', units: 45, reserved: 8, expiryDate: '2026-08-15', status: 'Optimal' },
          { id: 2, bloodGroup: 'A+', units: 32, reserved: 4, expiryDate: '2026-08-10', status: 'Optimal' },
          { id: 3, bloodGroup: 'B+', units: 28, reserved: 6, expiryDate: '2026-07-28', status: 'Low Stock' },
          { id: 4, bloodGroup: 'AB+', units: 18, reserved: 2, expiryDate: '2026-08-01', status: 'Optimal' },
          { id: 5, bloodGroup: 'O-', units: 4, reserved: 1, expiryDate: '2026-07-24', status: 'Critical' },
          { id: 6, bloodGroup: 'A-', units: 8, reserved: 2, expiryDate: '2026-07-22', status: 'Low Stock' },
          { id: 7, bloodGroup: 'B-', units: 5, reserved: 0, expiryDate: '2026-07-21', status: 'Critical' },
          { id: 8, bloodGroup: 'AB-', units: 2, reserved: 0, expiryDate: '2026-07-20', status: 'Expired' }
        ]);
      });
    }
  },

  addUnit: async (unitData) => {
    try {
      const response = await apiClient.post('/bloodbanks/inventory', unitData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, unit: { id: Date.now(), ...unitData } });
        }, 400);
      });
    }
  },

  updateUnit: async (id, unitData) => {
    try {
      const response = await apiClient.put(`/bloodbanks/inventory/${id}`, unitData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, id, unit: unitData });
        }, 400);
      });
    }
  },

  deleteUnit: async (id) => {
    try {
      const response = await apiClient.delete(`/bloodbanks/inventory/${id}`);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, id });
        }, 300);
      });
    }
  }
};
