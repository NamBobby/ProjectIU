import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFilter,
  faChartBar,
  faList,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { apiClient } from "../../services/api";
import FoodTrendsStyle from "../../styles/foodTrendsStyle";

import FoodTrendFilters from "../../components/foodTrendFilters";
import FoodTrendCharts from "../../components/foodTrendCharts";
import FoodTrendInsights from "../../components/foodTrendInsights";
import FoodTrendList from "../../components/foodTrendList";
import { FoodTrendItem } from "../../components/types";

const FoodTrends: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trends, setTrends] = useState<FoodTrendItem[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [emotionFilter, setEmotionFilter] = useState<string>("all");
  const [mealTimeFilter, setMealTimeFilter] = useState<string>("all");
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("all");
  const [filteredTrends, setFilteredTrends] = useState<FoodTrendItem[]>([]);
  const [activeTab, setActiveTab] = useState<"chart" | "list" | "insights">(
    "chart"
  );
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [trends, emotionFilter, mealTimeFilter, foodTypeFilter]);

  const fetchTrends = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.get("/api/admin/food-trends");

      if (response.data && response.data.status === "success") {
        setTrends(response.data.trends);
      }
    } catch (error: any) {
      console.error("Error fetching food trends:", error);
      setError("Failed to load food trends. Pull down to refresh.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrends();
  };

  const applyFilters = () => {
    let filtered = [...trends];

    if (emotionFilter !== "all") {
      filtered = filtered.filter((item) => item.emotion === emotionFilter);
    }

    if (mealTimeFilter !== "all") {
      filtered = filtered.filter((item) => item.meal_time === mealTimeFilter);
    }

    if (foodTypeFilter !== "all") {
      filtered = filtered.filter((item) => item.food_type === foodTypeFilter);
    }

    setFilteredTrends(filtered);
  };

  const resetFilters = () => {
    setEmotionFilter("all");
    setMealTimeFilter("all");
    setFoodTypeFilter("all");
  };

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={FoodTrendsStyle.loadingContainer}>
          <ActivityIndicator size="large" color="#E39F0C" />
          <Text style={FoodTrendsStyle.loadingText}>
            Loading food trends...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={FoodTrendsStyle.errorContainer}>
          <Text style={FoodTrendsStyle.errorText}>{error}</Text>
        </View>
      );
    }

    switch (activeTab) {
      case "chart":
        return <FoodTrendCharts filteredTrends={filteredTrends} />;
      case "list":
        return (
          <FoodTrendList
            filteredTrends={filteredTrends}
            scrollEnabled={false}
          />
        );
      case "insights":
        return (
          <FoodTrendInsights
            filteredTrends={filteredTrends}
            emotionFilter={emotionFilter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={FoodTrendsStyle.container}>
      <View style={FoodTrendsStyle.header}>
        <Text style={FoodTrendsStyle.headerTitle}>Food Trends</Text>
        <View style={FoodTrendsStyle.filterBar}>
          <TouchableOpacity
            style={FoodTrendsStyle.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <FontAwesomeIcon icon={faFilter} size={16} color="#374151" />
            <Text style={FoodTrendsStyle.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          {(emotionFilter !== "all" ||
            mealTimeFilter !== "all" ||
            foodTypeFilter !== "all") && (
            <TouchableOpacity
              style={[
                FoodTrendsStyle.filterButton,
                { backgroundColor: "#FEE2E2" },
              ]}
              onPress={resetFilters}
            >
              <Text style={FoodTrendsStyle.filterButtonText}>
                Clear Filters
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={FoodTrendsStyle.tabContainer}>
        <TouchableOpacity
          style={[
            FoodTrendsStyle.tab,
            activeTab === "chart" && FoodTrendsStyle.activeTab,
          ]}
          onPress={() => setActiveTab("chart")}
        >
          <FontAwesomeIcon
            icon={faChartBar}
            size={18}
            color={activeTab === "chart" ? "#E39F0C" : "#6B7280"}
          />
          <Text
            style={[
              FoodTrendsStyle.tabText,
              activeTab === "chart" && FoodTrendsStyle.activeTabText,
            ]}
          >
            Charts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            FoodTrendsStyle.tab,
            activeTab === "list" && FoodTrendsStyle.activeTab,
          ]}
          onPress={() => setActiveTab("list")}
        >
          <FontAwesomeIcon
            icon={faList}
            size={18}
            color={activeTab === "list" ? "#E39F0C" : "#6B7280"}
          />
          <Text
            style={[
              FoodTrendsStyle.tabText,
              activeTab === "list" && FoodTrendsStyle.activeTabText,
            ]}
          >
            List View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            FoodTrendsStyle.tab,
            activeTab === "insights" && FoodTrendsStyle.activeTab,
          ]}
          onPress={() => setActiveTab("insights")}
        >
          <FontAwesomeIcon
            icon={faLightbulb}
            size={18}
            color={activeTab === "insights" ? "#E39F0C" : "#6B7280"}
          />
          <Text
            style={[
              FoodTrendsStyle.tabText,
              activeTab === "insights" && FoodTrendsStyle.activeTabText,
            ]}
          >
            Insights
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main scrollable content area */}
      <ScrollView
        style={{ flex: 1 }}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={FoodTrendsStyle.sectionContainer}>{renderContent()}</View>

        {!loading && (
          <TouchableOpacity
            style={FoodTrendsStyle.refreshButton}
            onPress={onRefresh}
            disabled={refreshing}
          >
            <Text style={FoodTrendsStyle.refreshButtonText}>
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FoodTrendFilters
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        emotionFilter={emotionFilter}
        setEmotionFilter={setEmotionFilter}
        mealTimeFilter={mealTimeFilter}
        setMealTimeFilter={setMealTimeFilter}
        foodTypeFilter={foodTypeFilter}
        setFoodTypeFilter={setFoodTypeFilter}
        resetFilters={resetFilters}
      />
    </SafeAreaView>
  );
};

export default FoodTrends;
