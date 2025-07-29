export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  country: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  country: string;
}

export interface Currency {
  name: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRateResponse {
  success: boolean;
  data?: {
    base: string;
    date: string;
    rates: { [key: string]: number };
    lastUpdated: string;
  };
  message?: string;
}

export interface ConversionResponse {
  success: boolean;
  data?: {
    amount: number;
    from: string;
    to: string;
    rate: string;
    inverseRate: string;
    convertedAmount: number;
    lastUpdated: string;
  };
  message?: string;
}

export interface HistoricalDataResponse {
  success: boolean;
  data?: {
    from: string;
    to: string;
    period: string;
    historical: Array<{
      date: string;
      rate: number;
    }>;
  };
  message?: string;
}

export interface SupportedCurrenciesResponse {
  success: boolean;
  data?: { [key: string]: Currency };
  count?: number;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}