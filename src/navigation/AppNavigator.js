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
import Vhome from "../screens/volunteer/Vhome";
// import Eventhome from "../screens/volunteer/eventhome";
import WasteMgtSplash from "../screens/wasteManagement/wasteMgtSplash";
import WasteMgtHome from "../screens/wasteManagement/wasteMgtHome";
import SchedulePickUp from "../screens/wasteManagement/SchedulePickUp";
import ViewSchedule from "../screens/wasteManagement/ViewSchedule";
import BinSummary from "../screens/wasteManagement/BinSummary";
import UpdateDetailsPopup from "../screens/wasteManagement/UpdateDetailsPopup";
import NearestBin from "../screens/wasteManagement/NearestBin";
import WasteMgtDriverHome from "../screens/wasteManagement/WasteMgtDriverHome";
import Notification from "../screens/wasteManagement/notification";
import MapView from "../screens/wasteManagement/MapView";


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
				<Stack.Screen name="VHome" component={Vhome} />
				{/* <Stack.Screen name="Eventhome" component={Eventhome} /> */}

				<Stack.Screen name="WasteMgtSplash" component={WasteMgtSplash} />
                <Stack.Screen name="WasteMgtHome" component={WasteMgtHome} />
         		<Stack.Screen name="SchedulePickUp" component={SchedulePickUp} />
				<Stack.Screen name="ViewSchedule" component={ViewSchedule} />
				<Stack.Screen name="BinSummary" component={BinSummary} />
				<Stack.Screen name="UpdateDetailsPopup" component={UpdateDetailsPopup} />
				<Stack.Screen name="NearestBin" component={NearestBin} />
				<Stack.Screen name="WasteMgtDriverHome" component={WasteMgtDriverHome} />
				<Stack.Screen name="Notification" component={Notification} />
				<Stack.Screen name="MapView" component={MapView} />

			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
