import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    FlatList,
    ScrollView,
    Button
} from "react-native";
import React, {useState, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import BottomNav from "../../components/volunteer/BottomNav";
import OneYourEvent from "../../components/volunteer/OneYourEvent";
import {collection, getDocs} from "firebase/firestore";
import {db} from '../../index';

const AllEvents = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [communityData, setCommunityData] = useState([]);

    useEffect(() => {
        // Define a function to fetch data from Firestore
        const fetchData = async () => {
            // Replace 'yourCollectionName' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(collection(db, "events"));


            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()});// You can access fields using doc.data()
            });

            setCommunityData(data);


        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []);

    const handleSearch = () => {
        // todo
        console.log("searching...")
    };

    const handlefilter = () => {
        // todo
        console.log("searching...")
    };

    useFocusEffect(
        React.useCallback(() => {

        }, [])
    );
    return (
        <SafeAreaView style={{flex: 1}}>


            <Header1 headerText="Your events" style={styles.header}/>


            {/** todo filteerrrrrsssssss */}
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
                    onPress={handleSearch}/>

            </View>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: "row", height: 90, marginBottom: 30}}>
                    <TouchableOpacity onPress={handlefilter}>
                        <Text style={styles.filter}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlefilter}>
                        <Text style={styles.filter}>Ongoing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlefilter}>
                        <Text style={styles.filter}>Completed</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity

                    onPress={() => navigation.navigate('AddNewEvent')}
                    style={{
                        backgroundColor: "#EA9415",
                        borderRadius: 30,
                        margin: 10,
                        padding: 15,
                        width: 90,
                        height:50,
                        justifyContent:"center",
                        alignItems:"center",
                        flex: 1
                    }}>
                    <Text style={{fontWeight: "bold"}}>Add New</Text>

                </TouchableOpacity>

                <TouchableOpacity

                    onPress={() => navigation.push('AllEvents')}
                    style={{
                        backgroundColor: "#EA9415",
                        borderRadius: 30,
                        margin: 10,
                        padding: 15,
                        width: 90,
                        alignItems:"center",
                        height:50,
                        flex: 1
                    }}>
                    <Text style={{fontWeight: "bold"}}>Refresh</Text>

                </TouchableOpacity>
            </View>

<ScrollView></ScrollView>
            <FlatList
                data={communityData}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('OneYourEventDetail', {
                        key: item.id,
                        age: item.age,
                        contact: item.contact,
                        date: item.date1,
                        stime: item.stime,
                        etime: item.etime,
                        description: item.description,
                        img: item.img,
                        location: item.location,
                        status: item.status,
                        title: item.title,

                    })}>

                        <OneYourEvent
                            key={item.id}
                            title={item.title}
                            date={item.date1}
                            stime={item.stime}
                            etime={item.etime}
                            logo={item.img}
                        />
                    </TouchableOpacity>

                )}
                keyExtractor={(item) => item.key}
            />

            <BottomNav style={{flex: 1}}/>

        </SafeAreaView>
    );
}

export default AllEvents;


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
    filter: {
        backgroundColor: "#36797D",
        borderRadius: 25,
        color: "#F3AF4A",
        padding: 18,
        margin: 20,
        marginHorizontal: 10,
        flex: 1,
        fontWeight: "bold",
        fontSize: 13,
        width: 110,
        textAlign: "center"
    },

});