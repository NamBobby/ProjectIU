import React from 'react';
import { View, Text } from 'react-native';
import FoodTrendsStyle from '../styles/foodTrendsStyle';
import { FoodTrendItem, getEmotionColor } from './types';

interface FoodTrendInsightsProps {
  filteredTrends: FoodTrendItem[];
  emotionFilter: string;
}

const FoodTrendInsights: React.FC<FoodTrendInsightsProps> = ({ 
  filteredTrends, 
  emotionFilter 
}) => {
  if (filteredTrends.length === 0) {
    return (
      <View style={FoodTrendsStyle.noDataContainer}>
        <Text style={FoodTrendsStyle.noDataText}>No data available for the selected filters</Text>
      </View>
    );
  }
  
  // Calculate top food for each emotion
  const topFoodByEmotion: { [key: string]: { food: string, rating: number }} = {};
  const emotionStats: { [key: string]: { count: number, totalRating: number }} = {};
  
  filteredTrends.forEach(item => {
    // Track top food
    if (!topFoodByEmotion[item.emotion] || item.rating > topFoodByEmotion[item.emotion].rating) {
      topFoodByEmotion[item.emotion] = { food: item.food, rating: item.rating };
    }
    
    // Track stats
    if (!emotionStats[item.emotion]) {
      emotionStats[item.emotion] = { count: 0, totalRating: 0 };
    }
    emotionStats[item.emotion].count += item.count;
    emotionStats[item.emotion].totalRating += item.rating * item.count;
  });
  
  // Calculate average ratings by emotion
  const avgRatingByEmotion = Object.entries(emotionStats).map(([emotion, stats]) => ({
    emotion,
    avgRating: stats.count > 0 ? (stats.totalRating / stats.count) : 0,
    count: stats.count
  })).sort((a, b) => b.avgRating - a.avgRating);
  
  // Calculate meal time popularity
  const mealTimeStats: { [key: string]: { count: number, totalRating: number }} = {};
  
  filteredTrends.forEach(item => {
    if (!mealTimeStats[item.meal_time]) {
      mealTimeStats[item.meal_time] = { count: 0, totalRating: 0 };
    }
    mealTimeStats[item.meal_time].count += item.count;
    mealTimeStats[item.meal_time].totalRating += item.rating * item.count;
  });
  
  const avgRatingByMealTime = Object.entries(mealTimeStats).map(([mealTime, stats]) => ({
    mealTime,
    avgRating: stats.count > 0 ? (stats.totalRating / stats.count) : 0,
    count: stats.count
  })).sort((a, b) => b.avgRating - a.avgRating);
  
  // Find top food type by rating
  const foodTypeStats: { [key: string]: { count: number, totalRating: number }} = {};
  
  filteredTrends.forEach(item => {
    if (!foodTypeStats[item.food_type]) {
      foodTypeStats[item.food_type] = { count: 0, totalRating: 0 };
    }
    foodTypeStats[item.food_type].count += item.count;
    foodTypeStats[item.food_type].totalRating += item.rating * item.count;
  });
  
  const avgRatingByFoodType = Object.entries(foodTypeStats).map(([foodType, stats]) => ({
    foodType,
    avgRating: stats.count > 0 ? (stats.totalRating / stats.count) : 0,
    count: stats.count
  })).sort((a, b) => b.avgRating - a.avgRating);
  
  // Calculate average overall rating
  const totalRatings = filteredTrends.reduce((sum, item) => sum + item.count, 0);
  const totalRatingSum = filteredTrends.reduce((sum, item) => sum + (item.rating * item.count), 0);
  const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;
  
  return (
    <View>
      {/* Emotion-Food Matching Insights */}
      <View style={FoodTrendsStyle.insightItem}>
        <Text style={FoodTrendsStyle.insightTitle}>Emotion-Food Compatibility</Text>
        {avgRatingByEmotion.length > 0 ? (
          <Text style={FoodTrendsStyle.insightText}>
            Users experiencing <Text style={{ fontWeight: '600', color: getEmotionColor(avgRatingByEmotion[0]?.emotion || 'neutral') }}>
              {avgRatingByEmotion[0]?.emotion || 'neutral'}</Text> emotions responded most positively to food recommendations, 
            with an average rating of {avgRatingByEmotion[0]?.avgRating.toFixed(1) || 'N/A'}.
          </Text>
        ) : (
          <Text style={FoodTrendsStyle.insightText}>No emotion data available.</Text>
        )}
        
        {Object.entries(topFoodByEmotion).length > 0 && (
          <Text style={[FoodTrendsStyle.insightText, { marginTop: 8 }]}>
            The highest-rated foods by emotion are:
          </Text>
        )}
        
        {Object.entries(topFoodByEmotion).map(([emotion, data], index) => (
          <View key={index} style={{ marginTop: 4 }}>
            <Text style={[FoodTrendsStyle.insightText, { fontWeight: '500' }]}>
              <Text style={{ color: getEmotionColor(emotion) }}>
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </Text>: {data.food} ({data.rating.toFixed(1)}/5)
            </Text>
          </View>
        ))}
      </View>
      
      {/* Meal Time Insights */}
      <View style={FoodTrendsStyle.insightItem}>
        <Text style={FoodTrendsStyle.insightTitle}>Meal Time Preferences</Text>
        {avgRatingByMealTime.length > 0 ? (
          <>
            <Text style={FoodTrendsStyle.insightText}>
              <Text style={{ fontWeight: '600' }}>{avgRatingByMealTime[0].mealTime}</Text> recommendations 
              received the highest average rating ({avgRatingByMealTime[0].avgRating.toFixed(1)}/5) with {' '}
              {avgRatingByMealTime[0].count} ratings.
            </Text>
            <Text style={[FoodTrendsStyle.insightText, { marginTop: 8 }]}>
              Meal time rating distribution:
            </Text>
            {avgRatingByMealTime.map((data, index) => (
              <View key={index} style={{ marginTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#4B5563' }}>{data.mealTime}</Text>
                  <Text style={{ fontSize: 14, color: '#4B5563', fontWeight: '500' }}>
                    {data.avgRating.toFixed(1)}/5
                  </Text>
                </View>
                <View style={FoodTrendsStyle.ratingDistributionBar}>
                  <View 
                    style={[
                      FoodTrendsStyle.ratingFill, 
                      { 
                        width: `${(data.avgRating / 5) * 100}%`,
                        backgroundColor: index === 0 ? '#5CEA7E' : '#6EA9F7'
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text style={FoodTrendsStyle.insightText}>No meal time data available.</Text>
        )}
      </View>
      
      {/* Food Type Insights */}
      <View style={FoodTrendsStyle.insightItem}>
        <Text style={FoodTrendsStyle.insightTitle}>Food Type Analysis</Text>
        {avgRatingByFoodType.length > 0 ? (
          <>
            <Text style={FoodTrendsStyle.insightText}>
              <Text style={{ fontWeight: '600' }}>{avgRatingByFoodType[0].foodType}</Text> foods 
              received the highest average rating ({avgRatingByFoodType[0].avgRating.toFixed(1)}/5) with {' '}
              {avgRatingByFoodType[0].count} ratings.
            </Text>
            <Text style={[FoodTrendsStyle.insightText, { marginTop: 8 }]}>
              {emotionFilter !== 'all' ? (
                `For ${emotionFilter} emotions, ${avgRatingByFoodType[0].foodType} foods are the most effective.`
              ) : (
                `Across all emotions, ${avgRatingByFoodType[0].foodType} foods are the most versatile and well-received.`
              )}
            </Text>
          </>
        ) : (
          <Text style={FoodTrendsStyle.insightText}>No food type data available.</Text>
        )}
      </View>
      
      {/* Recommendation Quality Insights */}
      <View style={FoodTrendsStyle.insightItem}>
        <Text style={FoodTrendsStyle.insightTitle}>Recommendation Quality</Text>
        <Text style={FoodTrendsStyle.insightText}>
          {totalRatings > 0 ? (
            `Based on ${totalRatings} total ratings, the average recommendation rating is ${averageRating.toFixed(1)}/5.`
          ) : (
            'No rating data available for the selected filters.'
          )}
        </Text>
        
        {totalRatings > 0 && (
          <Text style={[FoodTrendsStyle.insightText, { marginTop: 8 }]}>
            {emotionFilter !== 'all' ? (
              `This suggests that current recommendations for ${emotionFilter} emotions are ${
                averageRating >= 4.0 ? 
                'highly effective' : 
                averageRating >= 3.0 ?
                'moderately effective' : 'in need of improvement'
              }.`
            ) : (
              `This suggests that the overall recommendation algorithm is ${
                averageRating >= 4.0 ? 
                'performing well' : 
                averageRating >= 3.0 ?
                'performing adequately' : 'in need of improvement'
              }.`
            )}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FoodTrendInsights;