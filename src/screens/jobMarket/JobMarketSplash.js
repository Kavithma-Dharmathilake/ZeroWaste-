import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobMarketSplash = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to "ArtGallery" after 3 seconds
      navigation.navigate("JobMarket");
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/jobMarket/JobMarketSplash.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
      </ImageBackground>
    // </SafeAreaView>
  );
};

export default JobMarketSplash;

const styles = StyleSheet.create({});
