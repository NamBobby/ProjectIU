import axios from "axios";
import { API_URL, API_TIMEOUT } from "../../config"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// Main API client for all requests
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT, 
}); 

// Add JWT token to requests if available
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Log all responses in development mode
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url}: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url}: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
    return Promise.reject(error);
  }
);

// Food API endpoints
// Function to fetch available nutrients
export const fetchAvailableNutrients = async () => {
  try {
    const response = await apiClient.get("/api/food/get-nutrients");
    
    // Check the structure of the response and return the nutrients
    if (response.data && response.data.nutrients) {
      return response.data.nutrients;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("⚠️ Unexpected API response format for nutrients");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching available nutrients:", error);
    return [];
  }
}

export const fetchFoodTypes = async () => {
  try {
    const response = await apiClient.get("/api/food/get-food-types");
    return response.data.food_types;
  } catch (error) {
    console.error("Error fetching food types:", error);
    return ['Fruits','Vegetables','Meat','Dairy','Grains','Snacks','Beverages']; 
  }
};

// Auth API endpoints
export const registerUser = async (name: string, email: string, password: string, day: number, month: number, year: number) => {
  try {
    const response = await apiClient.post("/api/auth/register", {
      name,
      email,
      password,
      day,
      month,
      year,
    });
    console.log("✅ Register API Success:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Register API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/api/auth/login", { email, password });
    
    // Save JWT token to AsyncStorage
    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error("❌ Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Emotion API endpoints
export const detectEmotion = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    const response = await fetch(`${API_URL}/api/emotion/detect-emotion`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = await response.json();
    if (response.ok) {
      await AsyncStorage.setItem("emotion", data.emotion); // Save emotion to AsyncStorage
      return data.emotion;
    } else {
      throw new Error(data.error || "Failed to process image.");
    }
  } catch (error) {
    console.error("❌ Error sending image:", error);
    throw error;
  }
};

// Food recommendation API endpoints
export const getFoodRecommendations = async (emotion: string, mealTime: string, foodType?: string) => {
  try {
    const response = await apiClient.post("/api/food/recommend-food", {
      emotion,
      meal_time: mealTime,
      food_type: foodType,
      personalized: true
    });
    
    return response.data;
  } catch (error: any) {
    console.error("❌ Recommendation API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Explanation API endpoints
export const getFoodExplanation = async (recommendation: any, emotion: string) => {
  try {
    const response = await apiClient.post("/api/explanation/explain-recommendation", {
      recommendation,
      emotion
    });
    
    return response.data.explanation;
  } catch (error: any) {
    console.error("❌ Explanation API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Food selection API endpoint
export const selectFood = async (logId: number, chosenFood: string, compatibilityScore?: number) => {
  try {
    const response = await apiClient.post("/api/food/select-food", {
      log_id: logId,
      chosen_food: chosenFood,
      compatibility_score: compatibilityScore
    });
    
    return response.data;
  } catch (error: any) {
    console.error("❌ Food Selection API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Rate food API endpoint
export const rateFood = async (
  rating: number, 
  emotion: string, 
  meal_time: string, 
  food_type: string,
  recommended_food: string
) => {
  try {
    const response = await apiClient.post("/api/food/rate-food", {
      rating,
      emotion,
      meal_time,
      food_type,
      recommended_food
    });
    
    return response.data;
  } catch (error: any) {
    console.error("❌ Food Rating API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Food logs API endpoint
export const getUserFoodLogs = async () => {
  try {
    const response = await apiClient.get("/api/food/get-user-logs");
    return response.data;
  } catch (error: any) {
    console.error("❌ Food Logs API Error:", error.response?.data || error.message);
    throw error;
  }
};