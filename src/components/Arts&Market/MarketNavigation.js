import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomNavigationMarket = ({ onPressScrollToTop }) => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#36797D" }}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <View style={{ marginLeft: 5, marginRight: 5 }}>
            <Entypo name="home" size={40} color="black" />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ArtGallery")}>
          <FontAwesome5
            name="image"
            size={35}
            color="black"
            style={{ marginLeft: 15, marginRight: 10 }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("AddItem")}>
          <Image
            style={styles.icon}
            source={require("../../../assets/artgallery/images/add1.png")}
            // source={require("../../assets/images/plus1.png")}
          />
        </Pressable>
        {/* <View style={{ marginLeft: 5, marginRight: 6 }}> */}

        <Pressable onPress={() => navigation.navigate("AddToCart")}>
          <View style={{ marginRight: 10 }}>
            {/* <FontAwesome name="chevron-up" size={37} color="#000" /> */}
            {/* shopping-cart.png */}
            <Image
              style={styles.cart}
              // source={require("../../assets/images/trolley.png")}
              source={require("../../../assets/artgallery/images/shopping-cart.png")}
            />
          </View>
        </Pressable>
        {/* </View> */}
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ marginLeft: 5, marginRight: 12 }}
        >
          <FontAwesome5 name="user-alt" size={30} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default BottomNavigationMarket;

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
    marginRight: 18,
    marginTop: 3,
  },
  cart: {
    width: 43,
    height: 43,
    // marginBottom: 4,
    marginRight: -2,
    marginLeft: -4,
  },
});
