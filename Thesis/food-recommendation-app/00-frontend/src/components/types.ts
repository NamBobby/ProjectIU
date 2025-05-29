export interface FoodTrendItem {
    food: string;
    food_type: string;
    meal_time: string;
    emotion: string;
    rating: number;
    count: number;
  }
  
  export interface EmotionData {
    emotion: string;
    count: number;
    avgRating: number;
  }
  
  export interface MealTimeData {
    meal_time: string;
    count: number;
    avgRating: number;
  }
  
  export interface FoodTypeData {
    food_type: string;
    count: number;
    avgRating: number;
  }
  
  export const getEmotionColor = (emotion: string): string => {
    switch (emotion.toLowerCase()) {
      case 'happy': return '#5CEA7E'; // Green
      case 'sad': return '#805AE3'; // Purple
      case 'angry': return '#FF5A63'; // Red
      case 'neutral': return '#6EA9F7'; // Blue
      case 'surprise': return '#FFA500'; // Orange
      case 'disgust': return '#8B4513'; // Brown
      case 'fear': return '#9932CC'; // Dark Orchid
      default: return '#6B7280'; // Gray
    }
  };
  
  export const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprise', 'fear', 'disgust'];
  export const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  export const foodTypes = ['Fruits', 'Vegetables', 'Meat', 'Dairy', 'Grains', 'Snacks', 'Beverages'];