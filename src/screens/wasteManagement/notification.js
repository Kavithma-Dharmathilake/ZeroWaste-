import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const Notification = () => {
  const navigation = useNavigation();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const scheduleRef = collection(db, "requests");
    const q = query(scheduleRef);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const data = [];

        querySnapshot.forEach((doc) => {
          const { name, massage } = doc.data();

          data.push({
            id: doc.id,
            name,
            massage,
          });
        });

        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCard = (item) => (
    <View style={styles.cardContainer}>
      <Image style={styles.locationIcon} source={require("../../../assets/images/wasteManagement/request_n.png")} />
      <View style={styles.cardContent}>
        <View style={styles.startLocationContainer}>
          <Text style={styles.dateText}>Hi {item.name}</Text>
        </View>
        <View style={styles.text}>
          <Text >Your request is {item.massage}</Text>
        </View>
        <Text style={styles.textNew}>22 min ago</Text>
      </View>
    </View>
  );

  console.log("Rendering ViewSchedule component");

  return (
    <ImageBackground
      source={require("../../../assets/images/wasteManagement/View_Schedule.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/wasteManagement/left.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      <FlatList
        data={scheduleData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderCard(item)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 30,
  },
  backIcon: {
    margin: 15,
  },
  cardContent: {
    
    marginLeft: -50, // Adjust the margin to create the desired layout
  },
  cardContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 130,
    shadowColor: "grey",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#c8c7cc",
    flexDirection: "row", // Set flexDirection to "row" for horizontal layout
  },
  startLocationContainer: {
    flexDirection: "column", // Set flexDirection to "column" for vertical layout
  },
  locationIcon: {
    margin: 10,
    marginLeft:-40
    
  },
  dateText: {
    fontSize: 16,
    marginTop:10,
    marginLeft:10,
  },
  text: {
    margin: 10,
  },
  textNew:{
    marginStart:150,
    color:"#bdbdbd"
  }
});

export default Notification;
