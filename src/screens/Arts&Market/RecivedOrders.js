import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../index";

const RecivedOrders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [acceptMessageVisible, setAcceptMessageVisible] = useState(false);
  const [rejectMessageVisible, setRejectMessageVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleAccept = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        orderStatus: "Accepted...",
      });

      // Show a confirmation message for 3 seconds
      setAcceptMessageVisible(true);
      setTimeout(() => setAcceptMessageVisible(false), 3000);
    } catch (error) {
      console.error("Error accepting order:", error);
    }

    // Reload the orders after the order has been accepted
    fetchOrders();
  };

  const handleReject = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        orderStatus: "Rejected...",
      });

      // Show a confirmation message for 3 seconds
      setRejectMessageVisible(true);
      setTimeout(() => setRejectMessageVisible(false), 3000);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }

    // Reload the orders after the order has been rejected
    fetchOrders();
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
    <SafeAreaView>
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
              <Text style={styles.cart}>Orders (3)</Text>
            </View>
            <View style={styles.totalOrders}>
              <Text style={styles.total}>Total orders: {orders.length}</Text>
            </View>

            {orders.map((order) => (
              <View style={styles.cartItem} key={order.id}>
                <Image source={{ uri: order.imageUrl }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{order.itemName}</Text>
                  <Text style={styles.quantity}>
                    Quantity: {order.quantity}
                  </Text>
                  <Text style={styles.price}>${order.itemPrice}</Text>
                  <Text
                    style={[styles.status, getStatusColor(order.orderStatus)]}
                  >
                    {order.orderStatus}
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <Pressable onPress={() => handleReject(order.id)}>
                    <View style={styles.outline}>
                      <Image
                        source={require("../../../assets/artgallery/images/remove2.png")}
                        style={styles.buts}
                      />
                    </View>
                  </Pressable>
                  <Pressable onPress={() => handleAccept(order.id)}>
                    <View style={styles.outline}>
                      <Image
                        source={require("../../../assets/artgallery/images/correct2.png")}
                        style={styles.buts}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        {acceptMessageVisible && (
          <View style={styles.message}>
            <Text style={styles.messageText}>Order Accepted</Text>
          </View>
        )}

        {rejectMessageVisible && (
          <View style={styles.message}>
            <Text style={styles.messageText}>Order Rejected</Text>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
  buts: {
    width: 42,
    height: 42,
  },
  outline: {
    marginHorizontal: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginHorizontal: 5,
    width: "28%",
    height: 50,
    right: 90,
    marginBottom: 10,
    top: 5,
  },
  cart: {
    fontSize: 28,
    color: "lightgray",
    fontWeight: "700",
    fontFamily: "Roboto",
    marginLeft: 5,
    marginBottom: 5,
  },
  totalOrders: {
    backgroundColor: "#E1A245",
    alignSelf: "flex-end",
    marginHorizontal: 5,
    width: "auto",
    height: 50,
    alignItems: "center",
    borderRadius: 12,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    marginBottom: 5,
  },
  total: {
    fontSize: 28,
    color: "#000",
    fontFamily: "Roboto",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
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
  },
  message: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    alignItems: "center",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
});

export default RecivedOrders;
