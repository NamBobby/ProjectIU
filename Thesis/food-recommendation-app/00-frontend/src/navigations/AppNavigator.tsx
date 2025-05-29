import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../views/homePage/homePage";
import Shooting from "../views/shootingPage/shootingPage";
import Result from "../views/shootingPage/resultPage";
import Tracking from "../views/trackingPage/trackingPage";
import ChoosingPref from "../views/recommendPage/choosingPref";
import ResultFood from "../views/recommendPage/resultFood";

export type RootStackParamList = {
    Home: undefined;
    Shooting: undefined;
    Result: { capturedImageUri?: string }; 
    Tracking: undefined;
    ChoosingPref: undefined;
    ResultFood: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Shooting" component={Shooting} />
                <Stack.Screen name="Result" component={Result} />
                <Stack.Screen name="Tracking" component={Tracking} />
                <Stack.Screen name="ChoosingPref" component={ChoosingPref} />
                <Stack.Screen name="ResultFood" component={ResultFood} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;