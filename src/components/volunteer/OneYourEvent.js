import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

const OneYourEvent = (props) => {

    const navigation = useNavigation();
 
    return (

        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>
                <Image style={{flex: 2, marginLeft:10, marginTop:5, borderRadius:20, height:80, width:50}}  source={{ uri: props.logo }}
                       onError={(error) => {
                           console.error("Image loading error:", error);
                       }} />
                       
                <View style={{flex: 5, flexDirection:"column", marginLeft:30}}>
                    <Text style={{flex: 1, fontWeight:"bold", fontSize:17}}>{props.title}</Text>
                    <Text style={{flex: 1,fontSize:12, marginTop:10}}>{props.date}</Text>
                    <Text style={{flex: 1,fontSize:10}}>{props.stime} to {props.etime}</Text>

                </View>
            </View>

        </SafeAreaView>);
}

export default OneYourEvent;

const styles = StyleSheet.create({
    bg: {

    },
    container: {
        flexDirection: "row",
        height: 100,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 5,
        marginLeft: 15,
        marginBottom:-30,
        width:380

    },
})