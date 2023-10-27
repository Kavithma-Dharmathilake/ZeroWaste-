import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "@firebase/firestore";
import Card from "../../components/Arts&Market/Cards";
import { RadioButton } from "react-native-paper";
import Modal from "react-native-modal";
import { db } from "../../index";

const BuyNow = ({ route }) => {
  const navigation = useNavigation();
  const { totalGlobal, selectedItems } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const orderStatus = "pending...";

  console.log(selectedItems);
  console.log(totalGlobal);

  const handlePlaceOrder = async () => {
    if (selectedOption) {
      try {
        // Check if selectedItems is an array
        if (!Array.isArray(selectedItems)) {
          throw new Error("Selected items is not an array");
        }

        // Iterate over selectedItems and add each item to the "orders" collection
        for (const selectedItem of selectedItems) {
          await addDoc(collection(db, "orders"), {
            id: selectedItem.id,
            imageUrl: selectedItem.imageUrl,
            itemName: selectedItem.itemName,
            itemPrice: selectedItem.itemPrice,
            quantity: selectedItem.quantity,
            orderStatus: orderStatus,
            // Add other relevant information about the order
            // ...
          });
        }

        console.log("Order placed successfully");
        setAlertVisible(true);
      } catch (error) {
        console.error("Error placing order:", error);
        Alert.alert("Error", "Failed to place the order. Please try again.");
      }
    } else {
      Alert.alert(
        "Select an Option",
        "Please select a payment option before placing the order."
      );
    }
  };

  // Handle navigation to "Market" screen after order is placed
  const handleNavigateToMarket = () => {
    setAlertVisible(false); // Close the alert
    navigation.navigate("Market");
  };

  useEffect(() => {
    // Perform any cleanup or additional effects here
    return () => {
      // Cleanup code, if needed
    };
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text style={styles.payment}>Payment methods</Text>
          </View>
          <Image
            style={styles.plus}
            source={require("../../../assets/artgallery/images/paymentPlus.png")}
          />
        </View>
        <View style={styles.cardListscreen}>
          <Card />
          <Text style={styles.options}>Other options</Text>
          <View style={styles.other}>
            <View style={styles.optionContainer}>
              <Image
                style={styles.otherOp}
                source={require("../../../assets/artgallery/images/other1.png")}
              />
              <View style={styles.radio}>
                <RadioButton.Item
                  label=""
                  color="#F3AF4A"
                  uncheckedColor="#000000"
                  size={30}
                  status={selectedOption === 1 ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectedOption(selectedOption === 1 ? null : 1);
                  }}
                />
              </View>
            </View>

            <View style={styles.optionContainer}>
              <Image
                style={styles.otherOp}
                source={require("../../../assets/artgallery/images/other2.png")}
              />
              <View style={styles.radio}>
                <RadioButton.Item
                  label=""
                  color="#F3AF4A"
                  uncheckedColor="#000000"
                  size={30}
                  status={selectedOption === 2 ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectedOption(selectedOption === 2 ? null : 2);
                  }}
                />
              </View>
            </View>

            <View style={styles.optionContainer}>
              <Image
                style={styles.otherOp}
                source={require("../../../assets/artgallery/images/other3.png")}
              />
              <View style={styles.radio}>
                <RadioButton.Item
                  label=""
                  color="#F3AF4A"
                  uncheckedColor="#000000"
                  size={30}
                  status={selectedOption === 3 ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectedOption(selectedOption === 3 ? null : 3);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 5,
              }}
            >
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>US ${totalGlobal}</Text>
            </View>
            <Pressable onPress={handlePlaceOrder}>
              <View style={styles.placeOder}>
                <Text style={styles.orderText}>Place order</Text>
              </View>
            </Pressable>
          </View>
          <Modal isVisible={isAlertVisible}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>Order Placed</Text>
              <Pressable onPress={handleNavigateToMarket}>
                <View style={styles.okButton}>
                  <Text style={styles.okButtonText}>OK</Text>
                </View>
              </Pressable>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  alertText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#F3AF4A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  screen: {
    flex: 1,
    marginTop: 30,
  },
  total: {
    fontSize: 25,
    fontFamily: "Roboto",
    marginLeft: 10,
    marginRight: 5,
  },
  bottom: {
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255,0.7)",
    // marginLeft: 5,
    // marginHorizontal: 3,
    borderRadius: 5,
    width: "92%",
    height: "15.5%",
    top: 95,
  },
  placeOder: {
    flexDirection: "row",
    width: "90%",
    height: 45,
    backgroundColor: "#F3AF4A",
    borderRadius: 50,
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  orderText: {
    color: "white",
    fontWeight: "700",
    fontFamily: "Roboto",
    fontSize: 22,
    left: 125,
  },
  other: {
    alignItems: "center",
    marginTop: 10,
  },
  otherOp: {
    marginBottom: 5,
  },
  options: {
    fontSize: 22,
    color: "black",
    fontFamily: "Roboto",
    marginLeft: 11,
  },
  payment: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  plus: {
    alignSelf: "center",
    marginLeft: 35,
    width: "100%",
  },
  cardListscreen: {
    top: 150,
    position: "absolute",
    marginLeft: 5,
    marginTop: 5,
  },
  radio: {
    marginLeft: -20,
    top: 20,
    right: 50,
  },
  optionContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
});

export default BuyNow;
