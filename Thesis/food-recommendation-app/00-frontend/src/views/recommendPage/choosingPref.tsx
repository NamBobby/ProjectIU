import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navigations/AppNavigator";
import Row from "../../components/rowBack";
import ChoosingPrefStyle from "../../styles/choosingPrefStyle";
import { fetchFoodTypes } from "../../services/api";

type ChoosingPrefNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ChoosingPref"
>;

// Define meal time options
const MEAL_TIMES = ["Breakfast", "Lunch", "Dinner", "Snack"];

const ChoosingPref: React.FC = () => {
  const navigation = useNavigation<ChoosingPrefNavigationProp>();
  const [emotion, setEmotion] = useState<string>("neutral");
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [selectedMealTime, setSelectedMealTime] = useState<string>("Lunch");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [foodTypes, setFoodTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);

        // Get emotion from AsyncStorage
        const storedEmotion = await AsyncStorage.getItem("emotion");
        if (storedEmotion) {
          setEmotion(storedEmotion);
        }

        // Fetch available food types
        try {
          const fetchedFoodTypes = await fetchFoodTypes();

          if (
            fetchedFoodTypes &&
            Array.isArray(fetchedFoodTypes) &&
            fetchedFoodTypes.length > 0
          ) {
            setFoodTypes(fetchedFoodTypes);
            setSelectedFoodType(fetchedFoodTypes[0]);
          }
        } catch (error) {
          console.error("❌ Error fetching food types:", error);
        }
      } catch (error) {
        console.error("❌ General error in data fetching:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      // Save preferences to AsyncStorage
      await AsyncStorage.setItem("foodType", selectedFoodType || "");
      await AsyncStorage.setItem("mealTime", selectedMealTime);

      // Navigate to result page
      navigation.navigate("ResultFood");
    } catch (error) {
      console.error("❌ Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = () => {
    switch (emotion) {
      case "angry":
        return "#FF5A63"; // Red
      case "happy":
        return "#5CEA7E"; // Green
      case "neutral":
        return "#6EA9F7"; // Blue
      case "sad":
        return "#805AE3"; // Purple
      case "surprise":
        return "#FFA500"; // Orange
      case "fear":
        return "#9932CC"; // Dark Orchid
      case "disgust":
        return "#8B4513"; // Saddle Brown
      default:
        return "#6EA9F7"; // Default blue
    }
  };

  if (loadingData) {
    return (
      <View
        style={[
          ChoosingPrefStyle.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={getEmotionColor()} />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={ChoosingPrefStyle.container}>
      <View style={ChoosingPrefStyle.info}>
        <Row />
      </View>

      <View style={ChoosingPrefStyle.content}>
        <View style={ChoosingPrefStyle.emotionContainer}>
          <Text style={ChoosingPrefStyle.emotionText}>
            Today you may feel{" "}
            <Text
              style={[ChoosingPrefStyle.emotionHighlight, { color: getEmotionColor() }]}
            >
              {emotion && emotion.charAt(0).toUpperCase() + emotion.slice(1)}
            </Text>
          </Text>
          <Text style={ChoosingPrefStyle.subtitle}>Please select your preferences</Text>
        </View>

        {/* Meal Time Selection */}
        <View style={ChoosingPrefStyle.section}>
          <Text style={ChoosingPrefStyle.sectionTitle}>Meal Time</Text>
          <View style={ChoosingPrefStyle.radioGroup}>
            {MEAL_TIMES.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={[
                  ChoosingPrefStyle.radioButton,
                  selectedMealTime === meal && {
                    backgroundColor: getEmotionColor(),
                  },
                ]}
                onPress={() => setSelectedMealTime(meal)}
              >
                <Text
                  style={[
                    ChoosingPrefStyle.radioText,
                    selectedMealTime === meal && ChoosingPrefStyle.radioTextSelected,
                  ]}
                >
                  {meal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Food Type Selection */}
        <View style={ChoosingPrefStyle.section}>
          <Text style={ChoosingPrefStyle.sectionTitle}>Food Type</Text>
          <View style={ChoosingPrefStyle.radioGroup}>
            {foodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  ChoosingPrefStyle.radioButton,
                  selectedFoodType === type && {
                    backgroundColor: getEmotionColor(),
                  },
                ]}
                onPress={() => setSelectedFoodType(type)}
              >
                <Text
                  style={[
                    ChoosingPrefStyle.radioText,
                    selectedFoodType === type && ChoosingPrefStyle.radioTextSelected,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={ChoosingPrefStyle.spacer} />
      </View>

      <View style={ChoosingPrefStyle.footer}>
        <TouchableOpacity
          style={[ChoosingPrefStyle.startButton, { backgroundColor: getEmotionColor() }]}
          onPress={handleStart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#E39F0C" />
          ) : (
            <Text style={ChoosingPrefStyle.startButtonText}>Get Recommendations</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChoosingPref;
