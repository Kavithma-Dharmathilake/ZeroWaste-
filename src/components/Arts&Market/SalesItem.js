import React, { useEffect, useState, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

// Initialize Firebase
const db = getFirestore();

const SalesItem = forwardRef(({ navigation }, ref) => {
  const [salesItems, setSalesItems] = useState([]);

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

  useEffect(() => {
    fetchSalesItems();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchSalesItems();

      const reloadInterval = setInterval(fetchSalesItems, 5 * 60 * 1000);

      return () => clearInterval(reloadInterval);
    }, [])
  );

  return (
    <View>
      {/* SearchBar */}
      <FlatList
        ref={ref}
        data={salesItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Product", { item: item })}
            style={styles.artworkImageContainer}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.artworkImage}
            />
            <View style={styles.detailView}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {item.itemName}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {item.itemPrice}$
              </Text>
            </View>
          </Pressable>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

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
    marginBottom: -10,
    marginHorizontal: 5,
  },
});

export default SalesItem;
