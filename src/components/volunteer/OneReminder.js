import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";

const OneReminder = (props) => {

    const navigation = useNavigation();

    const handleDelete = () => {
      //todo
    }

    return (

        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>

                <Image style={{flex: 1, marginLeft:20, marginTop:20, resizeMode:"contain",}} source={require("../../../assets/volunteer/bellactive.png")}></Image>

                <View style={{flex: 5, flexDirection:"column", marginLeft:30}}>
                    <Text style={{flex: 2, fontWeight:"bold", fontSize:20, marginTop:5}}>{props.title}</Text>
                    <Text style={{flex: 1,fontSize:18,marginTop:-20,fontWeight:'bold', color:"#F3AF4A"}}>{props.day} days more</Text>
                    <FontAwesome name='trash' style={{marginLeft:210, color:"red"}} size={25} onPress={handleDelete} />
                </View>

            </View>

        </SafeAreaView>);
}

export default OneReminder;

const styles = StyleSheet.create({
    bg: {

    },
    container: {
        flexDirection: "row",
        height: 100,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 5,
        marginLeft: 30,
        marginBottom:-30,
        width:350

    },
})