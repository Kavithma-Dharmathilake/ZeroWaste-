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
    ScrollView
} from "react-native";
import React, {useState, useEffect} from "react";
import Toast from "react-native-toast-message";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import BottomNav from "../../components/volunteer/BottomNav";
import * as ImagePicker from "expo-image-picker";
import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import {db} from "../../index";

const AddCommunity = () => {

    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [president, setPresident] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const events = 0;
    const members = 1;
    const category = 'Youth';
    const [logo, setLogo] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();


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
            aspect: [6,6],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets?.[0] || {uri: result.uri};
            setImageUri(selectedImage.uri);
        }
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3,2],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets?.[0] || {uri: result.uri};
            setImg(selectedImage.uri);
        }
    };


    const handleSubmit = async () => {
        if (name.trim() === '' || president.trim() === '' || location.trim() === '' || description.trim() === '') {
            // Show an error toast message if any of the required fields are empty
            alert("Please fill in all required fields.");
            return; // Exit the function early if any field is empty
        }
        try {
            // Create a new document in the "blogs" collection
            const blogDocRef = await addDoc(collection(db, "community"), {
                name,
                logo: imageUri, // Assuming `imageUri` contains the URL of the image
                img:img,
                president,
                description,
                events: 0,
                category,
                location,
                contact
            });
            alert('New Community added');

            setContact("");
            setPresident("");
            setDescription("");
            setImageUri("");
            setImg("");
            setContact('');
            setLocation('');
            setName('');

            navigation.navigate('community');

            console.log("Community post added with ID: ", blogDocRef.id);


            // Reset your input fields or navigate to another screen if needed.
        } catch (error) {
            console.error("Error community: ", error);
        }
    };

    return (
        <SafeAreaView>
            <Header1 headerText="Create Community"/>
            <ScrollView showsHorizontalScrollIndicator={true} style={{height: 600}}>
                <View>
                    <Text style={{marginLeft:30, marginTop:30}}> Your Logo:</Text>
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
                    value={name}
                    placeholder='   Name of the Community'
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    value={president}
                    placeholder='   President Name'
                    style={styles.input}
                    onChangeText={(text) => setPresident(text)}
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
                    value={description}
                    placeholder='   Description'
                    style={styles.input1}
                    multiline={true}  // or just multiline
                    numberOfLines={5}
                    onChangeText={(text) => setDescription(text)}
                />
                <View>
                    <Text style={{marginLeft:30, marginTop:30}}> Image:</Text>
                    <Pressable onPress={pickImage2}>
                        <Image
                            source={
                                img
                                    ? {uri: img}
                                    : require("../../../assets/images/add-image.png")
                            }
                            style={{
                                borderRadius: 20,
                                width: 200,
                                height: 200,
                                margin: 20,
                                marginLeft: 100
                            }}
                        />
                    </Pressable>
                </View>
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

export default AddCommunity;

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