import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    FlatList,
    Pressable,
    Button,
    ScrollView
} from "react-native";
import React, {useState, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import * as ImagePicker from "expo-image-picker";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../index";

const AddNewEvent = () => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [stime, setStime] = useState('');
    const [etime, setEtime] = useState('');
    const [date1, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const  status  = "Ongoing"
    const community = "Leo Club - Kurunegala";
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedDate(date);
    };



    useEffect(() => {
        (async () => {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work.");
            }
        })();
    }, []);




    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3,2],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets?.[0] || { uri: result.uri };
            setImageUri(selectedImage.uri);
        }
    };


    const handleSubmit = async () => {
        if (title.trim() === '' || age.trim() === '' || description.trim() === '' || stime.trim() === '' || contact.trim() === '' || etime.trim() === '') {
            // Show an error toast message if any of the required fields are empty
            alert("Please fill in all required fields.");
            return; // Exit the function early if any field is empty
        }
        try {
            // Create a new document in the "blogs" collection
            const blogDocRef = await addDoc(collection(db, "events"), {
                img: imageUri, // Assuming `imageUri` contains the URL of the image
                title,
                contact,
                description,
                age,
                stime,
                etime,
                status,
                community,
                date1,
                location,
                createdtime: serverTimestamp(),

            });
            alert('New Event added');

            setTitle("");
            setAge("");
            setDescription("");
            setImageUri("");
            setLocation("");


            navigation.navigate('AllEvents');

            console.log("Blog post added with ID: ", blogDocRef.id);


            // Reset your input fields or navigate to another screen if needed.
        } catch (error) {
            console.error("Error adding blog post: ", error);
        }
    };

    return (
        <SafeAreaView>
            <Header1 headerText="Create Event"/>
            <ScrollView showsHorizontalScrollIndicator={true} style={{height: 600}}>
                <View>
                    <Pressable onPress={pickImage}>
                        <Image
                            source={
                                imageUri
                                    ? {uri: imageUri}
                                    : require("../../../assets/images/add-image.png")
                            }
                            style={{
                                borderRadius: 20,
                                width: 100,
                                height: 100,
                                margin: 20,
                                marginLeft: 50
                            }}
                        />
                    </Pressable>
                </View>
                <TextInput
                    value={title}
                    placeholder='   Event Title'
                    style={styles.input}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    value={age}
                    placeholder='   Age Limit  ex:16 above'
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => setAge(text)}
                />
                <TextInput
                    value={location}
                    placeholder='   Location'
                    style={styles.input}
                    onChangeText={(text) => setLocation(text)}
                />
                <TextInput
                    value={contact}
                    placeholder='   Contact No'
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => setContact(text)}
                />
                <TextInput
                    value={date1}
                    placeholder='   Date'
                    style={styles.input}
                    onChangeText={(text) => setDate(text)}
                />
                <TextInput
                    value={stime}
                    placeholder='   Start time'
                    style={styles.input}
                    onChangeText={(text) => setStime(text)}
                />
                <TextInput
                    value={etime}
                    placeholder='   End Time'
                    style={styles.input}
                    onChangeText={(text) => setEtime(text)}
                />

                <TextInput
                    value={description}
                    placeholder='   Description'
                    style={styles.input1}
                    multiline={true}  // or just multiline
                    numberOfLines={5}
                    onChangeText={(text) => setDescription(text)}
                />

                <TouchableOpacity
                    style={styles.submitbtn}
                    title='Create'
                    onPress={handleSubmit}>
                    <Text
                        style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Create</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>

    );

}

export default AddNewEvent;

const styles = StyleSheet.create({
    input: {
        padding: 15,
        width: 350,
        height: 50,
        backgroundColor: "white",
        marginBottom: 25,
        marginHorizontal: 30,
        borderRadius: 15

    },
    input1: {
        width: 350,
        textAlignVertical: 'top',
        padding: 20,
        backgroundColor: "white",
        marginBottom: 25,
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