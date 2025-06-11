// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from "react"; // 1. Import useContext
import { authAPI } from "../api";

export const AuthContext = createContext();

// 2. Create and export the useAuth custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you'd verify the token with the backend here
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    localStorage.setItem("token", response.data.token);
    setUser({ token: response.data.token });
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    localStorage.setItem("token", response.data.token);
    setUser({ token: response.data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
