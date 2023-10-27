import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    FlatList,
    ScrollView
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import OneEvent from "../../components/volunteer/OneEvent";
import BottomNav from "../../components/volunteer/BottomNav";
import OneReminder from "../../components/volunteer/OneReminder";

const AllReminders = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>


            <Header1 headerText="Reminders" style={styles.header}/>

            <FlatList
                data={[
                    {
                        key: '1',
                        title: 'Title 1',
                        day: '3'
                    },
                    {
                        key: '2',
                        title: 'Title 1',
                        day: '3'
                    },
                    {
                        key: '3',
                        title: 'Title 1',
                        day: '3'
                    },
                    {
                        key: '4',
                        title: 'Title 1',
                        day: '3'
                    },
                    {
                        key: '5',
                        title: 'Title 1',
                        day: '3'
                    },

                ]}
                renderItem={({item}) => (
                        <OneReminder
                            title={item.title}
                            day={item.day}

                        />


                )}
                keyExtractor={(item) => item.key}
            />

            <BottomNav style={{flex: 1}}/>

        </SafeAreaView>
    );
}

export default AllReminders;


const styles = StyleSheet.create({
    header: {
        zIndex: -1,
    },
    container2: {
        flexDirection: "row",
        paddingTop: 30,
        paddingHorizontal: 50,
        paddingBottom: 20,
    },

    txt1: {
        flex: 1,
        color: "#EA9415"
    },
    txt: {
        flex: 1,
        color: "black"
    },
    container: {
        padding: 10,
        flexDirection: "row",
        width: 300,
        height: 50,
        borderRadius: 15,
        marginLeft: 55,
        zIndex: 3,
        marginTop: -20,
        backgroundColor: "white"
    },
    input: {
        padding: 4,
        flex: 1,
        color: "#23706C",

    },
    searchIcon: {
        padding: 3
    },
    filter:{
        backgroundColor:"#36797D",
        borderRadius:25,
        color:"#F3AF4A",
        padding:18,
        margin:20,
        marginHorizontal:10,
        flex:1,
        fontWeight:"bold",
        fontSize:13,
        width:110,
        textAlign:"center"
    },

});