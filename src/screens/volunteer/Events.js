import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    FlatList,
    ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import { FontAwesome } from "@expo/vector-icons";
import OneEvent from "../../components/volunteer/OneEvent";
import BottomNav from "../../components/volunteer/BottomNav";


const Events = () => {
    const navigation = useNavigation();

    // todo ongoin trending and mostpopular

    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // todo
        console.log("searching...")
    };

    const handleOngoing = () => {
        //todo

    }

    const handleUpcoming = () => {

        //todo
    }

    const handleMostPopular = () => {
        //todo

    }

    return (
<SafeAreaView style={{ flex: 1 }}>


            <Header1 headerText="Events" style={styles.header} />

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search...."
                    onChangeText={setSearchText}
                >
                </TextInput>
                <FontAwesome
                    name="search"
                    color="#252525"
                    size={20}
                    style={styles.searchIcon}
                    onPress={handleSearch} />

            </View>

            <View style={styles.container2}>
                <Text style={styles.txt1} onPress={handleUpcoming}>Upcoming</Text>
                <Text style={styles.txt} onPress={handleOngoing} >Trending</Text>
                <Text style={styles.txt} onPress={handleMostPopular}>MostPopular</Text>
            </View>

            <FlatList
                data={[
                    { key: '1', title: 'Title 1', date: 'Date 1', time: 'Time 1', guests: '10', like: true ,
                        org:"leo club", location:"trinco",contact:"071236664",
                        description:'lalalalala llalalal alalalal', status:"Ongoing", age:'16'},
                    { key: '2', title: 'Title 2', date: 'Date 2', time: 'Time 2', guests: '5', like: false },
                    { key: '3', title: 'Title 2', date: 'Date 2', time: 'Time 2', guests: '5', like: true },
                    { key: '4', title: 'Title 2', date: 'Date 2', time: 'Time 2', guests: '5', like: false },
                   
                ]}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>navigation.navigate('EventDetails', {
                        title: item.title,
                        date: item.date,
                        time: item.time,
                        guests: item.guests,
                        location:item.location,
                        org:item.org,
                        contact:item.contact,
                        description:item.description,
                        status:item.status,
                        age:item.age
                    })} >

                        <OneEvent
                            title={item.title}
                            date={item.date}
                            time={item.time}
                            guests={item.guests}
                            like={item.like}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
            />

    <BottomNav style={{flex:1}} />

</SafeAreaView>
    );
}

export default Events;


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
    }

});
