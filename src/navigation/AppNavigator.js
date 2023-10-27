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

//Art gallery and MarketPlace
import ArtGallerySplash from "../screens/Arts&Market/ArtGAllerySplash";
import AddArts from "../screens/Arts&Market/AddArts";
import ArtGallery from "../screens/Arts&Market/ArtGallery";
import MarketPlace from "../screens/Arts&Market/MarketPlaceScreen";
import AddItem from "../screens/Arts&Market/AddItem";
import Product from "../screens/Arts&Market/Product";
import Profile from "../screens/Arts&Market/Profile";
import Inventory from "../screens/Arts&Market/Inventory";
import UpdateItem from "../screens/Arts&Market/UpdateItemScreen";
import AddToCart from "../screens/Arts&Market/AddToCart";
import BuyNow from "../screens/Arts&Market/BuyNow";
import MyOrders from "../screens/Arts&Market/MyOrders";
import RecivedOrders from "../screens/Arts&Market/RecivedOrders";


//Job Market
import JobMarketSplash from "../screens/jobMarket/JobMarketSplash";
import JobMarket from "../screens/jobMarket/JobMarket";
import AddJob from "../screens/jobMarket/AddJob";
import JobDetails from "../screens/jobMarket/JobDetails";MyJobs
import MyJobs from "../screens/jobMarket/MyJobs";
import JobHistory from "../screens/jobMarket/JobHistory";
import UpdateJobScreen from "../screens/jobMarket/UpdateJobScreen"; 
import Message from "../screens/jobMarket/Message"; 
import LeaderBoard from "../screens/jobMarket/LeaderBoard";
import Rate from "../screens/jobMarket/Rate";


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

         {/* Art gallery and MarketPlace */}
         <Stack.Screen name="ArtSplash" component={ArtGallerySplash} />
        <Stack.Screen name="ArtGallery" component={ArtGallery} />
        <Stack.Screen name="AddArts" component={AddArts} />
        <Stack.Screen name="Market" component={MarketPlace} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="UpdateItem" component={UpdateItem} />
        <Stack.Screen name="AddToCart" component={AddToCart} />
        <Stack.Screen name="BuyNow" component={BuyNow} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="RecivedOrders" component={RecivedOrders} />
         {/* Job Market */}
         <Stack.Screen name="JobMarketSplash" component={JobMarketSplash} />
        <Stack.Screen name="JobMarket" component={JobMarket} />
        <Stack.Screen name="AddJob" component={AddJob} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
        <Stack.Screen name="MyJobs" component={MyJobs} />
        <Stack.Screen name="JobHistory" component={JobHistory} />
        <Stack.Screen name="UpdateJobScreen" component={UpdateJobScreen} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="Rate" component={Rate} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
