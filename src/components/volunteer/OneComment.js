import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

const OneComment = (props) => {

    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flexDirection:"column", flex:5}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>{props.name}</Text>
                        <Text>{props.comment}</Text>

                    </View>
                    <View style={{flexDirection:"column", flex:1}}>
                        <Text>{props.date}</Text>
                        <Text>{props.time}</Text>

                    </View>

                </View>


            </View>

        </SafeAreaView>);
}

export default OneComment;

const styles = StyleSheet.create({
    bg: {

    },
    container: {

        height: 100,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        marginLeft: 15,
        marginBottom:-30,
        width:350

    },
})