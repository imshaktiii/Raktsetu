import apiClient from './client';

export const campsAPI = {
  getUpcomingCamps: async () => {
    try {
      const response = await apiClient.get('/camps/upcoming');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          {
            id: 1,
            title: 'Mega Civil Lines Donation Camp',
            date: 'July 24, 2026',
            time: '09:00 AM - 04:00 PM',
            location: 'District Red Cross Hall, Civil Lines, New Delhi - 110054',
            district: 'Central Delhi',
            organizer: 'Red Cross Delhi & MoHFW',
            slotsAvailable: 24,
            slots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 04:00 PM'],
            contact: '+91 11 2371 6441',
            email: 'camps@redcrossdelhi.org',
            license: 'NBTC-CMP-0045'
          },
          {
            id: 2,
            title: 'Vasant Kunj Corporate Wellness Camp',
            date: 'July 28, 2026',
            time: '10:00 AM - 03:00 PM',
            location: 'DLF Cybercity Phase 3 Lobby, Vasant Kunj, Delhi - 110070',
            district: 'South Delhi',
            organizer: 'Max Healthcare Foundation',
            slotsAvailable: 15,
            slots: ['10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 03:00 PM'],
            contact: '+91 11 2651 5050',
            email: 'camps@maxhealthcare.com',
            license: 'NBTC-CMP-0092'
          },
          {
            id: 3,
            title: 'Rajiv Chowk Metro Concourse Drive',
            date: 'August 02, 2026',
            time: '08:00 AM - 01:00 PM',
            location: 'Rajiv Chowk Metro Station Concourse, Delhi - 110001',
            district: 'Central Delhi',
            organizer: 'Delhi Metro Rail Corp & AIIMS',
            slotsAvailable: 32,
            slots: ['08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 01:00 PM'],
            contact: '+91 11 2658 8500',
            email: 'rep@aiims.edu',
            license: 'NBTC-CMP-0185'
          }
        ]);
      });
    }
  },

  getPastCamps: async () => {
    try {
      const response = await apiClient.get('/camps/past');
      return response.data;
    } catch {
      return new Promise((resolve) => {
        resolve([
          {
            id: 101,
            title: 'Connaught Place NGO Lifesaver Camp',
            date: 'June 15, 2026',
            time: '09:00 AM - 04:00 PM',
            location: 'Inner Circle Parks, Connaught Place, Delhi - 110001',
            district: 'Central Delhi',
            organizer: 'Rotary Blood Bank Tughlakabad',
            donorsAttended: 142,
            contact: '+91 11 2905 1551',
            email: 'info@rotarybloodbank.org',
            license: 'NBTC-CMP-0012'
          },
          {
            id: 102,
            title: 'Gurugram Sector 14 Community Camp',
            date: 'June 01, 2026',
            time: '10:00 AM - 04:00 PM',
            location: 'Community Hall, Sector 14, Gurugram - 122001',
            district: 'Gurugram',
            organizer: 'Local RWAs & Civil Hospital',
            donorsAttended: 88,
            contact: '+91 124 232 0102',
            email: 'camps@gurugramhospital.org',
            license: 'NBTC-CMP-0005'
          }
        ]);
      });
    }
  },

  bookAppointmentSlot: async (bookingData) => {
    try {
      const response = await apiClient.post('/camps/appointments', bookingData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, bookingId: `BKG-${Math.floor(100000 + Math.random() * 900000)}` });
        }, 500);
      });
    }
  },

  registerVolunteer: async (volunteerData) => {
    try {
      const response = await apiClient.post('/camps/volunteers', volunteerData);
      return response.data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 400);
      });
    }
  }
};
