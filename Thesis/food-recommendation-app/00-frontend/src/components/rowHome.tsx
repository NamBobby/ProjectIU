import React from "react";
import { View, TouchableOpacity } from "react-native";
import RowStyle from "../styles/rowhomeStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/AppNavigator";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface RowProps {
  handleHome?: () => void; 
}

const Row: React.FC<RowProps> = ({ handleHome }) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const navigateToHome = () => {
    // Reset navigation stack and go to Home screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  const onPressHome = handleHome || navigateToHome;

  return (
    <View style={RowStyle.backmenu}>
      <TouchableOpacity onPress={onPressHome} activeOpacity={0.5}>
        <View style={RowStyle.rectangleA}>
          <FontAwesomeIcon icon="home" size={40} color="#E39F0C" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Row;