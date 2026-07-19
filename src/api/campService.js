import apiClient from './client';

export const campService = {
  getCamps: async (status = 'Upcoming') => {
    // API Placeholder: GET /camps?status=Upcoming
    const response = await apiClient.get('/camps', { params: { status } });
    return response.data;
  },

  registerForCamp: async (bookingData) => {
    // API Placeholder: POST /camps/register
    const response = await apiClient.post('/camps/register', bookingData);
    return response.data;
  },

  registerVolunteer: async (volunteerData) => {
    // API Placeholder: POST /camps/volunteer
    const response = await apiClient.post('/camps/volunteer', volunteerData);
    return response.data;
  }
};
