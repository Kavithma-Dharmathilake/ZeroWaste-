import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Header1 = (props) => {

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();

    }

    const handleGoProfile = () => {
        navigation.navigate('vprofile');

    }


    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={{ flex: 2 }}
                    onPress={handleGoBack}>
                    <Image style={styles.back} source={require("../../../assets/volunteer/back-Arrow.png")}></Image>
                </TouchableOpacity>
                <Text style={styles.title}>{props.headerText}</Text>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={handleGoProfile}>
                    <Image style={styles.back} source={require("../../../assets/volunteer/propic.png")}></Image>
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
}

export default Header1;

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
        fontSize: 25,
        textAlign: "center",
        justifyContent: "center",
        marginRight: 80,
        color: "#FFBE5D",
        fontWeight: "bold",
        width:150
    }

});
