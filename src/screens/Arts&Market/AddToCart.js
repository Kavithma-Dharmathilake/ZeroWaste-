import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import CartItem from "../../components/Arts&Market/CartItem";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../index";
import CheckOut from "../../components/Arts&Market/CkeckOut";

const AddToCart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [countGlobal, setCountGlobal] = useState(0);
  const [showDeletedAlert, setShowDeletedAlert] = useState(false);

  const fetchCartItems = async (forceReload = false) => {
    try {
      const cartItemsCollection = collection(db, "cartItems");
      const cartItemsSnapshot = await getDocs(cartItemsCollection);
      const fetchedCartItems = cartItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        imageUrl: doc.data().imageUrl,
        itemName: doc.data().itemName,
        itemPrice: doc.data().itemPrice,
        quantity: doc.data().quantity,
      }));
      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeletePress = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove the selected items?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const itemIds = selectedItemIds;

            itemIds.forEach(async (itemId) => {
              try {
                const itemDocRef = doc(db, "cartItems", itemId);
                await deleteDoc(itemDocRef);
              } catch (error) {
                console.error("Error deleting item:", error);
              }
            });

            setSelectedItems([]);
            fetchCartItems(true);

            setShowDeletedAlert(true);
            setTimeout(() => {
              setShowDeletedAlert(false);
            }, 3000);
          },
        },
      ]
    );
  };

  const handleCheckoutPress = () => {
    if (totalGlobal > 0) {
      Alert.alert(
        "Confirm Checkout",
        "Are you sure you want to checkout the selected items?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              // Remove the selected items from the database
              selectedItems.forEach(async (item) => {
                try {
                  const itemDocRef = doc(db, "cartItems", item.id);
                  await deleteDoc(itemDocRef);
                } catch (error) {
                  console.error("Error deleting item:", error);
                }
              });

              // Navigate to the BuyNow screen
              navigation.navigate("BuyNow", { selectedItems, totalGlobal });

              // Clear the selected items and reset the total
              setSelectedItems([]);
              setTotalGlobal(0);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Please select items.",
        "You need to select items before checkout."
      );
    }
  };

  const toggleItemSelection = (itemId, itemDetails) => {
    setSelectedItemIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(itemId)) {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item) => item.id !== itemId)
        );
        return prevSelectedIds.filter((id) => id !== itemId);
      } else {
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          itemDetails,
        ]);
        return [...prevSelectedIds, itemId];
      }
    });
  };

  const calculateTotalAndCount = () => {
    const selectedItems = cartItems.filter((item) =>
      selectedItemIds.includes(item.id)
    );

    const newTotalGlobal = selectedItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );

    const newCountGlobal = selectedItems.length;

    setTotalGlobal(newTotalGlobal);
    setCountGlobal(newCountGlobal);
  };

  const renderItem = ({ item }) => {
    if (!item || typeof item.id === "undefined") {
      console.error("Item or item.id is undefined:", item);
      return null; // or handle this case appropriately
    }

    return (
      <CartItem
        id={item.id}
        item={item}
        onToggleSelection={() => toggleItemSelection(item.id, item)}
        isSelected={selectedItemIds.includes(item.id)}
      />
    );
  };

  // console.log("cartItems", cartItems);
  console.log("selectedItemIds", selectedItemIds);
  console.log(totalGlobal);

  useEffect(() => {
    calculateTotalAndCount();
  }, [selectedItemIds, cartItems]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.cart}>Cart ({cartItems.length})</Text>
            <Pressable onPress={handleDeletePress}>
              <Image
                source={require("../../../assets/artgallery/images/bin1.png")}
                style={{
                  width: 35,
                  height: 35,
                  left: 200,
                  marginVertical: 10,
                }}
              />
            </Pressable>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.container}>
            <View style={{ marginLeft: 15, marginRight: 5 }}>
              <Entypo name="home" size={45} color="black" />
            </View>
            <Text style={styles.total}>${totalGlobal.toFixed(2)}</Text>
            <Pressable onPress={handleCheckoutPress}>
              <View style={styles.checkout}>
                <Text style={{ fontSize: 20, marginTop: 13 }}>
                  Checkout ({countGlobal})
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      {showDeletedAlert && (
        <View style={styles.deletedAlert}>
          <Text style={{ color: "white" }}>Deleted</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
  deletedAlert: {
    position: "absolute",
    top: 750,
    left: 0,
    right: 0,
    backgroundColor: "rgba(192,192,192,0.5)",
    padding: 10,
    alignItems: "center",
  },
  cart: {
    fontSize: 28,
    color: "lightgray",
    fontWeight: "700",
    fontFamily: "Roboto",
    marginLeft: 5,
    marginBottom: 5,
  },
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
    fontFamily: "Roboto",
  },
  checkout: {
    backgroundColor: "#E1A245",
    width: 160,
    height: 53,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: "center",
  },
});

export default AddToCart;
