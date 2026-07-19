import apiClient from './client';

export const donorsAPI = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/donors/profile');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: 'Shakti Prasad',
            email: 'shakti.prasad@raktsetu.in',
            phone: '98765 43210',
            dob: '1995-08-12',
            gender: 'Male',
            bloodGroup: 'O+',
            weight: 72,
            lastDonation: '2026-04-15',
            conditions: 'None',
            address: 'Flat 402, Block C, Pragati Vihar, New Delhi - 110003'
          });
        }, 300);
      });
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/donors/profile', profileData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, updatedProfile: profileData });
        }, 400);
      });
    }
  },

  getDonationHistory: async () => {
    try {
      const response = await apiClient.get('/donors/history');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { id: 'DN-201', date: '2026-04-15', venue: 'Mega Civil Lines Drive', units: 1, type: 'Whole Blood' },
          { id: 'DN-185', date: '2026-01-10', venue: 'DLF Cybercity Phase 3', units: 1, type: 'Whole Blood' },
          { id: 'DN-142', date: '2025-10-05', venue: 'In-house Central Delhi Bank', units: 1, type: 'Whole Blood' }
        ]);
      });
    }
  },

  getAchievements: async () => {
    try {
      const response = await apiClient.get('/donors/achievements');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          { title: 'Bronze Donor Badge', desc: 'Authorized first voluntary blood donation', level: 'Completed' },
          { title: 'Silver Savior Badge', desc: 'Contributed 3+ whole blood donation packs', level: 'Completed' },
          { title: 'Centurion Life Badge', desc: 'Registered active card inside national donor grid', level: 'Completed' }
        ]);
      });
    }
  }
};
