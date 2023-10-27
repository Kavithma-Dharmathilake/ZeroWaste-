import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

const OneEvent = (props) => {

    const navigation = useNavigation();

    const likeImage = props.like ? require("../../../assets/volunteer/like.png") : require("../../../assets/volunteer/nolike.png");
    return (

        <SafeAreaView style={styles.bg}>


            <Image source={require("../../../assets/volunteer/event1.png")} style={styles.img}></Image>
            <Image style={styles.like} source={likeImage}></Image>
            <View style={styles.date}>
                <Text>Date 1</Text>
            </View>
            <View style={styles.timecontainer}>
                <Text style={styles.time1}>{props.time}</Text>
                <Text style={styles.time2}>{props.date}
                    {/* Create remainng days*/}
                </Text>
            </View>
            <Text style={styles.heading}>{props.title}</Text>
            <View style={styles.guests}>
                <Text style={{fontSize:15}}>        Number of participants    |</Text>
                <Text style={{fontSize:15}}>       {props.guests}</Text>
            </View>



        </SafeAreaView>);
}

export default OneEvent;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        margin: 20,
        height: 370
    },
    img: {
        zIndex: -2,
        height: 230,
        width: 370,
        marginTop: -50,
        borderRadius: 30,
    },
    date: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 10,
        padding: 6,
        marginTop: -47,
        marginLeft: 20,
    },
    like: {
        zIndex: 0,
        marginTop: -200,
        marginLeft: 310,
    },
    timecontainer: {
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 120,
        width: 150,
        marginLeft: 20,
        borderRadius: 10,
        padding: 5,

    },
    time1: {
        flex: 1,
    },
    time2: {
        flex: 1,
    },
    heading: {
        fontWeight: "900",
        fontSize: 25,
        padding: 10,
        marginTop: 10,
        marginLeft: 10
    },
    guests: {
        flexDirection: "row",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#297A76",
        borderWidth: 1,
        width: 300,
        marginLeft: 35,
        padding: 10,
        marginTop: 310,
        position: "absolute",


    }


})