import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Header3 = (props) => {

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();

    }

    const handleGoProfile = () => {
        navigation.navigate('vprofile');

    }
    var logo2 = props.logo2
    console.log({uri:logo2})


    return (
        <SafeAreaView>
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={{ flex: 2 }}
                    onPress={handleGoBack}>
                    <Image style={styles.back} source={require("../../../assets/volunteer/back-Arrow.png")}></Image>
                </TouchableOpacity>
                <Image style={{borderRadius:50, marginLeft:-50, height:50, width:50}} source={{ uri: logo2 }}></Image>
                <Text style={styles.title}>{props.headerText}</Text>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={handleGoProfile}>
                    <Image style={styles.back} source={require("../../../assets/volunteer/propic.png")}></Image>
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
}

export default Header3;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#23706C",
        height: 150,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    navbar: {
        flexDirection: "row",
        padding: 10
    },
    back: {
        height: 40,
        width: 40
    },
    title: {
        fontSize: 23,
        textAlign: "center",
        justifyContent: "center",
        marginRight: 80,
        color: "#36797D",
        width:160,
        fontWeight: "bold",
    }

});
