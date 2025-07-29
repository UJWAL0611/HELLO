import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, RegisterData, AuthContextType } from '../types';
import { authAPI } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const storedToken = localStorage.getItem('swift_flow_token');
    const storedUser = localStorage.getItem('swift_flow_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('swift_flow_token');
        localStorage.removeItem('swift_flow_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success && response.token && response.user) {
        localStorage.setItem('swift_flow_token', response.token);
        localStorage.setItem('swift_flow_user', JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authAPI.register(userData);
      
      if (response.success && response.token && response.user) {
        localStorage.setItem('swift_flow_token', response.token);
        localStorage.setItem('swift_flow_user', JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('swift_flow_token');
      localStorage.removeItem('swift_flow_user');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};