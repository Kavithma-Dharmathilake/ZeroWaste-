import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomNavigationMarket = ({ onPressScrollToTop }) => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#36797D" }}>
      <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("JobHistory")}>
          <Image
            style={styles.icon3}
            source={require("../../../assets/jobMarket/history.png")}
          />
        </Pressable>
        
        <Pressable onPress={() => navigation.navigate("AddJob")}>
          <Image
            style={styles.icon}
            source={require("../../../assets/jobMarket/Addicon.png")}
          />
        </Pressable>
        
        <Pressable onPress={() => navigation.navigate("MyJobs")}>
          <Image
            style={styles.icon2}
            source={require("../../../assets/jobMarket/myjob.png")}
          />
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
    height: 60,
    alignSelf: "center",
    borderRadius: 23,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 88,
    height: 85,
    marginBottom: 5,
    marginRight: 18,
  },
  icon3: {
    width: 35,
    height: 35,
    marginBottom: 5,
    marginRight: 18,
    marginLeft: 50,
    paddingLeft:40
  },
  icon2: {
    width: 40,
    height: 40,
    marginBottom: 5,
    marginRight: 18,
    marginRight:50
  },
});
