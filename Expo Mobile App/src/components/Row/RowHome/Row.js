import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import RowStyle from "./styles/RowStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



const Row = ({ handleHome }) => {
  return (
          <View style={RowStyle.backmenu}>
            <TouchableOpacity onPress={handleHome}>
              <View style={RowStyle.rectangleA}>
                <FontAwesomeIcon icon="home" size={30} color="#EDD8E9" />
              </View>
            </TouchableOpacity>
          </View>
  );
};

export default Row;
