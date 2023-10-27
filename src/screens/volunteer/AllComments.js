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
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import OneEvent from "../../components/volunteer/OneEvent";
import BottomNav from "../../components/volunteer/BottomNav";
import Header2 from "../../components/volunteer/Header2";
import OneComment from "../../components/volunteer/OneComment";
import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    getDocs
} from "firebase/firestore";
import { db } from "../../index";


const AllComments = () => {

    const [comment, setComment] =useState('');
    const name ="Kavithma";
    const [communityData, setCommunityData] = useState([]);
    const [time1, setTime] = useState('')
    const [date2, setDate] = useState('')
    const [refresh, setRefresh] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        // Define a function to fetch data from Firestore
        const fetchData = async () => {
            // Replace 'yourCollectionName' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(collection(db, "comments"));

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data()); // You can access fields using doc.data()
            });

            setCommunityData(data);
            try{
                if (data.length > 0) {
                    // Assuming 'createddate' is the field containing the timestamp
                    const timestamp = data[0].createdtime;

                    if (timestamp) {

                        const date3 = timestamp.toDate();
                        const formattedDate = date3.toLocaleDateString();
                        setDate(formattedDate);

                        const options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true, // Use 12-hour format
                        };

                        const time = date3.toLocaleTimeString(undefined, options);
                        setTime(time);

                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData(); // Call the function to fetch data when the component mounts
    },  [refresh])

    const handleSubmit = async () => {
        if (comment.trim() === '' ) {
            // Show an error toast message if any of the required fields are empty
            alert("Please add your comment.");
            return; // Exit the function early if any field is empty
        }
        try {
            // Create a new document in the "blogs" collection
            const commentDocRef = await addDoc(collection(db, "comments"), {
                 name,
                 comment,
                 createdtime:serverTimestamp()

            });
            alert('New Community added');

            setComment("");

            console.log("Comment post added with ID: ");
            setRefresh(!refresh);


            // Reset your input fields or navigate to another screen if needed.
        } catch (error) {
            console.error("Error community: ", error);
        }
    };



    function handleComment() {
        //todo comment number
    }

    function handleInvite() {
        //todo
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground source={require("../../../assets/volunteer/vbg1.png")}
                             style={{flex: 1, textAlign: 'center'}}>
                <ScrollView>
                    <Header2 headerText="Comments"/>
                    <FlatList
                        data={communityData}
                        renderItem={({item}) => (


                            <OneComment
                                name={item.name}
                                comment={item.comment}
                                date={date2}
                                time={time1}
                            />

                        )}
                        keyExtractor={(item) => item.key}
                    />
                    {/*todo post comment*/}

                    <TextInput
                        value={comment}
                        placeholder='   Add Your Comment here'
                        style={styles.input1}
                        multiline={true}  // or just multiline
                        numberOfLines={5}
                        onChangeText={(text) => setComment(text)}
                    />
                    <TouchableOpacity
                        style={styles.submitbtn}
                        title='Create'
                        onPress={handleSubmit}>
                        <Text
                            style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Create</Text>
                    </TouchableOpacity>
                </ScrollView>

                <BottomNav style={{flex: 1}}/>
            </ImageBackground>

        </SafeAreaView>
    );
}

export default AllComments;

const styles = StyleSheet.create({

    about: {
        backgroundColor: "white",
        borderRadius: 20,
        width: 350,
        height: 350,
        margin: 20,
        padding: 20,
        marginTop: 30,
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
    input1: {
        width: 350,
        textAlignVertical: 'top',
        padding: 20,
        backgroundColor: "white",
        margin: 25,
        marginHorizontal: 30,
        borderRadius: 15

    },
    submitbtn: {
        marginHorizontal: 30,
        marginBottom: 25,
        width: 350,
        height: 50,
        padding: 10,
        backgroundColor: "#F3AF4A",
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center"

    }

})
