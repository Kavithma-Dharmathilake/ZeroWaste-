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
import ModalDropdown from "react-native-modal-dropdown"; // Import the dropdown component


// Initialize Firebase
const db = getFirestore();

const JobItem = forwardRef(({ navigation }, ref) => {
  const [salesItems, setSalesItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSalesItems = async () => {
    try {
      const salesItemsRef = collection(db, "myJobs");
      const querySnapshot = await getDocs(salesItemsRef);

      const fetchedSalesItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.imageUrl) {
          fetchedSalesItems.push({
            id: doc.id,
            location: data.location,
            amount: data.amount,
            description: data.description,
            imageUrl: data.imageUrl,
            category: data.category,
            time: data.time,
            date: data.date,
            // status: data.status,
          });
        } else {
          console.warn(`Missing imageUrl for document with ID: ${doc.id}`);
        }
      });

      setSalesItems(fetchedSalesItems);
      setLoading(false); // Set loading to false when data is fetched successfully.

      if (fetchedSalesItems.length > 0) {
        console.log("First imageUrl:", fetchedSalesItems[0].imageUrl);
      }
    } catch (error) {
      console.error("Error fetching sales items:", error);
      setLoading(false); // Set loading to false in case of an error.
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

  if (loading) {
    // You can render a loading indicator here
    return <Text>Loading...</Text>;
  }







  return (
    <View style={{marginTop:10}}>
      <FlatList
        ref={ref}
        data={salesItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            // onPress={() => navigation.navigate("", { item: item })}
            style={styles.artworkImageContainer}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />
            
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/location.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Location:</Text>
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/time.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Time:</Text>
                <Text style={styles.detailText}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/amount.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Amount:</Text>
                <Text style={styles.detailText}>{item.amount}</Text>
              </View>
            </View>
            
            <View style={styles.detailRowst}>
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Status:</Text>
              </View>
            </View>
            <ModalDropdown
              options={["Requested", "Approved", "Rejected"]} 
              defaultIndex={0} // Set the default value to "requested"
              defaultValue={"Requested"}
              onSelect={(index, value) => {
                // Handle status selection here, e.g., update it in Firestore
                console.log("Selected Status: ", value);
              }}
              style={styles.dropdownStyle} // Apply custom styles to the dropdown
              textStyle={styles.dropdownTextStyle} // Apply styles to the dropdown text
              dropdownStyle={styles.dropdownContainer} // Apply styles to the dropdown container
              dropdownTextStyle={styles.dropdownText} 
            />
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
});

const styles = StyleSheet.create({
  artworkImageContainer: {
    backgroundColor: "rgba(211, 211, 211, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    width: "45%",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    marginLeft: 5,
    alignItems: "left",
    paddingVertical: 20,
    overflow: "hidden",
    width: 180,
    height: 380,
    marginLeft: 16,
    marginTop:5
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 1,
    backgroundColor: '#F3AF4A',
    marginLeft:20,
    width: 140
  },
  dropdownTextStyle: {
    fontSize: 16,
    color: 'black',
    marginLeft:33,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
  },
  detailRowst:{
    marginLeft:60
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
  },
  artworkImage: {
    marginTop: -20,
    width: 180,
    height: 140,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 0,
  },
  detailView: {
    flexDirection: "column",
    marginHorizontal: 5,
    marginTop:8
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,

  },
});

export default JobItem;
