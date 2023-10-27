import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../index";

const MyOrders = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchOrders();
    }
  }, [isFocused]);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const fetchedOrders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        imageUrl: doc.data().imageUrl,
        itemName: doc.data().itemName,
        itemPrice: doc.data().itemPrice,
        orderStatus: doc.data().orderStatus,
        quantity: doc.data().quantity,
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Accepted...") {
      return { color: "green" };
    } else if (status === "Rejected...") {
      return { color: "red" };
    }
    // For other statuses, no additional styling.
    return {};
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
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
              <Text style={styles.cart}>My orders ({orders.length})</Text>
              <Pressable onPress={() => navigation.navigate("AddToCart")}>
                <Image
                  source={require("../../../assets/artgallery/images/shoppingcartWW.png")}
                  style={{
                    width: 40,
                    height: 40,
                    left: 135,
                    marginVertical: 10,
                  }}
                />
              </Pressable>
            </View>

            {/* Display orders here */}
            {orders.map((order) => (
              <View style={styles.cartItem} key={order.id}>
                <Image source={{ uri: order.imageUrl }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{order.itemName}</Text>
                  <Text style={styles.quantity}>
                    Quantity: {order.quantity}
                  </Text>
                  <Text style={styles.price}>Price: ${order.itemPrice}</Text>
                </View>
                <Text
                  style={[styles.status, getStatusColor(order.orderStatus)]}
                >
                  {order.orderStatus}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
  cart: {
    fontSize: 28,
    color: "lightgray",
    fontWeight: "700",
    fontFamily: "Roboto",
    marginLeft: 5,
    marginBottom: 5,
  },
  cartItem: {
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  image: {
    width: 90,
    height: 95,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  details: {
    width: "60%",
    marginBottom: 20,
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#E1A245",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    color: "#888",
  },
  status: {
    fontSize: 14,
    fontStyle: "italic",
    left: -35,
    top: 35,
  },
});
