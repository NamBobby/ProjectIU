import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Row from "../../components/rowBack";
import ResultStyle from "../../styles/resultStyle";
import { RootStackParamList } from "../../navigations/AppNavigator";
const facescan = require("../../assets/image/facescan.gif");

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Result"
>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;

const Result: React.FC = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const route = useRoute<ResultScreenRouteProp>();

  const [emotion, setEmotion] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the detected emotion from AsyncStorage
        const storedEmotion = await AsyncStorage.getItem("emotion");
        setEmotion(storedEmotion || "Unknown");

        // First try to get image URI from route params
        const paramImageUri = route.params?.capturedImageUri;

        if (paramImageUri) {
          // If available in route params, use it
          setCapturedImageUri(paramImageUri);
        } else {
          // Fallback to AsyncStorage if not in params
          const storedImageUri = await AsyncStorage.getItem("capturedImageUri");
          if (storedImageUri) {
            setCapturedImageUri(storedImageUri);
          }
        }

        // Save the timestamp when emotion was detected
        await AsyncStorage.setItem(
          "emotionTimestamp",
          new Date().toISOString()
        );
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setScanning(false);
      }
    };

    fetchData();
  }, [route.params]);

  const getCircleColor = () => {
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
        return "#D1D1D1"; // Default gray
    }
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  // Navigate to food recommendation
  const handleStartRecommend = () => {
    navigation.navigate("ChoosingPref");
  };

  return (
    <View style={ResultStyle.container}>
      <View style={ResultStyle.topinfo}>
        <View style={ResultStyle.info}>
          <Row />
        </View>
        <View style={ResultStyle.mainphoto}>
          <View style={ResultStyle.content}>
            <View style={ResultStyle.elipse2}>
              <View style={ResultStyle.elipse}>
                {scanning ? (
                  <ActivityIndicator
                    size="large"
                    color={getCircleColor()}
                    style={ResultStyle.img}
                  />
                ) : (
                  <Image
                    source={{ uri: capturedImageUri || facescan }}
                    style={ResultStyle.img}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={ResultStyle.bottominfo}>
        <View style={ResultStyle.circleChart}>
          {scanning ? (
            <View style={ResultStyle.circleChartPercentage}>
              <Text style={ResultStyle.scanningText}>Scanning...</Text>
            </View>
          ) : (
            <View style={ResultStyle.circleChartPercentage}>
              <View
                style={[
                  ResultStyle.contents,
                  { backgroundColor: getCircleColor() },
                ]}
              >
                <Text style={ResultStyle.resultText}>{emotion}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Add Start Recommendation button */}
        {!scanning && (
          <TouchableOpacity
            style={{
              backgroundColor: getCircleColor(),
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignSelf: "center",
              elevation: 2,
            }}
            onPress={handleStartRecommend}
          >
            <Text style={{ color: "#000000", fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
              Start Recommendation
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Result;
