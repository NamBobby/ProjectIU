import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import LoginStyle from './styles/LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { deleteAllData, initDatabase, addUser, getUserByEmailAndPassword, getUserByEmail } from '../../../database';

const Login = () => {

  const [showSignIn, setShowSignIn] = useState(true);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    //deleteAllData(); // Chạy khi muốn reset dữ liệu mặc định
    initDatabase(); // Khởi tạo cơ sở dữ liệu
  }, []);

  const handleToggle = () => {
    setShowSignIn(!showSignIn);
  };

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Alert', 'Please fill in all information.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Alert', 'The email is already in use.');
      return;
    }
    try {
      const user = await getUserByEmailAndPassword(email, password);
      if (user) {
        navigation.navigate('Home', { user: { name: user.name, email, userId: user.userId } });
      } else {
        Alert.alert('Alert', 'Email or password is wrong.');
      }
    } catch (error) {
      console.log('Failed to get user information.', error);
    }
  };

  const handleSignUp = async () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Alert', 'Please fill in all information.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Alert', 'Email address is invalid.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Alert', 'Password must have at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Alert', 'The password confirmation does not match.');
      return;
    }
    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        Alert.alert('Alert', 'The email is already in use.');
      } else {
        await addUser(name, email, password);
        setShowSignIn(true);
      }
    } catch (error) {
      console.log('Failed to get user information.', error);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={LoginStyle.container}>
      <View style={LoginStyle.topinfo}>
        <View style={LoginStyle.khung}>
          <Text style={LoginStyle.textkhung}>Acne Checker</Text>
        </View>
        {showSignIn ? (
          <View style={LoginStyle.inputContainer}>
            <Text style={LoginStyle.texttitle}>Please fill your details to sign in.</Text>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Email</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Password</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={LoginStyle.showPasswordButton} onPress={toggleShowPassword}>
                  <Text style={LoginStyle.text}>
                    {showPassword ?
                      (<FontAwesomeIcon icon="eye" size={25} color="#EDD8E9" />
                      ) : (
                        <FontAwesomeIcon icon="eye-slash" size={25} color="#EDD8E9" />
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={LoginStyle.buttonIn} onPress={handleSignIn}>
              <Text style={LoginStyle.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
        ) : (
          <View style={LoginStyle.inputContainer}>
            <Text style={LoginStyle.texttitle}>Please fill your details to sign up.</Text>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Username</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Username"
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Email</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Password</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={LoginStyle.showPasswordButton} onPress={toggleShowPassword}>
                  <Text style={LoginStyle.text}>
                    {showPassword ?
                      (<FontAwesomeIcon icon="eye" size={25} color="#EDD8E9" />
                      ) : (
                        <FontAwesomeIcon icon="eye-slash" size={25} color="#EDD8E9" />
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={LoginStyle.inputText}>
              <Text style={LoginStyle.text}>Password Confirm</Text>
              <View style={LoginStyle.inputkhung}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Password Confirm"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity style={LoginStyle.showPasswordButton} onPress={toggleShowConfirmPassword}>
                  <Text style={LoginStyle.text}>
                    {showConfirmPassword ?
                      (<FontAwesomeIcon icon="eye" size={25} color="#EDD8E9" />
                      ) : (
                        <FontAwesomeIcon icon="eye-slash" size={25} color="#EDD8E9" />
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={LoginStyle.buttonUp} onPress={handleSignUp}>
              <Text style={LoginStyle.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={LoginStyle.toggleButton} onPress={handleToggle}>
          <Text style={LoginStyle.toggleButtonText}>
            {showSignIn ? (
              <Text style={LoginStyle.text}>Don't have an account? <Text style={LoginStyle.textsignIn}>Sign Up</Text></Text>
            )
              :
              (
                <Text style={LoginStyle.text}>Already have an account? <Text style={LoginStyle.textsignUp}>Sign In</Text></Text>
              )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
