import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigation = ({ onPressScrollToTop }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View style={{ marginLeft: 5, marginRight: 5 }}>
          <Entypo name="home" size={40} color="black" />
        </View>
      </Pressable>
      <Pressable onPress={onPressScrollToTop}>
        <View style={{ marginLeft: 3, marginRight: 5 }}>
          <FontAwesome name="chevron-up" size={37} color="#000" />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("AddArts")}>
        <Image
          style={styles.icon}
          // source={require("../../assets/images/plus4.png")}
          source={require("../../../assets/artgallery/images/add1.png")}
        />
      </Pressable>
      {/* <View style={{ marginLeft: 5, marginRight: 6 }}> */}
      <Pressable onPress={() => navigation.navigate("Market")}>
        <FontAwesome5 name="store" size={30} color="black" />
      </Pressable>
      {/* </View> */}
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={{ marginLeft: 5, marginRight: 12 }}
      >
        <FontAwesome5 name="user-alt" size={30} color="black" />
      </Pressable>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "97%",
    height: 55,
    alignSelf: "center",
    borderRadius: 23,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 85,
    height: 85,
    marginBottom: 5,
    marginRight: 14,
    marginTop: 3,
  },
});
