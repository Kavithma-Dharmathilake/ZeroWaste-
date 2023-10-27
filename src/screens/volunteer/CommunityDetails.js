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
import Header3 from "../../components/volunteer/Header3";


const CommunityDetails = ({route}) => {
    const {name} = route.params;
    const {events} = route.params;
    const {members} = route.params;
    const {img} = route.params;
    const {logo} = route.params;
    const {description} = route.params;
    const {contact} = route.params;
    const {president} = route.params;
    const {location} = route.params;
    const {category} = route.params;


    function handleJoin() {
        //todo
    }

    function handleInvite() {
        //todo
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground source={require("../../../assets/volunteer/bg3.png")}
                             style={{flex: 1, textAlign: 'center'}}>
                <ScrollView>
                    <Header3 headerText={name} logo2={logo} />
                    <View style={styles.about}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>About Us:</Text>
                        <Text>{description}</Text>
                        <View style={{backgroundColor:"#D9D9D9", padding:10, margin:10, borderRadius:20}}>
                            <Text style={{fontWeight:"bold"}}>President:        {president}</Text>
                            <Text style={{fontWeight:"bold"}}>Contact:            {contact}</Text>
                            <Text style={{fontWeight:"bold"}}>Total Events:    {events}</Text>
                        </View>


                    </View>
                    <Image source={{uri:img}} style={{marginLeft:30, height:200, width:350}}></Image>


                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={styles.joine}
                            onPress={handleJoin}>
                            <Text style={{fontSize: 20, color: "#F3AF4A", fontWeight: "bold", marginLeft: 15}}>Join Community</Text>
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

export default CommunityDetails;

const styles = StyleSheet.create({

    about: {
        backgroundColor: "white",
        borderRadius: 20,
        width: 350,
        height: 350,
        margin: 20,
        padding: 20,
        marginTop: 100,
    },
    joine: {
        backgroundColor: "#1F716D",
        height: 70,
        width: 220,
        padding: 20,
        margin: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    joine1: {
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: "#1F716D",
        height: 70,
        width: 150,
        padding: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },

})
