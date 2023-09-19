import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faArrowLeft, faCameraRotate, faCamera, faMagnifyingGlass, faImage, faFloppyDisk, faChartLine, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Home from './src/views/Home/Home';
import Shooting from './src/views/Shooting/Shooting';
import Result from './src/views/Result/Result';
import Tracking from './src/views/Tracking/Tracking';
import Login from './src/views/Login/Login';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render a loading state or fallback component here if desired
  }

  library.add(faHome, faArrowLeft, faCameraRotate, faCamera, faMagnifyingGlass, faImage, faFloppyDisk, faChartLine, faEye, faEyeSlash);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Shooting" component={Shooting} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Tracking" component={Tracking} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}






