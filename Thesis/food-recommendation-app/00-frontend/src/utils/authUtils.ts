import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";

export const checkUserRole = async (navigation: NavigationProp<any>) => {
  try {
    const userDataString = await AsyncStorage.getItem("user");
    if (!userDataString) {
      navigation.navigate("Login");
      return;
    }
    
    const userData = JSON.parse(userDataString);
    
    // Redirect based on role
    if (userData.role === "admin") {
      navigation.navigate("AdminDashboard");
    } else {
      navigation.navigate("Home");
    }
  } catch (error) {
    console.error("Error checking user role:", error);
    navigation.navigate("Login");
  }
};