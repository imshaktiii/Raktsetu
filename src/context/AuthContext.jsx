import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load session from localStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('raktsetu_token');
    const savedUser = localStorage.getItem('raktsetu_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Expect response: { token: '...', user: { id: '...', name: '...', role: '...' } }
      const data = await authAPI.login(credentials);
      
      localStorage.setItem('raktsetu_token', data.token);
      localStorage.setItem('raktsetu_user', JSON.stringify(data.user || data.donor));
      
      setToken(data.token);
      setUser(data.user || data.donor);
      return data.user || data.donor;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Authentication failed. Please verify credentials.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.register(userData);
      
      localStorage.setItem('raktsetu_token', data.token);
      localStorage.setItem('raktsetu_user', JSON.stringify(data.user || data.donor));
      
      setToken(data.token);
      setUser(data.user || data.donor);
      return data.user || data.donor;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed. Please check form parameters.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('raktsetu_token');
    localStorage.removeItem('raktsetu_user');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    localStorage.setItem('raktsetu_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register: registerUser,
    logout,
    updateUser,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
