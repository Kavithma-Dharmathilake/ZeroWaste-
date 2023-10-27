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
    ScrollView,
Alert
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
    updateDoc,
    deleteDoc,
    getDoc,
    doc
} from "firebase/firestore";
import { db } from "../../index";

const OneYourEventDetail = ({route}) => {


    const [title, setTitle] = useState();
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
    const key = route.params.key
    console.log(key)

   

    useEffect(() => {
        // Fetch the event data based on the route params
        const fetchData = async () => {
          try {
              setTitle(route.params.title);
              setAge(route.params.age);
              setDescription(route.params.description);
              setStime(route.params.stime);
              setEtime(route.params.etime);
              setDate(route.params.date);
              setLocation(route.params.location);
              setContact(route.params.contact);
              setImageUri(route.params.img);
           
          } catch (error) {
            console.error("Error fetching event data: ", error);
          }
        }; fetchData();
    }, [route.params.key]);

    const handleSubmit = async () => {
        try {
          // Update the event document in Firestore
          const docRef = doc(db, "events", route.params.key);
          await updateDoc(docRef, {
            title,
            age,
            description,
            stime,
            etime,
            date1,
            location,
            contact,
            status,
            community,
            img: imageUri,
          });
    
          // Navigate back to the previous screen or any other action you want
          console.log("Updated: ");
          navigation.navigate('AllEvents');
        } catch (error) {
          console.error("Error updating event data: ", error);
        }};



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

    const handleDelete = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this event?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            // Delete the event document from Firestore
                            const docRef = doc(db, "events", route.params.key);
                            await deleteDoc(docRef);

                            // Navigate back to the previous screen or any other action you want
                            console.log("Event deleted");
                            navigation.navigate('AllEvents');
                        } catch (error) {
                            console.error("Error deleting event data: ", error);
                        }
                    },
                    style: "destructive",
                },
            ]
        );

    }


    return (
        <SafeAreaView>
            <Header1 headerText="Update Event"/>
            <ScrollView showsHorizontalScrollIndicator={true} style={{height: 600}}>
                <View>
                    <Pressable onPress={pickImage}>
                        <Image
                            source={
                                imageUri
                                    ? {uri: imageUri}
                                    : imageUri
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
                        style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deletebtn}
                    title='Create'
                    onPress={handleDelete}>
                    <Text
                        style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Delete</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>

    );

}

export default OneYourEventDetail;

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

    },
    deletebtn: {
        marginHorizontal: 30,
        marginBottom: 25,
        width: 350,
        height: 50,
        padding: 10,
        backgroundColor: "red",
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center"

    }


})