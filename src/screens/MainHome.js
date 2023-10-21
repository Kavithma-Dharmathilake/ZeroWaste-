import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const MainHome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/artgallery/background.png")}
        style={{ flex: 1, textAlign: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.heading}>Home</Text>
            <Text style={styles.heading2}>Hi, Mrs. Kavi !</Text>
            <Text style={{ color: "white", marginLeft: 50 }}>
              11 October 2023
            </Text>
          </View>
          <View>
            <FontAwesome
              name="user"
              color="white"
              size={30}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.bg}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 30,
              marginBottom: 20,
            }}
          >
            What can we do for you?
          </Text>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.box2}>
                <Image
                  style={styles.img}
                  source={require("../../assets/logos/scheduler.png")}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.button}
              >
                <Text style={styles.text}>Waste Management</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={styles.box2}>
                <Image
                  style={styles.img}
                  source={require("../../assets/logos/voluntter.png")}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("VHome")}
                style={styles.button}
              >
                <Text style={styles.text}>Volunteer</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.box2}>
                <Image
                  style={styles.img}
                  source={require("../../assets/logos/artgallery.png")}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ArtSplash")}
                style={styles.button}
              >
                <Text style={styles.text}>ArtGallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={styles.box2}>
                <Image
                  style={styles.img}
                  source={require("../../assets/logos/jobmarket.png")}
                />
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Job Market</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "white",
    height: 700,
    marginTop: 50,
    paddingTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    flexDirection: "row",
    marginLeft: 45,
  },
  box: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 30,
  },
  box2: {
    backgroundColor: "#36797D",
    padding: 30,
    height: 120,
    width: 140,
    borderRadius: 15,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 15,
  },
  button: {
    flex: 1,
    backgroundColor: "#136A66",
    padding: 15,
    borderRadius: 30,
    width: 140,
    height: 50,
    margine: -10,
  },
  img: {
    height: 60,
  },
  heading: {
    color: "white",
    padding: 6,
    marginTop: 40,
    marginLeft: 150,
    fontSize: 20,
  },
  heading2: {
    color: "white",
    padding: 6,
    marginTop: 10,
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 22,
  },
  icon: {
    marginTop: 100,
    marginLeft: 100,
  },
});
