import React, { useRef } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import FoodTrendsStyle from '../styles/foodTrendsStyle';
import { FoodTrendItem, getEmotionColor } from './types';

interface FoodTrendChartsProps {
  filteredTrends: FoodTrendItem[];
}

const FoodTrendCharts: React.FC<FoodTrendChartsProps> = ({ filteredTrends }) => {
  const screenWidth = Dimensions.get('window').width - 40;
  const scrollViewRef = useRef<ScrollView>(null);
  
  const getMinimumChartWidth = (dataLength: number) => {
    return Math.max(screenWidth, dataLength * 100);
  };

  // Prepare data for emotion chart
  const getEmotionChartData = () => {
    const allEmotions = ['happy', 'sad', 'angry', 'neutral', 'surprise', 'fear', 'disgust'];
    const emotionData: { [key: string]: { count: number, total: number }} = {};
    allEmotions.forEach(emotion => {
      emotionData[emotion] = { count: 0, total: 0 };
    });
    filteredTrends.forEach(item => {
      if (!emotionData[item.emotion]) {
        emotionData[item.emotion] = { count: 0, total: 0 };
      }
      emotionData[item.emotion].count += item.count;
      emotionData[item.emotion].total += item.rating * item.count;
    });
    
    const chartData = Object.entries(emotionData).map(([emotion, data]) => ({
      name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      count: data.count,
      avgRating: data.count > 0 ? (data.total / data.count) : 0,
      color: getEmotionColor(emotion)
    }));
    
    return chartData;
  };

  // Prepare data for meal time chart
  const getMealTimeChartData = () => {
    const allMealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const mealTimeData: { [key: string]: { count: number, total: number }} = {};
    allMealTimes.forEach(mealTime => {
      mealTimeData[mealTime] = { count: 0, total: 0 };
    });
    filteredTrends.forEach(item => {
      if (!mealTimeData[item.meal_time]) {
        mealTimeData[item.meal_time] = { count: 0, total: 0 };
      }
      mealTimeData[item.meal_time].count += item.count;
      mealTimeData[item.meal_time].total += item.rating * item.count;
    });
    
    const chartData = Object.entries(mealTimeData).map(([mealTime, data]) => ({
      name: mealTime,
      count: data.count,
      avgRating: data.count > 0 ? (data.total / data.count) : 0
    }));
    
    return chartData;
  };

  // Prepare data for food type chart
  const getFoodTypeChartData = () => {
    const allFoodTypes = ['Fruits', 'Vegetables', 'Meat', 'Dairy', 'Grains', 'Snacks', 'Beverages'];
    const foodTypeData: { [key: string]: { count: number, total: number }} = {};
    allFoodTypes.forEach(foodType => {
      foodTypeData[foodType] = { count: 0, total: 0 };
    });
    filteredTrends.forEach(item => {
      if (!foodTypeData[item.food_type]) {
        foodTypeData[item.food_type] = { count: 0, total: 0 };
      }
      foodTypeData[item.food_type].count += item.count;
      foodTypeData[item.food_type].total += item.rating * item.count;
    });
    
    const chartData = Object.entries(foodTypeData).map(([foodType, data]) => ({
      name: foodType,
      count: data.count,
      avgRating: data.count > 0 ? (data.total / data.count) : 0
    }));
    
    return chartData;
  };

  // Render emotion chart
  const renderEmotionChart = () => {
    const emotionData = getEmotionChartData();
    const chartWidth = getMinimumChartWidth(emotionData.length);
    
    if (filteredTrends.length === 0) {
      return (
        <View style={FoodTrendsStyle.noDataContainer}>
          <Text style={FoodTrendsStyle.noDataText}>No data available for the selected filters</Text>
        </View>
      );
    }
    
    const chartData = {
      labels: emotionData.map(item => item.name),
      datasets: [
        {
          data: emotionData.map(item => item.avgRating),
          color: (opacity = 1) => `rgba(110, 169, 247, ${opacity})`,
        }
      ]
    };
    
    return (
      <View>
        <Text style={FoodTrendsStyle.sectionTitle}>Average Rating by Emotion</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <BarChart
            data={chartData}
            width={chartWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(110, 169, 247, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              barPercentage: 0.4,
              propsForLabels: {
                fontSize: 9,
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero
            showValuesOnTopOfBars={true}
          />
        </ScrollView>
        <View style={FoodTrendsStyle.legendContainer}>
          {emotionData.map((item, index) => (
            <View key={index} style={FoodTrendsStyle.legendItem}>
              <View style={[FoodTrendsStyle.legendColor, { backgroundColor: item.color }]} />
              <Text style={FoodTrendsStyle.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
        <Text style={FoodTrendsStyle.scrollHint}>Swipe left/right to see more</Text>
      </View>
    );
  };

  // Render meal time chart
  const renderMealTimeChart = () => {
    const mealTimeData = getMealTimeChartData();
    const chartWidth = getMinimumChartWidth(mealTimeData.length);
    
    if (mealTimeData.every(item => item.count === 0)) {
      return null;
    }
    
    const chartData = {
      labels: mealTimeData.map(item => item.name),
      datasets: [
        {
          data: mealTimeData.map(item => item.avgRating),
          color: (opacity = 1) => `rgba(92, 234, 126, ${opacity})`,
        }
      ]
    };
    
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={FoodTrendsStyle.sectionTitle}>Average Rating by Meal Time</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <BarChart
            data={chartData}
            width={chartWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(92, 234, 126, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              barPercentage: 0.4,
              propsForLabels: {
                fontSize: 10
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero
            showValuesOnTopOfBars={true}
          />
        </ScrollView>
        <Text style={FoodTrendsStyle.scrollHint}>Swipe left/right to see more</Text>
      </View>
    );
  };

  // Render food type chart
  const renderFoodTypeChart = () => {
    const foodTypeData = getFoodTypeChartData();
    const chartWidth = getMinimumChartWidth(foodTypeData.length);
    
    if (foodTypeData.every(item => item.count === 0)) {
      return null;
    }
    
    const chartData = {
      labels: foodTypeData.map(item => item.name),
      datasets: [
        {
          data: foodTypeData.map(item => item.avgRating),
          color: (opacity = 1) => `rgba(255, 90, 99, ${opacity})`,
        }
      ]
    };
    
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={FoodTrendsStyle.sectionTitle}>Average Rating by Food Type</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <BarChart
            data={chartData}
            width={chartWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 90, 99, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              barPercentage: 0.4,
              propsForLabels: {
                fontSize: 9
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero
            showValuesOnTopOfBars={true}
          />
        </ScrollView>
        <Text style={FoodTrendsStyle.scrollHint}>Swipe left/right to see more</Text>
      </View>
    );
  };

  return (
    <>
      {renderEmotionChart()}
      {renderMealTimeChart()}
      {renderFoodTypeChart()}
    </>
  );
};

export default FoodTrendCharts;