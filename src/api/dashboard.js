import apiClient from './client';

export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch {
      console.warn('API call failed. Falling back to local mock dashboard stats...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            stats: {
              totalDonors: 1420,
              availableDonors: 980,
              totalBloodRequests: 245,
              activeBloodRequests: 42,
              totalBloodCamps: 35,
              upcomingBloodCamps: 8,
              bloodGroupDistribution: [
                { bloodGroup: 'O+', count: 450 },
                { bloodGroup: 'A+', count: 320 },
                { bloodGroup: 'B+', count: 280 },
                { bloodGroup: 'AB+', count: 180 },
                { bloodGroup: 'O-', count: 80 },
                { bloodGroup: 'A-', count: 60 },
                { bloodGroup: 'B-', count: 30 },
                { bloodGroup: 'AB-', count: 20 }
              ],
              monthlyRegistrations: [
                { month: 1, year: 2026, count: 120 },
                { month: 2, year: 2026, count: 150 },
                { month: 3, year: 2026, count: 180 },
                { month: 4, year: 2026, count: 220 },
                { month: 5, year: 2026, count: 290 },
                { month: 6, year: 2026, count: 340 },
                { month: 7, year: 2026, count: 420 }
              ],
              recentBloodRequests: [
                {
                  _id: 'REQ-MOCK-1',
                  patientName: 'Aditya Birla',
                  bloodGroup: 'B+',
                  units: 3,
                  hospitalName: 'Apollo Hospital',
                  city: 'Mumbai',
                  urgency: 'High',
                  requiredDate: '2026-07-25T00:00:00.000Z',
                  status: 'Pending'
                },
                {
                  _id: 'REQ-MOCK-2',
                  patientName: 'Komal Sharma',
                  bloodGroup: 'O-',
                  units: 2,
                  hospitalName: 'Fortis Clinic',
                  city: 'New Delhi',
                  urgency: 'Medium',
                  requiredDate: '2026-07-28T00:00:00.000Z',
                  status: 'Pending'
                }
              ],
              upcomingCamps: [
                {
                  _id: 'CAMP-MOCK-1',
                  campName: 'Mega Civil Lines Donation Camp',
                  venue: 'District Red Cross Hall',
                  city: 'New Delhi',
                  date: '2026-07-24T00:00:00.000Z',
                  startTime: '09:00 AM',
                  endTime: '04:00 PM',
                  organizerName: 'Red Cross Society',
                  registeredDonors: 12,
                  totalSeats: 30,
                  status: 'Upcoming'
                }
              ]
            }
          });
        }, 500);
      });
    }
  }
};
