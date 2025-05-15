import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Fetch current user data
  const { data: user, isLoading, error, refetch } = useQuery<User>({
    queryKey: ['/api/auth/user'],
    retry: false
  });
  
  // Check if user is authenticated whenever user data changes
  useEffect(() => {
    if (user && user.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest('POST', '/api/login', { email, password });
      if (response.ok) {
        await refetch();
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };
  
  // Register function
  const register = async (userData: { email: string; password: string; firstName?: string; lastName?: string }) => {
    try {
      const response = await apiRequest('POST', '/api/register', userData);
      if (response.ok) {
        await refetch();
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await apiRequest('POST', '/api/logout', {});
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout
  };
}