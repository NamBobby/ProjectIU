import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import LoginStyle from "../../styles/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../context/AuthContext";

// Define routes in AuthNavigator
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all information.");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <View style={LoginStyle.container}>
      <View style={LoginStyle.topinfo}>
        <View style={LoginStyle.frame}>
          <Text style={LoginStyle.textframe}>C&Y</Text>
        </View>
        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.texttitle}>
            Please fill your detail to access your account.
          </Text>
          <View style={LoginStyle.inputText}>
            <Text style={LoginStyle.text}>Email</Text>
            <View style={LoginStyle.inputframe}>
              <TextInput
                style={LoginStyle.input}
                placeholder="Email"
                placeholderTextColor={LoginStyle.inputPlaceholder.color} 
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={LoginStyle.inputText}>
            <Text style={LoginStyle.text}>Password</Text>
            <View style={LoginStyle.inputframe}>
              <TextInput
                style={LoginStyle.input}
                placeholder="Password"
                placeholderTextColor={LoginStyle.inputPlaceholder.color}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity
                style={LoginStyle.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? "eye" : "eye-slash"}
                  size={25}
                  color="#D0D5DD"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            style={[LoginStyle.buttonIn, isLoading && { opacity: 0.7 }]} 
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={LoginStyle.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={LoginStyle.text}>
            Don't have an account?{" "}
            <Text style={LoginStyle.textsignIn}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;