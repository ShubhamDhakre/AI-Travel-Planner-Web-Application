import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('tripai_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            logout();
          }
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success && res.data) {
      localStorage.setItem('tripai_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      return res.data;
    }
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success && res.data) {
      localStorage.setItem('tripai_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('tripai_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
