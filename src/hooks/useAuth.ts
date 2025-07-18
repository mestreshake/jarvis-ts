import { createContext, useContext } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
