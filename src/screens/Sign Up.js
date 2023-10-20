import { StyleSheet, Button, Text, View, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../index";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [contact, setContact] = useState('');
    const [userType, setUserType] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password || !repass || !contact || !userType) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== repass) {
            alert("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            alert("Password should be at least 6 characters long.");
            return;
        }
        try {
            // const auth = getAuth();

            // await createUserWithEmailAndPassword(auth, email, password);

            // // Get the user's unique ID
            // const user = auth.currentUser;
            const newUser = {
                email: email,
                contact: contact,
                userType: userType,
                password: password,
                createdAt: serverTimestamp()
            };

            const usersCollection = collection(db, "users");
            await addDoc(usersCollection, newUser);
            alert("Registration successful!");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error registering user:", error.message);
            alert("Registration failed. Please try again.");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/background.png")}
                style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 35, marginBottom: 40 }}>Sign Up</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder="    Enter Your Email"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={contact}
                            placeholder="    Enter Your contact"
                            onChangeText={(text) => setContact(text)}
                            keyboardType="numeric"
                        />


                        <Picker
                            style={styles.input2}
                            selectedValue={userType}
                            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                        >
                            <Picker.Item label="Select user type" selectedValue />
                            <Picker.Item label="Customer" value="customer" />
                            <Picker.Item label="Driver" value="driver" />
                            <Picker.Item label="Cleaner" value="cleaner" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            value={password}
                            placeholder="    Enter Your Password"
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />

                        <TextInput
                            style={styles.input}
                            value={repass}
                            placeholder="    Re-enter Your Password"
                            onChangeText={(text) => setRepass(text)}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            title="Sign Up"
                            onPress={handleLogin} >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 15, marginTop: 30 }}>Have an Account?
                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                                onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "blue", fontWeight: "bold", }}> Login</Text>

                            </TouchableOpacity>
                        </Text>

                    </View>
                </View>


            </ImageBackground>

        </SafeAreaView>
    );
}

export default SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 15,
        padding: 40,
        width: 300,

    },
    input: {
        padding: 12,
        width: 250,
        height: 40,
        borderColor: '#D8D8D8',
        borderWidth: 1,
        marginBottom: 25,

    },
    input2: {
        padding: 12,
        width: 250,
        height: 40,
        borderColor: '#D8D8D8',
        borderWidth: 1,
        marginBottom: 25,
        borderStyle: 'solid'

    },
    button: {
        width: 250,
        borderRadius: 20,
        height: 40,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});
