import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const BottomNav = (props) => {

    const navigation = useNavigation();

    return (

        <SafeAreaView style={{marginTop:-50, marginBottom:15}}>
            <View style={{borderRadius:30, backgroundColor:"white", height:70}}>
                <Pressable
                    style={styles.tabs}
                    onPress={() => navigation.navigate("Eventhome")}>
                    <Image source={require("../../../assets/volunteer/hometab.png")}></Image>
                </Pressable>
                <Pressable
                    style={{flex:1, marginLeft:150, marginTop:5}}
                    onPress={() => navigation.navigate("community")}>
                    <Image styles={{marginLeft:100}} source={require("../../../assets/volunteer/orgtab.png")}></Image>
                </Pressable>
                <Pressable
                    style={{flex:1, marginLeft:250, marginTop:-5}}
                    onPress={() => navigation.navigate("blogs")}>
                    <Image source={require("../../../assets/volunteer/blogtab.png")}></Image>
                </Pressable>
                <Pressable
                    style={{flex:1, marginLeft:350, marginBottom:50}}
                    onPress={() => navigation.navigate("reminders")}>
                    <Image source={require("../../../assets/volunteer/belltab.png")}></Image>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default BottomNav;

const styles = StyleSheet.create({
    bg: {
        flexDirection: "row",
        height:100,
        paddingHorizontal:15,
    },
    tabs: {
        flex: 1,
        marginLeft:10,
        marginTop:15

    },
})