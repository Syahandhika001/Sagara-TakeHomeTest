import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../types';

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  // State: Login status & user data
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Restore from localStorage (persist login after refresh)
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    // Restore user data from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function
  const login = (email: string, password: string): boolean => {
    // Validate input
    if (!email || !password) {
      return false;
    }

    // Hardcoded credentials for demo (in production, call API)
    if (email === 'admin@example.com' && password === 'admin123') {
      // Set authenticated state
      setIsAuthenticated(true);
      const userData = {
        name: 'Admin User',
        email: email,
      };
      setUser(userData);

      // Persist to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));

      return true; // Login success
    }

    // Login failed
    return false;
  };

  // Logout function
  const logout = () => {
    // Clear state
    setIsAuthenticated(false);
    setUser(null);

    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  // Context value
  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk access context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within AuthProvider. ' +
      'Wrap your app with <AuthProvider>...</AuthProvider>'
    );
  }

  return context;
}