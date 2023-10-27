import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const ViewSchedule = () => {
  const navigation = useNavigation();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const scheduleRef = collection(db, "viewSchedule");
    const q = query(scheduleRef);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const data = [];

        querySnapshot.forEach((doc) => {
          const { date, start, end, time } = doc.data();

          data.push({
            id: doc.id,
            start,
            end,
            date,
            time,
          });
        });

        setScheduleData(data);


      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    console.log("Before fetching data");

    fetchData();

    console.log("After fetching data");

  }, []);

  const renderCard = (item) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
      <View style={styles.startLocationContainer}>
      <Image
          source={require("../../../assets/images/wasteManagement/start.png")} 
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>Start Location: {item.start}</Text>
      </View>
      <View style={styles.startLocationContainer}>
      <Image
          source={require("../../../assets/images/wasteManagement/end.png")} 
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>End Location: {item.end}</Text>
        </View>
        <View style={styles.dateAndTimeContainer}>
        <Text style={styles.dateText}>Date: {item.date}</Text>
        <Text style={styles.timeText}>Time: {item.time}</Text>
      </View>
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
        <Text style={styles.headerTitle}>View Schedule</Text>
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
    marginBottom:30,
  },
  backIcon: {
    margin: 15,
  },
  cardContent: {
    margin:10,
    marginStart:30,
  },
  cardContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height:160,
    shadowColor:"grey",
    borderRadius: 10,
    borderWidth: 0.5, 
    borderColor: "#c8c7cc",
   
  },
  startLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10
  },
  locationIcon: {
    
    marginRight: 20, 
  },
  locationText: {
    fontSize: 16, 
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10,
  },
  dateText: {
    fontSize: 16, 
  },
  timeText: {
    fontSize: 16, 
  },
});

export default ViewSchedule;
