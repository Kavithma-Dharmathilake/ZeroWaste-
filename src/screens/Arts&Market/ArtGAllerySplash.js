import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

const ArtGAllerySplash = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to "ArtGallery" after 3 seconds
      navigation.navigate("ArtGallery");
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/artgallery/images/art-gallery-splash.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 32,
            color: "#fff",
            fontWeight: "200",
            marginTop: 540,
            lineHeight: 28,
            textAlign: "center",
          }}
        >
          Witness the{"\n"} transformation of {"\n"}refuse into artistry in{" "}
          {"\n"}our Waste to Treasure {"\n"}Gallery.
        </Text>
        <Image
          source={require("../../../assets/artgallery/images/dot.png")}
          style={{
            marginTop: 20,
            width: 62,
            height: 20,
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ArtGAllerySplash;

const styles = StyleSheet.create({});
