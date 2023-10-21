import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CkeckOut = ({ totalGlobal, countGlobal }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Total Changed:", totalGlobal);
    console.log("Count Changed:", countGlobal);
  }, [totalGlobal, countGlobal]);
  return (
    <View style={{ backgroundColor: "#36797D" }}>
      <View style={styles.container}>
        <View style={{ marginLeft: 15, marginRight: 5 }}>
          <Entypo name="home" size={45} color="black" />
        </View>
        <Text style={styles.total}>
          {/* $128.00 */}${totalGlobal}
        </Text>
        <Pressable onPress={() => navigation.navigate("")}>
          <View style={styles.checkout}>
            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Checkout ({countGlobal})
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CkeckOut;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "97%",
    height: 65,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 26,
    color: "black",
    // fontWeight: "200",
    fontFamily: "Roboto",
    // marginLeft: 65,
  },
  checkout: {
    backgroundColor: "#E1A245",
    width: 160,
    height: 53,
    marginHorizontal: 5,
    borderRadius: 25,
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
    width: 45,
    height: 45,
    // marginBottom: 4,
    marginRight: -2,
    marginLeft: -4,
  },
});
