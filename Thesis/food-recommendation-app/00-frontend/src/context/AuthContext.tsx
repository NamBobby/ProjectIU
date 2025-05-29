import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { loginUser as apiLoginUser } from '../services/api';

// Define our context types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Set initial state to not authenticated - forcing login screen to show first
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication status
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      
      if (token && userString) {
        const userData = JSON.parse(userString);
        setUser(userData);
        setIsAuthenticated(true);
        console.log("🔒 Auth check - Authenticated as:", userData.role);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("🔒 Auth check - Not authenticated");
      }
    } catch (error) {
      console.error("❌ Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiLoginUser(email, password);
      
      // Save JWT token and user data
      if (response.token) {
        await AsyncStorage.setItem("token", response.token);
      } else {
        console.warn("⚠️ No token received from API.");
      }

      await AsyncStorage.setItem("user", JSON.stringify(response.user));
      
      // Update auth state
      setUser(response.user);
      setIsAuthenticated(true);
      
      Alert.alert("Success", "Login successful!");
      console.log("✅ Login successful as:", response.user.role);
      return response;
    } catch (error: any) {
      console.error("❌ Login error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Login failed. Please check your credentials."
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      console.log("🚪 Logged out successfully");
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated, 
        login, 
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;