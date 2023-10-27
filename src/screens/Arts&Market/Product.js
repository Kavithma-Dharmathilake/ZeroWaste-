import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import NumericInput from "react-native-numeric-input";
import AddOrBuy from "../../components/Arts&Market/Add&Buy";

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
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
              <View style={{ flexDirection: "row", left: 258 }}>
                <Pressable onPress={() => navigation.navigate("AddToCart")}>
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
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={require("../../../assets/artgallery/images/ProfileUp.png")}
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
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                marginLeft: 5,
                marginRight: 5,
                borderTopLeftRadius: 56,
                borderTopRightRadius: 56,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  height: 382,
                  width: 383,
                  left: -16,
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: 402,
                    height: "100%",
                    borderTopLeftRadius: 56,
                    borderTopRightRadius: 56,
                    resizeMode: "cover",
                  }}
                />
              </View>
              <View
                style={{
                  // backgroundColor: "gray",
                  flexDirection: "row",
                  marginLeft: -15,
                  width: 400,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "700",
                      marginLeft: 5,
                      fontFamily: "Roboto",
                    }}
                  >
                    {item.itemName}
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: "red",
                    width: 150,
                    marginRight: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "700",
                      fontFamily: "Roboto",
                      // marginLeft: 125,
                    }}
                  >
                    {item.itemPrice}$
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 21,
                    marginLeft: -8,
                    marginTop: 5,
                    fontFamily: "Roboto",
                  }}
                >
                  Quantity:
                </Text>
                <NumericInput
                  onChange={(value) => setQuantity(value)}
                  value={quantity}
                  totalWidth={100}
                  totalHeight={35}
                  rounded
                  containerStyle={{
                    marginLeft: 10,
                    marginTop: 8,
                    borderWidth: 0,
                    backgroundColor: "white",
                  }}
                  rightButtonBackgroundColor={
                    isClicked ? "transparent" : "#487C7F"
                  } // Change color on click
                  leftButtonBackgroundColor={
                    isClicked ? "transparent" : "#487C7F"
                  } // Change color on click
                  onPress={handleButtonClick} // Handle click event
                  minValue={0}
                />
              </View>
              <Text
                style={{
                  marginLeft: -8,
                  marginTop: 5,
                  fontSize: 20,
                  fontWeight: "500",
                  fontFamily: "Roboto",
                }}
              >
                Descripton:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 2,
                  // marginLeft: 8,
                  width: "100%", // Adjust the width as needed
                  textAlign: "justify", // Spread the text across the available width
                  color: "rgba(0, 0, 0, 0.7)",
                  fontFamily: "Roboto",
                }}
              >
                {item.description}
                {"\n"}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View
          style={{ backgroundColor: "white", marginLeft: 5, marginRight: 5 }}
        >
          {/* Pass the 'item' and 'quantity' as props to AddOrBuy component */}
          <AddOrBuy item={item} quantity={quantity} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});
