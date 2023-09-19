import React from "react";
import { View, Text } from "react-native";
import styles from "./styles/Homepage.styles.js";
import { useNavigation, useRoute } from '@react-navigation/native';

import UserInfo from "../../components/UserInfo/UserInfo.js";
import Option from "./Option.js";

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  console.log(user.name); // Tên người dùng
  console.log(user.email); // Email người dùng
  console.log(user.userId); // userId người dùng

  const navigateToShooting = () => {
    navigation.navigate("Shooting", { user: route.params.user });
  };

  const navigateToTracking = () => {
    navigation.navigate("Tracking", { user: route.params.user });
  };

  const handleSignOut = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topinfo}>
        <View style={styles.info}>
          <UserInfo userName={user.name} handleSignOut={handleSignOut} />
        </View>
        <View style={styles.khung}>
          <Text style={styles.textkhung}>Acne Checker</Text>
        </View>
        <View style={styles.buttonmenu}>
          <Option
            onPressShooting={navigateToShooting}
            onPressTracking={navigateToTracking}
          />
        </View>
      </View>
    </View>
  );
}
