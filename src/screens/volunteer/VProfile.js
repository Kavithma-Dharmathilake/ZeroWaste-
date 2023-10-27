import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from "react-native";
import React, {useState, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import OneEvent from "../../components/volunteer/OneEvent";
import BottomNav from "../../components/volunteer/BottomNav";
import OneReminder from "../../components/volunteer/OneReminder";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../index";

const VProfile = () => {

    const [communityData, setCommunityData] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        // Define a function to fetch data from Firestore
        const fetchData = async () => {
            // Replace 'yourCollectionName' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(collection(db, "community"));

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data()); // You can access fields using doc.data()
            });

            setCommunityData(data);

        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []);

    const total = 12;
    const handleCommunityPress = (community) => {
        // Navigate to the YourCommunity page with the community data
        navigation.navigate("YourCommunity", { community });
    };
    const renderCommunityItem = ({ item }) => (
        <TouchableOpacity style={{flex:1}}
            onPress={() => handleCommunityPress(item)}
        >
            <Image source={{ uri: item.logo }} style={{width:50, height:50,flex:1, margin:10}} />
        </TouchableOpacity>
    );

    //todo total activity

    //todo load blogs

    //todo load community

    //todo load memberships


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>


                <Header1 headerText="Your Profile" style={styles.header}/>
                <View style={{flexDirection: "row"}}>

                    <View style={styles.container}>
                        <View style={{flexDirection: "column"}}>
                            <Image source={require('../../../assets/volunteer/totevent.png')}></Image>
                            <Text style={{margin: 20, marginLeft: 35, fontSize: 15,}}>Volunteer Activity</Text>
                            <Text style={{
                                marginLeft: 100,
                                fontSize: 20,
                                color: "#F3AF4A",
                                fontWeight: "bold"
                            }}>{total}</Text>
                        </View>

                    </View>
                    <View style={styles.container}>
                        <View style={{flexDirection: "column"}}>
                            <Image source={require('../../../assets/volunteer/coin.png')}></Image>
                            <Text style={{margin: 20, marginLeft: 35, fontSize: 15,}}>Eco Coins</Text>
                            <Text style={{
                                marginLeft: 100,
                                fontSize: 20,
                                color: "#F3AF4A",
                                fontWeight: "bold"
                            }}>{total * 5}</Text>
                        </View>
                    </View>

                </View>
                <Text style={styles.header2}>Your Memberships</Text>
                <View style={{flexDirection: "row", paddingHorizontal: 30}}>
                    <Image style={{marginLeft: 20}} source={require("../../../assets/volunteer/logo.png")}></Image>
                </View>

                <Text style={styles.header2}>Your Communities</Text>
                <View style={{flexDirection: "row", paddingHorizontal: 30}}>
                    <FlatList horizontal={true}
                        data={communityData}
                        renderItem={renderCommunityItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                {/*//todo your blogs*/}
                {/*<Text style={styles.header2}>Your Blogs</Text>*/}
                {/*<Text style={styles.blog}>Blog 3</Text>*/}
                {/*<Text style={styles.blog}>Blog 2</Text>*/}

                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddCommunity")}>
                        <Text style={styles.blog1}>Create a Community</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PostBlog")}>
                        <Text style={styles.blog1}>Post a Blog</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <BottomNav style={{flex: 1}}/>


        </SafeAreaView>
    );
}

export default VProfile;


const styles = StyleSheet.create({
    header: {
        zIndex: -1,
    },
    container: {
        backgroundColor: "white",
        margin: 20,
        padding: 20,
        borderRadius: 15,
        flex: 1

    },
    header2: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 30,
    },
    blog: {
        marginLeft: 50,
        fontSize: 15
    },
    blog1: {
        marginLeft: 10,
        fontSize: 20,
    }
});