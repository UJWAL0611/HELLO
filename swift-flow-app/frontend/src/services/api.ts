import axios, { AxiosResponse } from 'axios';
import {
  AuthResponse,
  LoginData,
  RegisterData,
  ExchangeRateResponse,
  ConversionResponse,
  HistoricalDataResponse,
  SupportedCurrenciesResponse,
  User
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('swift_flow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('swift_flow_token');
      localStorage.removeItem('swift_flow_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Network error occurred' };
    }
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', registerData);
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Network error occurred' };
    }
  },

  getMe: async (): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Network error occurred' };
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      return { success: false, message: 'Logout failed' };
    }
  }
};

// Currency API
export const currencyAPI = {
  getExchangeRates: async (baseCurrency: string = 'USD'): Promise<ExchangeRateResponse> => {
    try {
      const response: AxiosResponse<ExchangeRateResponse> = await api.get(`/currency/rates/${baseCurrency}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Failed to fetch exchange rates' };
    }
  },

  convertCurrency: async (amount: number, from: string, to: string): Promise<ConversionResponse> => {
    try {
      const response: AxiosResponse<ConversionResponse> = await api.post('/currency/convert', {
        amount,
        from: from.toUpperCase(),
        to: to.toUpperCase()
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Failed to convert currency' };
    }
  },

  getHistoricalRates: async (from: string, to: string, days: number = 30): Promise<HistoricalDataResponse> => {
    try {
      const response: AxiosResponse<HistoricalDataResponse> = await api.get(
        `/currency/historical/${from.toUpperCase()}/${to.toUpperCase()}?days=${days}`
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Failed to fetch historical data' };
    }
  },

  getSupportedCurrencies: async (): Promise<SupportedCurrenciesResponse> => {
    try {
      const response: AxiosResponse<SupportedCurrenciesResponse> = await api.get('/currency/supported');
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, message: 'Failed to fetch supported currencies' };
    }
  }
};

export default api;