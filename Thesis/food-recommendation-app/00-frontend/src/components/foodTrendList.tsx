import React from 'react';
import { View, Text, FlatList } from 'react-native';
import FoodTrendsStyle from '../styles/foodTrendsStyle';
import { FoodTrendItem, getEmotionColor } from './types';

interface FoodTrendListProps {
  filteredTrends: FoodTrendItem[];
  onScroll?: (event: any) => void; 
  scrollEnabled?: boolean; 
}

const FoodTrendList: React.FC<FoodTrendListProps> = ({ 
  filteredTrends, 
  onScroll,
  scrollEnabled = true 
}) => {
  if (filteredTrends.length === 0) {
    return (
      <View style={FoodTrendsStyle.noDataContainer}>
        <Text style={FoodTrendsStyle.noDataText}>No data available for the selected filters</Text>
      </View>
    );
  }
  
  // Sort trends by rating (highest first)
  const sortedTrends = [...filteredTrends].sort((a, b) => b.rating - a.rating);
  
  return (
    <FlatList
      data={sortedTrends}
      keyExtractor={(item, index) => `${item.food}-${index}`}
      renderItem={({ item }) => (
        <View style={FoodTrendsStyle.foodItem}>
          <View style={FoodTrendsStyle.foodInfo}>
            <Text style={FoodTrendsStyle.foodName}>{item.food}</Text>
            <View style={FoodTrendsStyle.foodMetaContainer}>
              <View style={[
                FoodTrendsStyle.emotionBadge,
                { backgroundColor: getEmotionColor(item.emotion) }
              ]}>
                <Text style={FoodTrendsStyle.emotionBadgeText}>{item.emotion}</Text>
              </View>
              <Text style={FoodTrendsStyle.foodType}>{item.food_type}</Text>
              <Text style={FoodTrendsStyle.mealTime}>{item.meal_time}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={FoodTrendsStyle.foodRating}>{item.rating.toFixed(1)}</Text>
            <Text style={FoodTrendsStyle.foodCount}>{item.count} ratings</Text>
          </View>
        </View>
      )}
      style={{ marginTop: 8 }}
      scrollEnabled={scrollEnabled}
      onScroll={onScroll} 
    />
  );
};

export default FoodTrendList;