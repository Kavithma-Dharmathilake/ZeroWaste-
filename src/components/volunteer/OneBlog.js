import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const OneBlog = (props) => {

    const navigation = useNavigation();

    const likeImage = props.like ? require("../../../assets/volunteer/like.png") : require("../../../assets/volunteer/nolike.png");
    return (

        <SafeAreaView style={styles.bg}>
            <Image source={{uri:props.img}} style={styles.img}></Image>
            <Image style={styles.like} source={likeImage}></Image>
            <Text style={styles.heading}>{props.title}</Text>
            <View style={{flexDirection: "row", width:300, height:50}}>
                <View style={styles.likecontainer}>
                    <Text>Likes</Text>
                    <Text> | {props.likes}</Text>
                </View>
                <View style={{flex: 3, flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <FontAwesome
                            name="user"
                            color="black"
                            size={30}
                            style={{marginLeft:160}}
                        />

                    </View>
                    <View style={{flex: 1, flexDirection: "column",marginLeft:50}}>
                        <Text style={{flex: 1, color:"black"}}>Written By</Text>
                        <Text style={{flex: 1, color:"black", fontWeight:"bold", fontSize:20}}>{props.author}</Text>

                    </View>
                </View>

            </View>


        </SafeAreaView>);
}

export default OneBlog;

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
        width: 80,
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
        marginTop: 150,
        marginLeft: 10
    },
    likecontainer: {
        flexDirection: "row",
        flex: 1,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#297A76",
        borderWidth: 1,
        width: 100,
        marginLeft: 35,
        padding: 10,
        marginTop: 10,
        marginRight:40,
        position: "absolute",

    }


})