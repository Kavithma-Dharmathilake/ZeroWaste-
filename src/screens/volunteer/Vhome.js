import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Vhome = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../../assets/volunteer/getting_start.png")}
                style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                   <TouchableOpacity 
                   onPress={() =>navigation.navigate("Eventhome")}
                   style={{
                    backgroundColor:"black",
                    marginTop:700,
                    padding:10,
                    width:300,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:20,
                   }}>
                    <Text style={{color:"white", fontFamily:"Roboto"}}>Getting Start</Text>
                   </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>

    );
}

export default Vhome;