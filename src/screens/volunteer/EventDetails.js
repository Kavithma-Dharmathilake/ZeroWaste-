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
import Header2 from "../../components/volunteer/Header2";


const EventDetails = ({route}) => {
    const {title} = route.params;
    const {date} = route.params;
    const {location} = route.params;
    const {contact} = route.params;
    const {time} = route.params;
    const {org} = route.params;
    const {guests} = route.params;
    const {description} = route.params;
    const {status} = route.params;
    const {age} = route.params;

    function handleJoin() {
        //todo
    }

    function handleInvite() {
        //todo
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground source={require("../../../assets/volunteer/vbg1.png")}
                             style={{flex: 1, textAlign: 'center'}}>
                <ScrollView>
                    <Header2 headerText={title}/>

                    <View style={styles.org}>

                        <View style={{flex: 1, marginLeft: 100,}}>
                            <Image style={{width: 50, height: 50, marginTop: 10}}
                                   source={require("../../../assets/volunteer/orgactive.png")}></Image>
                        </View>
                        <View style={styles.org2}>
                            <Text style={{flex: 1}}>Organized by</Text>
                            <Text style={{flex: 1, fontSize: 25, fontWeight: "bold"}}>{org}</Text>
                        </View>
                    </View>
                    <Image style={{margin: 15}} source={require("../../../assets/volunteer/event1.png")}></Image>
                    <View style={styles.details}>

                        <View style={{flexDirection: "row", margin: 20}}>
                            <Image style={{marginLeft: 50}}
                                   source={require("../../../assets/volunteer/map.png")}></Image>
                            <Text style={{flex: 5, marginLeft: 20}}>{location}</Text>
                        </View>
                        <View style={{flexDirection: "row", margin: 20}}>
                            <Image style={{marginLeft: 50}}
                                   source={require("../../../assets/volunteer/calendar.png")}></Image>
                            <View style={{flex: 5, marginLeft: 20, flexDirection: "column"}}>
                                <Text style={{flex: 1}}>{time}</Text>
                                <Text style={{flex: 1}}>{date}</Text>

                            </View>

                        </View>
                        <View style={{flexDirection: "row", margin: 20}}>
                            <Image style={{marginLeft: 50}}
                                   source={require("../../../assets/volunteer/call.png")}></Image>
                            <Text style={{flex: 5, marginLeft: 20}}>{contact}</Text>
                        </View>
                    </View>
                    <Text style={{padding: 30}}>{description}</Text>
                    <Text style={{padding: 10, marginLeft: 30}}>Age Limit : {age}</Text>
                    <Text style={{marginLeft: 40}}>Event Status : {status}</Text>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={styles.joine}
                            onPress={handleJoin}>
                            <Text style={{fontSize: 20, color: "#F3AF4A", fontWeight: "bold", marginLeft: 30}}>Join
                                Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.joine1}
                            onPress={handleInvite}>
                            <Text style={{fontSize: 20, color: "black", fontWeight: "bold", marginLeft: 30}}>Invite
                                Event</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <BottomNav style={{flex: 1}}/>
            </ImageBackground>

        </SafeAreaView>
    );
}

export default EventDetails;

const styles = StyleSheet.create({
    org: {
        flexDirection: "row",
        marginTop: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    org2: {
        flex: 1,
        flexDirection: "column",
        marginLeft: -150
    },
    details: {
        backgroundColor: "white",
        borderRadius: 15,
        width: 300,
        marginLeft: 50
    },
    joine: {
        backgroundColor: "#1F716D",
        height: 70,
        width: 200,
        padding: 20,
        margin: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    joine1: {
        backgroundColor: "white",
        borderWidth:3,
        borderColor:"#1F716D",
        height: 70,
        width: 150,
        padding: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },

})
