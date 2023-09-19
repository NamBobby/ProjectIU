import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles/UserInfoStyle.js";

const UserInfo = ({ userName, handleSignOut }) => {

  const [showSignOutButton, setShowSignOutButton] = React.useState(false);

  return (
    
    <View style={styles.userInfo}>    
      <TouchableOpacity
      style={styles.username}
      onPress={() => setShowSignOutButton(!showSignOutButton)}
      >
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
    {showSignOutButton && (
      <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInfo;
