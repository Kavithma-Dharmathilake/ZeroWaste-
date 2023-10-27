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
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import * as ImagePicker from "expo-image-picker";
import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { db } from "../../index";

const PostBlog = () => {

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [time, setTime] = useState('');
    const {like} = 0;
    const liked = false;
    const comment = 0;
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);


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
        if (title.trim() === '' || author.trim() === '' || description.trim() === '') {
            // Show an error toast message if any of the required fields are empty
            alert("Please fill in all required fields.");
            return; // Exit the function early if any field is empty
        }
        try {
            // Create a new document in the "blogs" collection
            const blogDocRef = await addDoc(collection(db, "blogs"), {
                img: imageUri, // Assuming `imageUri` contains the URL of the image
                title,
                author,
                description,
                like: 0,
                comment: 0,
                liked: false,
                createdtime: serverTimestamp(),
                createddate: serverTimestamp(),
            });
            alert('New Blog added');

            setTitle("");
            setAuthor("");
            setDescription("");
            setImageUri("");

            navigation.navigate('blogs');

            console.log("Blog post added with ID: ", blogDocRef.id);


            // Reset your input fields or navigate to another screen if needed.
        } catch (error) {
            console.error("Error adding blog post: ", error);
        }
    };

        return (
            <SafeAreaView>
                <Header1 headerText="New Blog"/>
                <ScrollView showsHorizontalScrollIndicator={true}>


                    <View>
                        <Pressable onPress={pickImage}>
                            <Image
                                source={
                                    imageUri
                                        ? { uri: imageUri }
                                        : require("../../../assets/images/add-image.png")
                                }
                                style={{
                                    borderRadius: 20,
                                    width: 200,
                                    height: 200,
                                    margin: 20,
                                    marginLeft:100
                                }}
                            />
                        </Pressable>
                    </View>
                    <TextInput
                        value={title}
                        placeholder='   Title of the Blog'
                        style={styles.input}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <TextInput
                        value={author}
                        placeholder='   Author/Authors'
                        style={styles.input}
                        onChangeText={(text) => setAuthor(text)}
                    />
                    <TextInput
                        value={description}
                        placeholder='   Content of the blog'
                        style={styles.input1}
                        multiline={true}  // or just multiline
                        numberOfLines={30}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <TouchableOpacity
                        style={styles.submitbtn}
                        title='Post'
                        onPress={handleSubmit}>
                        <Text
                            style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Post</Text>
                    </TouchableOpacity>
                </ScrollView>

            </SafeAreaView>

        );

    }

export default PostBlog;

const styles = StyleSheet.create({
    input: {
        padding: 15,
        width: 350,
        height: 50,
        backgroundColor:"white",
        marginBottom: 25,
        marginHorizontal:30,
        borderRadius:15

    },
    input1: {
        width: 350,
        textAlignVertical: 'top',
        padding:20,
        height: 200,
        backgroundColor:"white",
        marginBottom: 25,
        marginHorizontal:30,
        borderRadius:15

    },
    submitbtn:{
        marginHorizontal:30,
        marginBottom: 25,
        width:350,
        height:50,
        padding:10,
        backgroundColor:"#F3AF4A",
        borderRadius:15,
        textAlign:"center",
        justifyContent:"center"

    }


})