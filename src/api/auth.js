import apiClient from './client';

export const authAPI = {
  login: async (credentials) => {
    try {
      // If server is active, try network request
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch {
      console.warn('API connection failed. Falling back to local mock authentication...');
      // Return mock MERN response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-xyz',
            user: {
              id: 'USR-MOCK-1',
              name: credentials.email.split('@')[0],
              email: credentials.email,
              role: credentials.role || 'donor'
            }
          });
        }, 800);
      });
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch {
      console.warn('API connection failed. Falling back to mock registration...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-xyz',
            user: {
              id: 'USR-MOCK-1',
              name: userData.fullName || 'Registered User',
              email: userData.email,
              role: 'donor'
            }
          });
        }, 800);
      });
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch {
      // Fetch session from localStorage fallback
      const savedUser = localStorage.getItem('raktsetu_user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
  }
};
