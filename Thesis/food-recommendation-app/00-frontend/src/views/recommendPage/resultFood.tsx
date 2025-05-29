import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faStar,
  faInfoCircle,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../../navigations/AppNavigator";
import {
  getFoodRecommendations,
  selectFood,
  rateFood,
  getFoodExplanation,
} from "../../services/api";
import Row from "../../components/rowBack";
import ResultFoodStyle from "../../styles/resultFoodStyle";

// Extended interfaces
interface NutrientExplanation {
  name: string;
  value: number;
  explanation: string;
}

interface Recommendation {
  food: string;
  type: string;
  nutrition_data: Record<string, number>;
  image_url?: string;
}

interface ExplanationResponse {
  food_name: string;
  food_type: string;
  emotion_explanation: string;
  food_explanation: string;
  priority_nutrients: NutrientExplanation[];
  scientific_summary: string;
}

type ResultFoodNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResultFood"
>;

const ResultFood: React.FC = () => {
  const navigation = useNavigation<ResultFoodNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string>("neutral");
  const [mealTime, setMealTime] = useState<string>("Lunch");
  const [foodType, setFoodType] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(
    null
  );
  const [loadingExplanation, setLoadingExplanation] = useState<boolean>(true);
  const [logId, setLogId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [priorityNutrients, setPriorityNutrients] = useState<string[]>([]);
  const [loadingNutrients, setLoadingNutrients] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedNutrient, setSelectedNutrient] =
    useState<NutrientExplanation | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [savingRecommendation, setSavingRecommendation] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get saved preferences from AsyncStorage
        const storedEmotion = await AsyncStorage.getItem("emotion");
        const storedFoodType = await AsyncStorage.getItem("foodType");
        const storedMealTime = await AsyncStorage.getItem("mealTime");

        if (storedEmotion) setEmotion(storedEmotion);
        if (storedFoodType) setFoodType(storedFoodType);
        if (storedMealTime) setMealTime(storedMealTime);

        // Get recommendations from API
        const response = await getFoodRecommendations(
          storedEmotion || "neutral",
          storedMealTime || "Lunch",
          storedFoodType || undefined
        );

        if (!response) {
          setError("Empty response from server");
          return;
        }

        // Process API response
        if (response.status === "success") {
          // Set username if available
          if (response.user_name) {
            setUserName(response.user_name);
          }

          // Set recommendation
          if (response.recommendation) {
            // Clean up the recommendation to remove image_url from nutrition_data
            if (response.recommendation.nutrition_data && 
                response.recommendation.nutrition_data.image_url) {
              delete response.recommendation.nutrition_data.image_url;
            }
            
            setRecommendation(response.recommendation);

            // Get explanation for this recommendation - do this in background
            fetchExplanation(
              response.recommendation,
              storedEmotion || "neutral"
            );
          } else {
            setError("No recommendations found");
          }

          // Set priority nutrients
          if (response.priority_nutrients) {
            setPriorityNutrients(response.priority_nutrients);
            setLoadingNutrients(false);
          }
          
          // Turn off main loading - don't wait for image or explanation
          setLoading(false);
        } else {
          setError("Invalid response format");
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to get food recommendations. Please try again.");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const fetchExplanation = async (
    recommendation: Recommendation,
    emotion: string
  ) => {
    try {
      setLoadingExplanation(true);
      const explanationData = await getFoodExplanation(recommendation, emotion);
      setExplanation(explanationData);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      // Continue without explanation if there's an error
    } finally {
      setLoadingExplanation(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRating = async (rating: number) => {
    setUserRating(rating);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHasRated(true);
    
    // No API call here, we'll save when user clicks "Save & Continue"
  };

  const handleSaveRecommendation = async () => {
    if (!recommendation) {
      Alert.alert("Error", "No recommendation to save");
      return;
    }

    try {
      setSavingRecommendation(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Get saved preferences from AsyncStorage
      const storedEmotion = await AsyncStorage.getItem("emotion") || emotion;
      const storedMealTime = await AsyncStorage.getItem("mealTime") || mealTime;
      const storedFoodType = await AsyncStorage.getItem("foodType") || foodType || "";

      // Create log entry with rating
      const response = await rateFood(
        userRating,
        storedEmotion,
        storedMealTime,
        storedFoodType,
        recommendation.food
      );

      if (response && response.log_id) {
        setLogId(response.log_id);
      }

      Alert.alert("Success", "Food recommendation saved to your profile!", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error: any) {
      console.error("Error saving recommendation:", error);
      Alert.alert("Error", "Failed to save recommendation");
    } finally {
      setSavingRecommendation(false);
    }
  };

  const showNutrientDetail = (nutrient: NutrientExplanation) => {
    setSelectedNutrient(nutrient);
    setModalVisible(true);
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

  // Check if nutrient value is meaningfully greater than zero
  const hasNonZeroValue = (nutrientName: string, value: number): boolean => {
    // Convert to number
    const numValue = Number(value);

    // Use a small but meaningful threshold to filter out trace amounts
    return numValue > 0.01;
  };

  // Helper for checking if a nutrient string matches a priority nutrient name
  const isPriorityNutrientMatch = (
    nutrient: string,
    priorityNutrient: string
  ) => {
    // Exact match
    if (nutrient.toLowerCase() === priorityNutrient.toLowerCase()) {
      return true;
    }

    // Contains match (but avoid B1/B2/etc. confusion)
    if (nutrient.toLowerCase().includes(priorityNutrient.toLowerCase())) {
      // Make sure it's not a prefix of another vitamin (e.g. B1 vs B11)
      const regex = new RegExp(
        `${priorityNutrient.toLowerCase()}(\\d+|$)`,
        "i"
      );
      if (!regex.test(nutrient.toLowerCase())) {
        return true;
      }
    }

    return false;
  };

  // Helper function to check if a nutrient is a priority
  const isPriorityNutrient = (nutrient: string) => {
    if (!priorityNutrients || priorityNutrients.length === 0) return false;

    return priorityNutrients.some((pn) =>
      isPriorityNutrientMatch(nutrient, pn)
    );
  };

  // Get explanation for a nutrient
  const getNutrientExplanation = (nutrient: string) => {
    if (!explanation || !explanation.priority_nutrients) return null;

    return explanation.priority_nutrients.find((pn) =>
      isPriorityNutrientMatch(nutrient, pn.name)
    );
  };

  // Function to get appropriate unit for a nutrient
  const getNutrientUnit = (nutrientName: string) => {
    if (nutrientName === "Caloric Value") return "kcal";
    return "mg";
  };

  // Helper to find a matching nutrient key that has a non-zero value
  const findNonZeroNutrientKey = (nutrientName: string) => {
    if (!recommendation || !recommendation.nutrition_data) return null;

    // Find all matching keys
    const matchingKeys = Object.keys(recommendation.nutrition_data).filter(
      (key) => isPriorityNutrientMatch(key, nutrientName)
    );

    // Return the first key that has a non-zero value
    return (
      matchingKeys.find((key) =>
        hasNonZeroValue(key, recommendation.nutrition_data[key])
      ) || null
    );
  };

  if (loading) {
    return (
      <View style={[ResultFoodStyle.container, ResultFoodStyle.centerContainer]}>
        <ActivityIndicator size="large" color={getEmotionColor()} />
        <Text style={ResultFoodStyle.loadingText}>
          Finding the perfect food for your mood...
        </Text>
      </View>
    );
  }

  if (error || !recommendation) {
    return (
      <View style={[ResultFoodStyle.container, ResultFoodStyle.centerContainer]}>
        <Text style={ResultFoodStyle.errorText}>
          {error || "No recommendations found."}
        </Text>
        <TouchableOpacity
          style={[
            ResultFoodStyle.actionButton,
            { backgroundColor: getEmotionColor(), marginTop: 20 },
          ]}
          onPress={handleBack}
        >
          <Text style={ResultFoodStyle.actionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Debug logging
  console.log("Recommendation nutrition data:", recommendation.nutrition_data);
  console.log("Priority nutrients:", priorityNutrients);

  // Filter priority nutrients to only those with non-zero values
  const nonZeroPriorityNutrients = priorityNutrients.filter(
    (nutrient) => findNonZeroNutrientKey(nutrient) !== null
  );

  return (
    <View style={ResultFoodStyle.container}>
      <View style={ResultFoodStyle.info}>
        <Row />
      </View>
      {/* User greeting */}
      <View style={ResultFoodStyle.userGreeting}>
        <Text style={ResultFoodStyle.userGreetingText}>
          Hey{userName ? ` ${userName}` : ""}! Based on your
          <Text style={[ResultFoodStyle.highlightText, { color: getEmotionColor() }]}>
            {" "}
            {emotion}{" "}
          </Text>
          mood, here's what we recommend for
          <Text style={ResultFoodStyle.highlightText}> {mealTime}</Text>
        </Text>
      </View>

      <ScrollView style={ResultFoodStyle.scrollContent}>
        {/* Main food card */}
        <View style={ResultFoodStyle.mainFoodCard}>
          <View style={ResultFoodStyle.mainFoodImageContainer}>
            <Image
              source={{
                uri: recommendation.image_url ||
                  `https://via.placeholder.com/400/${getEmotionColor().substring(
                    1
                  )}/FFFFFF?text=${encodeURIComponent(recommendation.food)}`,
              }}
              style={ResultFoodStyle.mainFoodImage}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            {imageLoading && (
              <View style={ResultFoodStyle.imageLoadingOverlay}>
                <ActivityIndicator size="large" color={getEmotionColor()} />
              </View>
            )}
          </View>

          <View style={ResultFoodStyle.mainFoodDetails}>
            <View style={ResultFoodStyle.foodTitleRow}>
              <Text style={ResultFoodStyle.mainFoodName}>{recommendation.food}</Text>
            </View>

            <Text style={ResultFoodStyle.foodType}>
              {recommendation.type.charAt(0).toUpperCase() +
                recommendation.type.slice(1)}
            </Text>

            {/* Scientific explanation - new section */}
            {explanation && (
              <View
                style={[
                  ResultFoodStyle.explanationSection,
                  { borderLeftColor: getEmotionColor() },
                ]}
              >
                <Text style={ResultFoodStyle.explanationTitle}>
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    size={16}
                    color={getEmotionColor()}
                  />
                  How this helps your {emotion} mood:
                </Text>
                <Text style={ResultFoodStyle.explanationText}>
                  {explanation.emotion_explanation}
                </Text>

                {explanation.scientific_summary && (
                  <Text style={ResultFoodStyle.scientificSummary}>
                    {explanation.scientific_summary}
                  </Text>
                )}
              </View>
            )}

            {/* Priority nutrients section - enhanced version */}
            {nonZeroPriorityNutrients.length > 0 ? (
              <View style={ResultFoodStyle.priorityNutrientsContainer}>
                <Text
                  style={[
                    ResultFoodStyle.priorityNutrientTitle,
                    { color: getEmotionColor() },
                  ]}
                >
                  Key Nutrients for{" "}
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)} Mood:
                </Text>

                {nonZeroPriorityNutrients.map((nutrientName, index) => {
                  // Find the matching nutrient key with non-zero value
                  const nutrientKey = findNonZeroNutrientKey(nutrientName);

                  // Skip if no matching key or zero value
                  if (!nutrientKey) return null;

                  const nutrientValue =
                    recommendation.nutrition_data[nutrientKey];
                  const nutrientExp = explanation?.priority_nutrients?.find(
                    (pn) => isPriorityNutrientMatch(nutrientKey, pn.name)
                  );

                  return (
                    <TouchableOpacity
                      key={index}
                      style={ResultFoodStyle.priorityNutrientItem}
                      onPress={() =>
                        nutrientExp && showNutrientDetail(nutrientExp)
                      }
                      disabled={!nutrientExp}
                    >
                      <View style={ResultFoodStyle.priorityNutrientHeader}>
                        <Text style={ResultFoodStyle.priorityNutrientName}>
                          {nutrientName}
                        </Text>
                        {nutrientExp && (
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size={16}
                            color={getEmotionColor()}
                          />
                        )}
                      </View>
                      <Text style={ResultFoodStyle.priorityNutrientValue}>
                        {typeof nutrientValue === "number"
                          ? nutrientValue.toFixed(1)
                          : nutrientValue}{" "}
                        {getNutrientUnit(nutrientKey)}
                      </Text>
                      {nutrientExp && (
                        <Text
                          style={ResultFoodStyle.priorityNutrientShortDesc}
                          numberOfLines={2}
                        >
                          {nutrientExp.explanation}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              !loadingNutrients && (
                <View style={ResultFoodStyle.priorityNutrientSection}>
                  <Text
                    style={[
                      ResultFoodStyle.priorityNutrientTitle,
                      { color: getEmotionColor() },
                    ]}
                  >
                    No specific key nutrients found for this mood
                  </Text>
                </View>
              )
            )}

            {/* Rate this recommendation */}
            {!hasRated && (
              <View style={ResultFoodStyle.ratingContainer}>
                <Text style={ResultFoodStyle.ratingLabel}>
                  Rate this recommendation:
                </Text>
                <View style={ResultFoodStyle.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRating(star)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        size={24}
                        color={userRating >= star ? "#FFC107" : "#E5E7EB"}
                        style={ResultFoodStyle.starIcon}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {hasRated && (
              <View style={ResultFoodStyle.ratedContainer}>
                <Text style={ResultFoodStyle.ratedText}>
                  Thanks for your rating of {userRating}/5!
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Complete Nutritional information */}
        <View style={ResultFoodStyle.nutritionSection}>
          <Text style={ResultFoodStyle.sectionTitle}>
            Complete Nutritional Information
          </Text>
          <View style={ResultFoodStyle.nutrientsGrid}>
            {recommendation.nutrition_data &&
              Object.entries(recommendation.nutrition_data)
                // Filter out non-nutrient properties
                .filter(([name, _]) => name !== "food" && name !== "food_type" && name !== "image_url")
                .sort((a, b) => {
                  // First check if both are priority nutrients
                  const aIsPriority =
                    isPriorityNutrient(a[0]) &&
                    hasNonZeroValue(a[0], Number(a[1]));
                  const bIsPriority =
                    isPriorityNutrient(b[0]) &&
                    hasNonZeroValue(b[0], Number(b[1]));

                  // If both or neither are priority, use natural ordering
                  if (aIsPriority === bIsPriority) {
                    if (aIsPriority) {
                      // Both are priority nutrients - sort by their position in priorityNutrients array
                      const aIndex = priorityNutrients.findIndex((pn) =>
                        isPriorityNutrientMatch(a[0], pn)
                      );

                      const bIndex = priorityNutrients.findIndex((pn) =>
                        isPriorityNutrientMatch(b[0], pn)
                      );

                      if (aIndex !== -1 && bIndex !== -1) {
                        return aIndex - bIndex;
                      }
                    }

                    // If neither are priority or indices couldn't be determined, alphabetical
                    return a[0].localeCompare(b[0]);
                  }

                  // One is priority, one isn't
                  return aIsPriority ? -1 : 1;
                })
                .map(([name, value], index) => {
                  // Only mark as priority if value > 0
                  const isPriority =
                    isPriorityNutrient(name) &&
                    hasNonZeroValue(name, Number(value));
                  const nutrientExp = getNutrientExplanation(name);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        ResultFoodStyle.nutrientItem,
                        isPriority && ResultFoodStyle.nutrientItemPriority,
                      ]}
                      onPress={() =>
                        nutrientExp && showNutrientDetail(nutrientExp)
                      }
                      disabled={!nutrientExp}
                    >
                      <Text style={ResultFoodStyle.nutrientName}>{name}</Text>
                      <Text style={ResultFoodStyle.nutrientValue}>
                        {typeof value === "number" ? value.toFixed(1) : value}
                        <Text style={ResultFoodStyle.nutrientUnit}>
                          {getNutrientUnit(name)}
                        </Text>
                      </Text>
                      {isPriority && (
                        <Text
                          style={[
                            ResultFoodStyle.priorityLabel,
                            { color: getEmotionColor() },
                          ]}
                        >
                          KEY FOR {emotion.toUpperCase()}
                          {nutrientExp && " ℹ️"}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
          </View>
        </View>
      </ScrollView>

      {/* Nutrient detail modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ResultFoodStyle.modalContainer}>
          <View style={ResultFoodStyle.modalContent}>
            <View style={ResultFoodStyle.modalHeader}>
              <Text style={ResultFoodStyle.modalTitle}>Nutrient Details</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={ResultFoodStyle.modalCloseButton}
              >
                <Text style={ResultFoodStyle.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>

            {selectedNutrient && (
              <View style={ResultFoodStyle.modalBody}>
                <Text style={ResultFoodStyle.modalNutrientName}>
                  {selectedNutrient.name}
                </Text>
                <Text style={ResultFoodStyle.modalNutrientValue}>
                  {selectedNutrient.value.toFixed(1)}{" "}
                  {getNutrientUnit(selectedNutrient.name)} in this{" "}
                  {recommendation.type}
                </Text>

                <View style={ResultFoodStyle.modalDivider} />

                <Text style={ResultFoodStyle.modalSectionTitle}>
                  How it helps your {emotion} mood:
                </Text>
                <Text style={ResultFoodStyle.modalExplanation}>
                  {selectedNutrient.explanation}
                </Text>

                <View style={ResultFoodStyle.modalDivider} />

                <Text style={ResultFoodStyle.modalSectionTitle}>
                  Research-backed benefits:
                </Text>
                <Text style={ResultFoodStyle.modalResearch}>
                  Studies have shown that {selectedNutrient.name} can
                  significantly impact your emotional state, especially when
                  experiencing {emotion} moods.
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Footer action buttons - show save button only after rating */}
      {hasRated && (
        <View style={ResultFoodStyle.footer}>
          <TouchableOpacity
            style={[
              ResultFoodStyle.footerSaveButton,
              { backgroundColor: getEmotionColor() },
            ]}
            onPress={handleSaveRecommendation}
            disabled={savingRecommendation}
          >
            {savingRecommendation ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <FontAwesomeIcon icon={faFloppyDisk} size={20} color="white" />
                <Text style={[ResultFoodStyle.footerButtonText, { color: "white" }]}>
                  Save & Continue
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ResultFood;