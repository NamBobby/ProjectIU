import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import HomeStyle from "../../styles/homeStyle";
import { useNavigation } from "@react-navigation/native";
import UserInfo from "../userPage/userInfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { getUserFoodLogs } from "../../services/api";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todayEmotion, setTodayEmotion] = useState<string | null>(null);
  const [todayFood, setTodayFood] = useState<string | null>(null);
  const [todayMealTime, setTodayMealTime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user logs from API to check if mood was recorded today
  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        setLoading(true);
        
        // Get logs from API
        const response = await getUserFoodLogs();
        
        if (response && response.status === "success" && response.logs && response.logs.length > 0) {
          // Get the latest log
          const latestLog = response.logs[0];
          
          // Check if the log is from today
          const logDate = new Date(latestLog.date);
          const today = new Date();
          
          if (
            logDate.getDate() === today.getDate() &&
            logDate.getMonth() === today.getMonth() &&
            logDate.getFullYear() === today.getFullYear()
          ) {
            // Log is from today
            setTodayEmotion(latestLog.emotion);
            setTodayFood(latestLog.recommended_food);
            setTodayMealTime(latestLog.meal_time);
          }
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLogs();
  }, []);

  const navigateToShooting = () => {
    navigation.navigate("Shooting");
  };

  const navigateToTracking = () => {
    navigation.navigate("Tracking");
  };

  // Render mood status
  const renderMoodStatus = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="#E39F0C" />;
    }
    
    if (todayEmotion) {
      return (
        <Text style={HomeStyle.moodStatusText}>
          Today you feel <Text style={[HomeStyle.highlightText, { color: getEmotionColor(todayEmotion) }]}>
            {todayEmotion}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={HomeStyle.moodStatusText}>
          You haven't checked your mood
        </Text>
      );
    }
  };

  // Helper function to get emotion color
  const getEmotionColor = (emotion: string): string => {
    switch (emotion.toLowerCase()) {
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

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.topinfo}>
        <View style={HomeStyle.info}>
          <UserInfo/>
        </View>
        
        {/* Mood status section */}
        <View style={HomeStyle.moodStatusContainer}>
          {renderMoodStatus()}
          <View style={HomeStyle.frame}>
            <Text style={HomeStyle.textframe}>C&Y</Text>
          </View>
          <Text style={HomeStyle.moodText}>
            Track your daily mood to {'\n'} know today's taste
          </Text>
        </View>
        
        <View style={HomeStyle.buttonmenu}>
          <View style={HomeStyle.option}>
            <TouchableOpacity style={HomeStyle.rectangle} onPress={navigateToShooting}>
              <View style={HomeStyle.option}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={40} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={HomeStyle.rectangle} onPress={navigateToTracking}>
              <View style={HomeStyle.option}>
                <FontAwesomeIcon icon={faChartLine} size={40} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;