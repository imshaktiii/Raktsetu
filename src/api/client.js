import axios from 'axios';

// Configurable base URL from environment or fallback to localhost Node API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor to automatically attach authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('raktsetu_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle global errors (like 401 token expiry)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Clearing local session...');
      localStorage.removeItem('raktsetu_token');
      localStorage.removeItem('raktsetu_user');
      // Redirecting helper if needed: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
