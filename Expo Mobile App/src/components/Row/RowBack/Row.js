import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import RowStyle from "./styles/RowStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const Row = ({ navigation }) => {
  return (
          <View style={RowStyle.backmenu}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={RowStyle.rectangleA}>
                <FontAwesomeIcon icon="arrow-left" size={30} color="#EDD8E9" />
              </View>
            </TouchableOpacity>
          </View>
  );
};

export default Row;
