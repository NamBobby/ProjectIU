import React from "react";
import { View, TouchableOpacity } from "react-native";
import RowStyle from "../styles/rowbackStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/AppNavigator";

type RowBackNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Row: React.FC = () => {
  const navigation = useNavigation<RowBackNavigationProp>();

  return (
    <View style={RowStyle.backmenu}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={RowStyle.rectangleA}>
          <FontAwesomeIcon icon="arrow-left" size={40} color="#E39F0C" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Row;
