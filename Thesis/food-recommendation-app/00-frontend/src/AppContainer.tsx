import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from './context/AuthContext';

import AppNavigator from './navigations/AppNavigator';
import AdminNavigator from './navigations/AdminNavigator';
import LoginScreen from './views/authPage/LoginScreen';

const AppContainer = () => {
  const { user, isLoading, isAuthenticated, checkAuth } = useAuth();

  // Force check authentication when component mounts
  useEffect(() => {
    // This ensures we always check auth status on app start
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6ea9f7" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  // Always show login screen if not authenticated
  // This ensures Login is the first screen users see unless they're already logged in
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Only show these navigators if already authenticated
  if (user?.role === 'admin') {
    console.log("👑 Showing AdminNavigator for admin user");
    return <AdminNavigator />;
  }

  // Otherwise show regular app navigator
  console.log("👤 Showing AppNavigator for regular user");
  return <AppNavigator />;
};

export default AppContainer;