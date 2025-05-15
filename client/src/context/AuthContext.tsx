import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    
    checkUserAuth();
  }, []);

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/user');
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setUser(null);
      return false;
    }
  };

  // Login
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        toast({
          title: t('Login Successful'),
          description: t('Welcome back to Dr. Abdul PHS'),
        });
        return true;
      } else {
        const error = await response.json();
        toast({
          variant: 'destructive',
          title: t('Login Failed'),
          description: error.message || t('Invalid email or password'),
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: t('Login Failed'),
        description: t('An error occurred during login. Please try again.'),
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    if (credentials.password !== credentials.confirmPassword) {
      toast({
        variant: 'destructive',
        title: t('Registration Failed'),
        description: t('Passwords do not match'),
      });
      setIsLoading(false);
      return false;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        toast({
          title: t('Registration Successful'),
          description: t('Your account has been created'),
        });
        return true;
      } else {
        const error = await response.json();
        toast({
          variant: 'destructive',
          title: t('Registration Failed'),
          description: error.message || t('An error occurred during registration'),
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: t('Registration Failed'),
        description: t('An error occurred during registration. Please try again.'),
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      toast({
        title: t('Logout Successful'),
        description: t('You have been logged out'),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}