import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../index";
import { useNavigation } from "@react-navigation/native";

const JobDetails = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const status = null;


  const handleRequest = async() => {
  try{
    const myjobsRef = collection(db,"myJobs");
    await addDoc (myjobsRef,{
      location: item.location,
        amount: item.amount,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        time:  item.time,
        date:  item.date,
        status:status,
    })

    navigation.navigate("MyJobs");


  }catch (error) {
    console.error('Error adding job:', error);
  }
  };

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/background.png")}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        
        <View style={styles.contentContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.category}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/location.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Location:</Text>
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/description.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Description:</Text>
                <Text style={styles.detailText}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/time.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Time:</Text>
                <Text style={styles.detailText}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/amount.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Amount:</Text>
                <Text style={styles.detailText}>{item.amount}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addOrBuyContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <View
          style={{
            backgroundColor: "rgba(31, 91, 95, 0.8)",
            width: 190,
            height: 50,
            // marginLeft: 1.5,
            borderRadius: 23,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text style={styles.text1}>Cancel</Text>
        </View>
      </Pressable>
      <Pressable onPress={handleRequest} >
        <View
          style={{
            backgroundColor: "#1F5B5F",
            width: 180.5,
            height: 50,
            marginRight: 1,
            borderRadius: 23,
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <Text style={styles.text2}>Request</Text>
        </View>
      </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 2,
  },
  contentContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 90,
    width:300,
    height: 680
  },
  artworkImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    resizeMode: "cover",
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
  },
  date: {
    fontSize: 17,
    fontWeight: "300",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailView: {
    marginLeft: 20,
    width: 280
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  detailText: {
    fontSize: 18,
    fontWeight: "400",
  },
  addOrBuyContainer: {
    margin: 5,
  },
  addOrBuyContainer: {
    flexDirection: "row",
    // backgroundColor: "gray",
    width: "95%",
    // height: 60,
    alignSelf: "center",
    borderRadius: 23,
    marginBottom: 5,
    marginLeft: -5,
    marginLeft: 12,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },

});

export default JobDetails;

