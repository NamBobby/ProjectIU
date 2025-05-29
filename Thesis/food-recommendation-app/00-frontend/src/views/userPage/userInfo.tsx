import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UserInfoStyle from "../../styles/userInfoStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const [userName, setUserName] = useState<string>("Guest");
  const [showSignOutButton, setShowSignOutButton] = useState(false);
  const { logout } = useAuth();

  // Lấy thông tin người dùng từ AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserName(parsedUser.name || "Guest");
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={UserInfoStyle.userInfo}>
      <TouchableOpacity
        style={UserInfoStyle.username}
        onPress={() => setShowSignOutButton(!showSignOutButton)}
      >
        <Text style={UserInfoStyle.userName}>{userName}</Text>
      </TouchableOpacity>
      {showSignOutButton && (
        <TouchableOpacity style={UserInfoStyle.signOutButton} onPress={handleLogout}>
          <Text style={UserInfoStyle.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInfo;
