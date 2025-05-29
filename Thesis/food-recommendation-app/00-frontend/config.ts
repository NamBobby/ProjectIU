import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5001';

// Default timeout for API requests (in milliseconds)
export const API_TIMEOUT = 15000;

// JWT token key for AsyncStorage
export const JWT_TOKEN_KEY = "token";

// App configuration
export const APP_CONFIG = {
  app_name: "Mood Food",
  version: "1.0.0"
};
