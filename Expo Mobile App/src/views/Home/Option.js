import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles/Homepage.styles.js";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Option = ({ onPressShooting, onPressTracking, onPressInstruction}) => {
  return (
    <View style={styles.option}>
      <View style={styles.rectangle}>
        <TouchableOpacity onPress={onPressShooting}>
          <View style={styles.icon}>
            <FontAwesomeIcon icon="magnifying-glass" size={30} color="#535773" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rectangle}>
        <TouchableOpacity onPress={onPressTracking}>
          <View style={styles.icon}>
            <FontAwesomeIcon icon="chart-line" size={30} color="#535773" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Option;
