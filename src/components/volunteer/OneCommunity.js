import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

const OneCommunity = (props) => {

    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>
                <Image style={{flex: 1, marginLeft:30}} source={require("../../../assets/volunteer/logo.png")}></Image>
                <View style={{flex: 5, flexDirection:"column", marginLeft:30}}>
                    <Text style={{flex: 1, fontWeight:"bold", fontSize:17}}>{props.title}</Text>
                    <Text style={{flex: 1,fontSize:12, marginTop:10}}>{props.members} events total</Text>
                    <Text style={{flex: 1,fontSize:10}}>{props.total}  members</Text>
                </View>
            </View>

        </SafeAreaView>);
}

export default OneCommunity;

const styles = StyleSheet.create({
    bg: {

    },
    container: {
        flexDirection: "row",
        height: 80,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 5,
        marginLeft: 15,
        marginBottom:-30,
        width:350

    },
})