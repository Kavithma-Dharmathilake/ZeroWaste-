import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  
} from "react-native";

import { Button, TextInput } from "react-native-paper";
import UpdateDetailsPopup from "../wasteManagement/UpdateDetailsPopup"
import { useNavigation, useFocusEffect, } from "@react-navigation/native";
import { Card } from "react-native-paper";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { BarChart } from 'react-native-chart-kit';


const fetchWasteData = async () => {
  try {
    const db = getFirestore();
    const binCollection = collection(db, "updateBin");
    const binQuery = query(binCollection);

    const querySnapshot = await getDocs(binQuery);

    const wasteData = {}; // Use an object to store waste type and total quantity

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const wasteType = data.wasteType;
      const quantity = Number(data.quantity); // Parse quantity as a number

      // If the waste type exists in the object, add the quantity, else initialize it
      if (wasteData[wasteType]) {
        wasteData[wasteType] += quantity;
      } else {
        wasteData[wasteType] = quantity;
      }
    });

    console.log("Waste Data:", wasteData);
    return wasteData;
  } catch (error) {
    console.error("Error fetching waste data:", error);
  }
};



const fetchAndSetWasteData = async (setWasteData) => {
  try {
    const data = await fetchWasteData();
    setWasteData(data);
  } catch (error) {
    console.error("Error fetching and setting waste data:", error);
  }
};


const BinSummary = () => {
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);
  const navigation = useNavigation();
  const [wasteData, setWasteData] = useState({});

  useEffect(() => {
    // Fetch waste data when the component mounts
    fetchWasteData().then((data) => {
      setWasteData(data);
      fetchAndSetWasteData(setWasteData);
    });
  }, []); // Empty dependency array ensures the effect runs only once
  useFocusEffect(
    React.useCallback(() => {
      fetchAndSetWasteData(setWasteData);
    }, [])
  );

  // Function to add details to the database (replace with your Firebase logic)
  const addDetailsToDatabase = async (details) => {

    // Implement your logic to add details to the database here
    console.log("Details added to the database:", details);
    try {
      await yourFirebaseUpdateFunction(details);
      fetchAndSetWasteData(setWasteData);
    } catch (error) {
      console.error("Error updating the database:", error);
      // Handle errors as needed
    }
  };
  const chartData = {
    labels: Object.keys(wasteData), // Use waste types as labels
    datasets: [
      {
        data: Object.values(wasteData), // Use quantities as data
      },
    ],
  };


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
        <Text style={styles.headerTitle}>Bin Summary</Text>
      </View>

      <View style={styles.chartContainer}>
     {/* Bar Chart */}
     <BarChart
        data={chartData}
        width={380}
        height={325}
        yAxisLabel="Waste Qty"
        yAxisSuffix="kg"
        chartConfig={{
          backgroundGradientFrom: "#136A66CC",
          backgroundGradientTo: "#FFB64A",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
         
        }}
        verticalLabelRotation={30}
      />

    </View>


      <Card style={styles.card}>
        {Object.keys(wasteData).map((wasteType, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.wasteName}>{wasteType}</Text>
            <Text style={styles.wasteCount}>{wasteData[wasteType]}</Text>
          </View>
        ))}
      </Card>
      <Button
        mode="contained"
        title="Update Bin Summary"
        onPress={() => setUpdatePopupVisible(true)}
        style={styles.submitButton}
      >
       Update Bin Summary
      </Button>
      <Button
          style={[styles.submitButton, { backgroundColor: "#136A66" }] }
          labelStyle={{ color: 'white' }} 
          onPress={() => navigation.navigate("SchedulePickUp")}
      >
        Schedule a Pick Up
      </Button>


      <UpdateDetailsPopup
  visible={updatePopupVisible}
  onClose={() => setUpdatePopupVisible(false)}
  onAddDetails={addDetailsToDatabase}
  onSuccess={() => {
    setUpdatePopupVisible(false);
    fetchAndSetWasteData(setWasteData); // Fetch and update the data
  }}
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
    submitButton: {
      marginTop: 15,
      width: 200, // Adjust the width as needed
      alignSelf: "center",
      backgroundColor: "#136A66",
    },
    card: {
      margin: 20,
      marginTop:10
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      margin:10
    },
    wasteName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    wasteCount: {
      fontSize: 16,
    },
    chartContainer: {
      backgroundColor: "#F0F0F0", // Your desired background color
      margin: 10, // Adjust the margin as needed
      padding: 10, // Optional: Add padding for inner content
    },
});
export default BinSummary
