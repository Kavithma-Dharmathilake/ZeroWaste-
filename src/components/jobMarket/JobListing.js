import React, { useEffect, useState, forwardRef } from "react";
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
import ModalDropdown from "react-native-modal-dropdown"; // Import the dropdown component


// Initialize Firebase
const db = getFirestore();

const JobListing = forwardRef(({ navigation }, ref) => {
  const [salesItems, setSalesItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSalesItems = async () => {
    try {
      const salesItemsRef = collection(db, "myListings");
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


  const handleDeleteItem = async (itemId) => {
    try {
      // Delete the document from the 'sales' collection
      await deleteDoc(doc(db, "jobs", itemId));
      await deleteDoc(doc(db, "myListings", itemId));
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




  return (
    <View style={{marginTop:60}}>
      
      <FlatList
        ref={ref}
        data={salesItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            // onPress={() => navigation.navigate("", { item: item })}
            style={styles.artworkImageContainer}
          >
            <View>
              <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />


              <View style={styles.buttons}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("UpdateJobScreen", { item: item })
                  }
                >
                  <Image
                    source={require("../../../assets/jobMarket/editJob.png")}
                    style={{ width: 35, height: 35, marginHorizontal: 10 }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Message")}
                  style={styles.bottonsc}
                >
                  <Image
                    source={require("../../../assets/jobMarket/chat.png")}
                    style={{ width: 50, height: 50,marginVertical: -8 }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => handleDeleteItem(item.id)}
                  style={styles.bottons}
                >
                  <Image
                    source={require("../../../assets/jobMarket/del.png")}
                    style={{ width: 25, height: 30 }}
                  />
                </Pressable>
                
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
            <View>
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

            <View style={styles.detailRow}>
              <Image
                source={require("../../../assets/jobMarket/cleaner.png")}
                style={styles.icon}
              />
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>Requetser</Text>
                <Text style={styles.detailText}>Lasen Hewage</Text>
                
              </View>
            </View>
            <Image
                source={require("../../../assets/jobMarket/star.png")}
                style={styles.icon1}
              />
            
          </View>
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
    width: 380,
    height: 310,
    marginLeft: 16,
    marginTop:60,
    flexDirection:"row"
  },
  buttons:{
    flexDirection: "row",
    marginLeft: 22,
    marginTop:49
  },
  bottonsc:{
    flexDirection: "row",
    marginLeft: 0,
    marginRight:10,
    marginBottom:10
    
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
    marginTop:10
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
  },
  artworkImage: {
    marginTop: 15,
    width: 120,
    height: 100,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 30,
    marginRight:30
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
  icon1: {
    width: 120,
    height: 23,
    marginRight: 10,
    marginTop: 0,
    marginLeft: 53,

  },
});

export default JobListing;
