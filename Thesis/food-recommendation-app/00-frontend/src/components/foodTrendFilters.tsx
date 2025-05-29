import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FoodTrendsStyle from '../styles/foodTrendsStyle';
import { emotions, mealTimes, foodTypes } from './types';

interface FoodTrendFiltersProps {
  visible: boolean;
  onClose: () => void;
  emotionFilter: string;
  setEmotionFilter: (value: string) => void;
  mealTimeFilter: string;
  setMealTimeFilter: (value: string) => void;
  foodTypeFilter: string;
  setFoodTypeFilter: (value: string) => void;
  resetFilters: () => void;
}

const FoodTrendFilters: React.FC<FoodTrendFiltersProps> = ({
  visible,
  onClose,
  emotionFilter,
  setEmotionFilter,
  mealTimeFilter,
  setMealTimeFilter,
  foodTypeFilter,
  setFoodTypeFilter,
  resetFilters
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={FoodTrendsStyle.modalOverlay}>
        <View style={FoodTrendsStyle.modalContent}>
          <View style={FoodTrendsStyle.modalHeader}>
            <Text style={FoodTrendsStyle.modalTitle}>Filter Trends</Text>
            <TouchableOpacity
              onPress={onClose}
              style={FoodTrendsStyle.modalCloseButton}
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={FoodTrendsStyle.modalScrollView}>
            {/* Emotion Filter */}
            <View style={FoodTrendsStyle.filterSection}>
              <Text style={FoodTrendsStyle.filterLabel}>Emotion</Text>
              <View style={FoodTrendsStyle.filterOptions}>
                <TouchableOpacity
                  style={[
                    FoodTrendsStyle.filterOption,
                    emotionFilter === 'all' && FoodTrendsStyle.filterOptionSelected
                  ]}
                  onPress={() => setEmotionFilter('all')}
                >
                  <Text style={[
                    FoodTrendsStyle.filterOptionText,
                    emotionFilter === 'all' && FoodTrendsStyle.filterOptionTextSelected
                  ]}>All</Text>
                </TouchableOpacity>
                
                {emotions.map((emotion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      FoodTrendsStyle.filterOption,
                      emotionFilter === emotion && FoodTrendsStyle.filterOptionSelected
                    ]}
                    onPress={() => setEmotionFilter(emotion)}
                  >
                    <Text style={[
                      FoodTrendsStyle.filterOptionText,
                      emotionFilter === emotion && FoodTrendsStyle.filterOptionTextSelected
                    ]}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Meal Time Filter */}
            <View style={FoodTrendsStyle.filterSection}>
              <Text style={FoodTrendsStyle.filterLabel}>Meal Time</Text>
              <View style={FoodTrendsStyle.filterOptions}>
                <TouchableOpacity
                  style={[
                    FoodTrendsStyle.filterOption,
                    mealTimeFilter === 'all' && FoodTrendsStyle.filterOptionSelected
                  ]}
                  onPress={() => setMealTimeFilter('all')}
                >
                  <Text style={[
                    FoodTrendsStyle.filterOptionText,
                    mealTimeFilter === 'all' && FoodTrendsStyle.filterOptionTextSelected
                  ]}>All</Text>
                </TouchableOpacity>
                
                {mealTimes.map((mealTime, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      FoodTrendsStyle.filterOption,
                      mealTimeFilter === mealTime && FoodTrendsStyle.filterOptionSelected
                    ]}
                    onPress={() => setMealTimeFilter(mealTime)}
                  >
                    <Text style={[
                      FoodTrendsStyle.filterOptionText,
                      mealTimeFilter === mealTime && FoodTrendsStyle.filterOptionTextSelected
                    ]}>{mealTime}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Food Type Filter */}
            <View style={FoodTrendsStyle.filterSection}>
              <Text style={FoodTrendsStyle.filterLabel}>Food Type</Text>
              <View style={FoodTrendsStyle.filterOptions}>
                <TouchableOpacity
                  style={[
                    FoodTrendsStyle.filterOption,
                    foodTypeFilter === 'all' && FoodTrendsStyle.filterOptionSelected
                  ]}
                  onPress={() => setFoodTypeFilter('all')}
                >
                  <Text style={[
                    FoodTrendsStyle.filterOptionText,
                    foodTypeFilter === 'all' && FoodTrendsStyle.filterOptionTextSelected
                  ]}>All</Text>
                </TouchableOpacity>
                
                {foodTypes.map((foodType, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      FoodTrendsStyle.filterOption,
                      foodTypeFilter === foodType && FoodTrendsStyle.filterOptionSelected
                    ]}
                    onPress={() => setFoodTypeFilter(foodType)}
                  >
                    <Text style={[
                      FoodTrendsStyle.filterOptionText,
                      foodTypeFilter === foodType && FoodTrendsStyle.filterOptionTextSelected
                    ]}>{foodType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[FoodTrendsStyle.applyButton, { flex: 1, backgroundColor: '#9CA3AF', marginRight: 8 }]}
                onPress={() => {
                  resetFilters();
                  onClose();
                }}
              >
                <Text style={FoodTrendsStyle.applyButtonText}>Reset Filters</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[FoodTrendsStyle.applyButton, { flex: 1 }]}
                onPress={onClose}
              >
                <Text style={FoodTrendsStyle.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FoodTrendFilters;