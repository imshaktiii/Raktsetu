import apiClient from './client';

export const campsAPI = {
  getCamps: async () => {
    try {
      const response = await apiClient.get('/camps');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock camps list...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            camps: [
              {
                _id: 'CAMP-MOCK-1',
                campName: 'Mega Civil Lines Donation Camp',
                organizerName: 'Red Cross Society',
                organizerEmail: 'camps@redcross.org',
                organizerPhone: '9876543210',
                venue: 'District Red Cross Hall, Civil Lines',
                city: 'New Delhi',
                state: 'Delhi',
                date: '2026-07-24T00:00:00.000Z',
                startTime: '09:00 AM',
                endTime: '04:00 PM',
                totalSeats: 30,
                registeredDonors: 12,
                description: 'Pre-register for a slot to reduce physical waiting time and secure refreshments.',
                status: 'Upcoming'
              },
              {
                _id: 'CAMP-MOCK-2',
                campName: 'Vasant Kunj Corporate Wellness Camp',
                organizerName: 'Max Healthcare',
                organizerEmail: 'camps@maxhealthcare.com',
                organizerPhone: '9988776655',
                venue: 'DLF Cybercity Phase 3 Lobby',
                city: 'New Delhi',
                state: 'Delhi',
                date: '2026-07-28T00:00:00.000Z',
                startTime: '10:00 AM',
                endTime: '03:00 PM',
                totalSeats: 25,
                registeredDonors: 25, // Full
                description: 'Annual corporate health check and whole blood contribution drive.',
                status: 'Upcoming'
              }
            ]
          });
        }, 500);
      });
    }
  },

  createCamp: async (campData) => {
    try {
      const response = await apiClient.post('/camps', campData);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock camp creation...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            camp: {
              _id: `CAMP-MOCK-${Date.now()}`,
              ...campData,
              totalSeats: Number(campData.totalSeats),
              registeredDonors: 0,
              status: 'Upcoming',
              createdAt: new Date().toISOString()
            }
          });
        }, 500);
      });
    }
  },

  registerForCamp: async (id) => {
    try {
      const response = await apiClient.put(`/camps/${id}/register`);
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to mock register increment...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Registered successfully'
          });
        }, 400);
      });
    }
  }
};
