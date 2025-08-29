import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType } from '../types';
import { apiService } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    const savedNome = localStorage.getItem('nome');
    
    if (savedToken && savedUsername) {
      setToken(savedToken);
      setUsername(savedUsername);
      setNome(savedNome);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (usernameInput: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await apiService.login({ username: usernameInput, password });
      
      // Save to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      if (response.nome) {
        localStorage.setItem('nome', response.nome);
      }
      
      // Update state
      setToken(response.token);
      setUsername(response.username);
      setNome(response.nome || null);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('nome');
    
    // Clear state
    setToken(null);
    setUsername(null);
    setNome(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    token,
    username,
    nome,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
