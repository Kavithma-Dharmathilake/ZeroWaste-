import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../index";

const AddorBuy = ({ item, quantity }) => {
  const navigation = useNavigation();

  const id = item.id;
  const totalGlobal = item.itemPrice;

  // Initialize selectedItems as an empty array
  const [selectedItems, setSelectedItems] = useState([]);

  // Log to console for debugging purposes
  console.log(totalGlobal);
  console.log(item.id);
  console.log(selectedItems);

  // useEffect to update selectedItems when the component is loaded
  useEffect(() => {
    // Update selectedItems when the component is loaded
    setSelectedItems([
      ...selectedItems,
      {
        id: item.id,
        imageUrl: item.imageUrl,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        quantity: quantity,
      },
    ]);
  }, []);

  const handleAddToCart = async () => {
    try {
      const cartItemsRef = collection(db, "cartItems");

      await addDoc(cartItemsRef, {
        imageUrl: item.imageUrl,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        quantity: quantity,
      });

      Alert.alert(
        "Successfully added ...!",
        null,
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        {
          titleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "green",
          },
          containerStyle: {
            backgroundColor: "lightyellow",
          },
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleAddToCart}>
        <View
          style={{
            backgroundColor: "rgba(31, 91, 95, 0.8)",
            width: 190,
            height: 50,
            borderRadius: 23,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text style={styles.text1}>Add to cart</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("BuyNow", { selectedItems, totalGlobal })
        }
      >
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
          <Text style={styles.text2}>Buy now</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AddorBuy;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    borderRadius: 23,
    marginBottom: 5,
    marginLeft: -5,
    alignItems: "center",
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
