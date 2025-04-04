import React, { createContext, useContext, useState } from 'react';
import { register as registerUser, login as loginUser } from './services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (pseudo, email, password) => {
    await registerUser(pseudo, email, password);
    setUser({ pseudo, email });
  };

  const login = async (email, password) => {
    await loginUser(email, password);
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);