import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUsers,
  faUtensils,
  faSmile,
  faSadTear,
  faAngry,
  faMeh,
  faSurprise,
  faGrimace,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList } from "../../navigations/AdminNavigator";
import { apiClient } from "../../services/api";
import AdminDashboardStyle from "../../styles/adminDashboardStyle";
import { PieChart } from "react-native-chart-kit";

type AdminDashboardProps = StackNavigationProp<
  AdminStackParamList,
  "AdminTabs"
>;

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRecommendations: number;
  emotionDistribution: {
    [key: string]: number;
  };
  mealTimeDistribution: {     
    [key: string]: number;
  };
  averageRating: number;     
  topRatedFoods: Array<{
    food: string;
    food_type: string;       
    rating: number;
    emotion: string;
    count: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<AdminDashboardProps>();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.get("/api/admin/dashboard-stats");

      if (response.data && response.data.status === "success") {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Pull down to refresh.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return faSmile;
      case "sad":
        return faSadTear;
      case "angry":
        return faAngry;
      case "neutral":
        return faMeh;
      case "surprise":
        return faSurprise;
      case "disgust":
        return faGrimace;
      case "fear":
        return faFrown;
      default:
        return faMeh;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return "#5CEA7E";
      case "sad":
        return "#805AE3";
      case "angry":
        return "#FF5A63";
      case "neutral":
        return "#6EA9F7";
      case "surprise":
        return "#FFA500";
      case "disgust":
        return "#8B4513";
      case "fear":
        return "#9932CC";
      default:
        return "#6EA9F7";
    }
  };

  const renderEmotionDistributionChart = () => {
    if (!stats || !stats.emotionDistribution) return null;

    const chartData = Object.entries(stats.emotionDistribution).map(
      ([emotion, count]) => ({
        name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        population: count,
        color: getEmotionColor(emotion),
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      })
    );

    return (
      <View style={AdminDashboardStyle.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth - 64}
          height={180}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={AdminDashboardStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#E39F0C" />
        <Text style={AdminDashboardStyle.loadingText}>
          Loading dashboard data...
        </Text>
      </View>
    );
  }
  const navigateToTab = (tabName: string) => {
    // @ts-ignore - This is a workaround for the navigation type issue
    navigation.navigate(tabName);
  };

  return (
    <SafeAreaView style={AdminDashboardStyle.container}>
      <View style={AdminDashboardStyle.header}>
        <Text style={AdminDashboardStyle.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView
        style={AdminDashboardStyle.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <View style={AdminDashboardStyle.errorContainer}>
            <Text style={AdminDashboardStyle.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* Summary Cards */}
            <View style={AdminDashboardStyle.summaryContainer}>
              <View style={AdminDashboardStyle.summaryCard}>
                <FontAwesomeIcon icon={faUsers} size={24} color="#6EA9F7" />
                <Text style={AdminDashboardStyle.summaryValue}>
                  {stats?.totalUsers || 0}
                </Text>
                <Text style={AdminDashboardStyle.summaryLabel}>
                  Total Users
                </Text>
              </View>

              <View style={AdminDashboardStyle.summaryCard}>
                <FontAwesomeIcon icon={faUsers} size={24} color="#5CEA7E" />
                <Text style={AdminDashboardStyle.summaryValue}>
                  {stats?.activeUsers || 0}
                </Text>
                <Text style={AdminDashboardStyle.summaryLabel}>
                  Active Users
                </Text>
              </View>

              <View style={AdminDashboardStyle.summaryCard}>
                <FontAwesomeIcon icon={faUtensils} size={24} color="#FF5A63" />
                <Text style={AdminDashboardStyle.summaryValue}>
                  {stats?.totalRecommendations || 0}
                </Text>
                <Text style={AdminDashboardStyle.summaryLabel}>
                  Recommendations
                </Text>
              </View>
            </View>

            {/* Emotion Distribution */}
            <View style={AdminDashboardStyle.sectionContainer}>
              <Text style={AdminDashboardStyle.sectionTitle}>
                Emotion Distribution
              </Text>

              {/* Render Pie Chart */}
              {renderEmotionDistributionChart()}

              <View style={AdminDashboardStyle.emotionContainer}>
                {stats?.emotionDistribution &&
                  Object.entries(stats.emotionDistribution).map(
                    ([emotion, count], index) => (
                      <View key={index} style={AdminDashboardStyle.emotionItem}>
                        <View
                          style={[
                            AdminDashboardStyle.emotionIconContainer,
                            { backgroundColor: getEmotionColor(emotion) },
                          ]}
                        >
                          <FontAwesomeIcon
                            icon={getEmotionIcon(emotion)}
                            size={20}
                            color="white"
                          />
                        </View>
                        <Text style={AdminDashboardStyle.emotionLabel}>
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </Text>
                        <Text style={AdminDashboardStyle.emotionCount}>
                          {count}
                        </Text>
                      </View>
                    )
                  )}
              </View>
            </View>

            {/* Top Rated Foods */}
            <View style={AdminDashboardStyle.sectionContainer}>
              <Text style={AdminDashboardStyle.sectionTitle}>
                Top Rated Foods
              </Text>
              {stats?.topRatedFoods &&
                stats.topRatedFoods.map((food, index) => (
                  <View key={index} style={AdminDashboardStyle.foodItem}>
                    <View style={AdminDashboardStyle.foodInfo}>
                      <Text style={AdminDashboardStyle.foodName}>
                        {food.food}
                      </Text>
                      <View style={AdminDashboardStyle.foodMetaContainer}>
                        <View
                          style={[
                            AdminDashboardStyle.emotionBadge,
                            { backgroundColor: getEmotionColor(food.emotion) },
                          ]}
                        >
                          <Text style={AdminDashboardStyle.emotionBadgeText}>
                            {food.emotion}
                          </Text>
                        </View>
                        <Text style={AdminDashboardStyle.foodCount}>
                          {food.count} ratings
                        </Text>
                      </View>
                    </View>
                    <Text style={AdminDashboardStyle.foodRating}>
                      {food.rating.toFixed(1)}
                    </Text>
                  </View>
                ))}
            </View>

            {/* Insights Section */}
            <View style={AdminDashboardStyle.sectionContainer}>
              <Text style={AdminDashboardStyle.sectionTitle}>
                Mood-Food Insights
              </Text>

              <View style={AdminDashboardStyle.statRow}>
                <Text style={AdminDashboardStyle.statLabel}>
                  Most common emotion
                </Text>
                <Text style={AdminDashboardStyle.statValue}>
                  {stats?.emotionDistribution
                    ? Object.entries(stats.emotionDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .map(
                          ([emotion]) =>
                            emotion.charAt(0).toUpperCase() + emotion.slice(1)
                        )[0]
                    : "N/A"}
                </Text>
              </View>

              <View style={AdminDashboardStyle.statRow}>
                <Text style={AdminDashboardStyle.statLabel}>
                  Highest rated food type
                </Text>
                <Text style={AdminDashboardStyle.statValue}>
                  {stats?.topRatedFoods && stats.topRatedFoods.length > 0
                    ? stats.topRatedFoods[0].food_type
                    : "N/A"}
                </Text>
              </View>

              <View style={AdminDashboardStyle.statRow}>
                <Text style={AdminDashboardStyle.statLabel}>
                  Highest chosen meal time
                </Text>
                <Text style={AdminDashboardStyle.statValue}>
                  {stats?.mealTimeDistribution
                    ? Object.entries(stats.mealTimeDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .map(([mealTime]) => mealTime)[0]
                    : "N/A"}
                </Text>
              </View>

              <View style={AdminDashboardStyle.statRow}>
                <Text style={AdminDashboardStyle.statLabel}>
                  Average recommendation rating
                </Text>
                <Text style={AdminDashboardStyle.statValue}>
                  {stats?.averageRating
                    ? stats.averageRating.toFixed(1) + "/5"
                    : "N/A"}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
