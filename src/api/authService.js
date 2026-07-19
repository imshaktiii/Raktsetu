import apiClient from './client';

export const authService = {
  login: async (credentials) => {
    // API Placeholder: POST /auth/login
    // Expects response: { token: '...', user: { name: '...', role: '...' } }
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    // API Placeholder: POST /auth/register
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (emailData) => {
    // API Placeholder: POST /auth/forgot-password
    const response = await apiClient.post('/auth/forgot-password', emailData);
    return response.data;
  },

  verifyOtp: async (otpData) => {
    // API Placeholder: POST /auth/verify-otp
    const response = await apiClient.post('/auth/verify-otp', otpData);
    return response.data;
  },

  resetPassword: async (passwordData) => {
    // API Placeholder: POST /auth/reset-password
    const response = await apiClient.post('/auth/reset-password', passwordData);
    return response.data;
  },

  getCurrentUser: async () => {
    // API Placeholder: GET /auth/me
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};
