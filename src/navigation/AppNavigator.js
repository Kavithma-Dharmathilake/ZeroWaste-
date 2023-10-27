import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/Sign Up";
import MainHome from "../screens/MainHome";

// Volunteer
import Vhome from "../screens/volunteer/Vhome";
import Eventhome from "../screens/volunteer/Events";
import VProfile from "../screens/volunteer/VProfile";
import AllBlogs from "../screens/volunteer/AllBlogs";
import AllCommunity from "../screens/volunteer/AllCommunity";
import AllReminders from "../screens/volunteer/AllReminders";
import EventDetails from "../screens/volunteer/EventDetails";
import CommunityDetails from "../screens/volunteer/CommunityDetails";
import BlogDetails from "../screens/volunteer/BlogDetails";
import AllComments from "../screens/volunteer/AllComments";
import AddCommuntiy from "../screens/volunteer/AddCommuntiy";
import PostBlog from "../screens/volunteer/PostBlog";
import YourCommunity from "../screens/volunteer/YourCommunity";
import AllEvents from "../screens/volunteer/AllEvents";
import AddNewEvent from "../screens/volunteer/AddNewEvent";
import OneYourEventDetail from "../screens/volunteer/OneYourEventDetail";

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
				<Stack.Screen name="Eventhome" component={Eventhome} />
				<Stack.Screen name="vprofile" component={VProfile} />
				<Stack.Screen name="community" component={AllCommunity} />
				<Stack.Screen name="blogs" component={AllBlogs} />
				<Stack.Screen name="reminders" component={AllReminders} />
				<Stack.Screen name="EventDetails" component={EventDetails} />
				<Stack.Screen name="CommunityDetails" component={CommunityDetails} />
				<Stack.Screen name="BlogDetails" component={BlogDetails} />
				<Stack.Screen name="AllComments" component={AllComments} />
				<Stack.Screen name="AddCommunity" component={AddCommuntiy} />
				<Stack.Screen name="PostBlog" component={PostBlog} />
				<Stack.Screen name="YourCommunity" component={YourCommunity} />
				<Stack.Screen name="AllEvents" component={AllEvents} />
				<Stack.Screen name="AddNewEvent" component={AddNewEvent} />
				<Stack.Screen name="OneYourEventDetail" component={OneYourEventDetail} />



			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
