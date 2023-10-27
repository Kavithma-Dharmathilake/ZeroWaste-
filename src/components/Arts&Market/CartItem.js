import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const CartItem = ({ item, onToggleSelection }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(false); // Reset isSelected state when the item prop changes
  }, [item]);

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.itemName}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>${item.itemPrice}</Text>
      </View>
      <View style={styles.radio}>
        <RadioButton.Item
          label=""
          color="#F3AF4A"
          uncheckedColor="#000000"
          size={30}
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => {
            setIsSelected(!isSelected);
            onToggleSelection(item.id); // Pass itemId to onToggleSelection
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    // justifyContent: "space-between",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    // marginBottom: 5,
    backgroundColor: "white",
  },
  radio: {
    marginLeft: -20,
  },
  image: {
    width: 90,
    height: 95,
    borderRadius: 10,
    marginTop: -5,
    marginBottom: -5,
  },
  details: {
    width: "60%",
    // alignItems: "flex-start",
    marginBottom: 20,
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#888",
    color: "#E1A245",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    color: "#888",
  },
});

export default CartItem;
