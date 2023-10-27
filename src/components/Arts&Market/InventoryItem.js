import React, { useEffect, useState, forwardRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

// Initialize Firebase
const db = getFirestore();

const InventoryItem = forwardRef(({ navigation }, ref) => {
  const [salesItems, setSalesItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add this state variable

  const fetchSalesItems = async () => {
    try {
      const salesItemsRef = collection(db, "sales");
      const querySnapshot = await getDocs(salesItemsRef);

      const fetchedSalesItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.imageUrl) {
          fetchedSalesItems.push({
            id: doc.id,
            itemName: data.itemName,
            imageUrl: data.imageUrl,
            itemPrice: data.itemPrice,
            description: data.description,
          });
        } else {
          console.warn(`Missing imageUrl for document with ID: ${doc.id}`);
        }
      });

      setSalesItems(fetchedSalesItems);

      if (fetchedSalesItems.length > 0) {
        console.log("First imageUrl:", fetchedSalesItems[0].imageUrl);
      }
    } catch (error) {
      console.error("Error fetching sales items:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Delete the document from the 'sales' collection
      await deleteDoc(doc(db, "sales", itemId));

      // Set refreshing to true to trigger a re-render
      setRefreshing(true);

      // Refresh the list after deletion
      fetchSalesItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      // Set refreshing back to false after the refresh is complete
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSalesItems();
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchSalesItems();

      const reloadInterval = setInterval(fetchSalesItems, 5 * 60 * 1000);

      return () => clearInterval(reloadInterval);
    }, [refreshing])
  );

  return (
    <FlatList
      ref={ref}
      data={salesItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={styles.artworkImageContainer}
          onPress={() => navigation.navigate("Product", { item: item })}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />
          <View style={styles.detailView}>
            <Text
              style={{
                fontSize: 18,
                marginHorizontal: 2,
                fontWeight: "500",
              }}
            >
              {item.itemName}
            </Text>
            <Text style={{ fontSize: 18, marginLeft: 2, fontWeight: "500" }}>
              {item.itemPrice}$
            </Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                marginLeft: 100,
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("UpdateItem", { item: item })
                }
              >
                <Image
                  source={require("../../../assets/artgallery/images/edit.png")}
                  style={{ width: 40, height: 40 }}
                />
              </Pressable>

              <Pressable
                onPress={() => handleDeleteItem(item.id)}
                style={styles.bottons}
              >
                <Image
                  source={require("../../../assets/artgallery/images/delete.png")}
                  style={{ width: 35, height: 35 }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing} // Add this prop
      onRefresh={() => setRefreshing(true)} // Add this prop
    />
  );
});

export default InventoryItem;

const styles = StyleSheet.create({
  artworkImageContainer: {
    backgroundColor: "rgba(211, 211, 211, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    width: "48%",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    marginLeft: 5,
    alignItems: "left",
    paddingVertical: 20,
    overflow: "hidden",
  },
  artworkImage: {
    marginTop: -19.5,
    width: 198,
    height: 220,
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  detailView: {
    flexDirection: "column",
    marginHorizontal: 5,
    marginBottom: -10,
  },
  bottons: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
});
