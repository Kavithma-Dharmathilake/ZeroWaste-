import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          <View style={{ flexDirection: "row", marginTop: -3 }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require("../../../assets/artgallery/images/back-Arrow.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginHorizontal: 6,
                  marginVertical: 10,
                }}
              />
            </Pressable>
            <View style={{ flexDirection: "row", left: 260 }}>
              <Pressable>
                <Image
                  source={require("../../../assets/artgallery/images/CartUp.png")}
                  style={{
                    width: 48,
                    height: 48,
                    marginRight: -2,
                    marginVertical: 10,
                  }}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../../../assets/artgallery/images/Home2.png")}
                  style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: 6,
                    marginVertical: 10,
                  }}
                />
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              fontSize: 26,
              marginLeft: 10,
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            Mr.Perera
          </Text>
          <View style={{ marginTop: 10 }}>
            <Pressable onPress={() => navigation.navigate("MyOrders")}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  width: "95%",
                  height: 160,
                  marginHorizontal: 10,
                  borderRadius: 25,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/artgallery/images/checklist.png")}
                  style={{
                    width: 160,
                    height: 160,
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 26,
                    marginLeft: 10,
                    fontWeight: "400",
                  }}
                >
                  My orders
                </Text>
              </View>
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: 26,
              marginLeft: 10,
              fontWeight: "bold",
              marginTop: 10,
              fontFamily: "Roboto",
            }}
          >
            Store Name
          </Text>
          <View style={{ marginTop: 10 }}>
            <Pressable onPress={() => navigation.navigate("RecivedOrders")}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  width: "95%",
                  height: 160,
                  marginHorizontal: 10,
                  borderRadius: 25,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/artgallery/images/procurement.png")}
                  style={{
                    width: 160,
                    height: 160,
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 26,
                    marginLeft: 10,
                    fontWeight: "400",
                    fontFamily: "Roboto",
                  }}
                >
                  Receive orders
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Inventory")}>
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  width: "95%",
                  height: 160,
                  marginHorizontal: 10,
                  borderRadius: 25,
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/artgallery/images/box.png")}
                  style={{
                    width: 150,
                    height: 150,
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 26,
                    marginLeft: 20,
                    fontWeight: "400",
                  }}
                >
                  Inventory
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});
