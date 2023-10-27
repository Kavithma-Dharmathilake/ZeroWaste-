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
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import { FontAwesome } from "@expo/vector-icons";
import OneBlog from "../../components/volunteer/OneBlog";
import BottomNav from "../../components/volunteer/BottomNav";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../index';



const AllBlogs = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [communityData, setCommunityData] = useState([]);
    const [time1, setTime] = useState('')
    const [date2, setDate] = useState('')

    useEffect(() => {
        // Define a function to fetch data from Firestore
        const fetchData = async () => {
            // Replace 'yourCollectionName' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(collection(db, "blogs"));

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data()); // You can access fields using doc.data()
            });

            setCommunityData(data);
            try{
            if (data.length > 0) {
                // Assuming 'createddate' is the field containing the timestamp
                const timestamp = data[0].createddate;

                if (timestamp) {

                    const date3 = timestamp.toDate();
                    const formattedDate = date3.toLocaleDateString();
                    setDate(formattedDate);

                    const time = date3.toLocaleTimeString();
                    setTime(time);

                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, [])

    const handleSearch = () => {
        // todo
        console.log("searching...")
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>


            <Header1 headerText="Blogs" style={styles.header} />

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


            <FlatList
                data={communityData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>navigation.navigate('BlogDetails', {
                        key:item.id,
                        title: item.title,
                        date:date2,
                        time:time1,
                        author: item.author,
                        likes:item.like,
                        comments:item.comment,
                        description:item.description,
                        img:item.img
                    })} >

                        <OneBlog
                            key={item.id}
                            title={item.title}
                            date={date2}
                            time={time1}
                            author={item.author}
                            likes={item.like}
                            like={item.liked}
                            comments={item.comment}
                            img={item.img}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
            />

            <BottomNav style={{flex:1}} />

        </SafeAreaView>
    );
}

export default AllBlogs;


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
