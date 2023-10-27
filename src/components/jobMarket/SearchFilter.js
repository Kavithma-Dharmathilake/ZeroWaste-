import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchFilter = ({ icon, placeholder }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingVertical: 8, // Adjust the height here
        borderRadius: 12,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginTop: 130,
        marginRight: 10,
        marginLeft: -3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
      }}
    >
      <FontAwesome name={icon} size={20} color="#000000" />
      <TextInput
        style={{
          paddingLeft: 8,
          fontSize: 14, // Adjust the font size here
          color: "#808080",
        }}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({});
