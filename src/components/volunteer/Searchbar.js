import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SearchBar = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={props.placeholder}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
            />
            <FontAwesome
                name="user"
                color="white"
                size={30}
                style={styles.icon}
            />

        </SafeAreaView>
    );
}

export default SearchBar;

const styles = StyleSheet.create({

    container: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    }


})