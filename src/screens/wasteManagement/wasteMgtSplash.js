import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


const WasteMgtSplash = () =>{
  const navigation = useNavigation();
   return(
    <SafeAreaView style={{ flex: 1 }}>
       
      <ImageBackground
        source={require("../../../assets/images/wasteManagement/wasteMgtSplash.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={styles.driveInButton}
          onPress={() => {
            // Navigate to "JobMarket" when the button is pressed
            navigation.navigate("WasteMgtHome");
          }}
        >
          <Text style={styles.buttonText}>Drive In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  driveInButton: {
    backgroundColor: "#FFB64A",
    padding: 15,
    borderRadius: 25,
    marginBottom: -500, 
    width: 200,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default WasteMgtSplash;
