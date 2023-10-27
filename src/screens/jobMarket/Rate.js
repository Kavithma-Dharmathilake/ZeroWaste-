import { StyleSheet, Text, View, ImageBackground,TouchableOpacity, TextInput, Pressable, Image, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const Rate = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/RatingBackground.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Pressable onPress={() => navigation.navigate("JobHistory")}>
        <Image
          source={require("../../../assets/jobMarket/back-Arrow.png")}
          style={{
            width: 40,
            height: 40,
            marginHorizontal: 10,
            marginVertical: 10,
            marginTop: 60,
            marginBottom: -33,
          }}
        />
      </Pressable>
      {/* <Text style={styles.label}>Description:</Text> */}
      
      <TextInput
              placeholder="Description"
              style={[styles.input, { height: 150, textAlignVertical: "top" }]}
              
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("JobHistory")}
              style={styles.updateButton}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
    </ImageBackground>
  );
}

export default Rate;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "77%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 350,
    marginRight: 5,
  },
  updateButton: {
    backgroundColor: "#5DB075",
    borderRadius: 60,
    paddingVertical: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 50,
    height: "5%",
    marginLeft: 100


  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "400",
  },
  label: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 300,
    marginLeft: 60,
  },
});