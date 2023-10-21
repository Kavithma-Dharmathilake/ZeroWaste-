import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import Login from "../screens/Login";
import SignUp from "../screens/Sign Up";
import MainHome from "../screens/MainHome";
// import Vhome from "../screens/volunteer/Vhome";
// import Eventhome from "../screens/volunteer/eventhome";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="register" component={SignUp} />
        <Stack.Screen name="Home" component={MainHome} />
        {/* Volunteer Screens */}
        {/* <Stack.Screen name="VHome" component={Vhome} />
				<Stack.Screen name="Eventhome" component={Eventhome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
