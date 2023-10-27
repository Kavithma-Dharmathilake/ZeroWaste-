import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";



const WasteMgtHome = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const nextCollectionData = {
    date: "30th",
    month: "OCTOBER",
    time: "07:30-08:30",
  };

 return(

 
 <ImageBackground
      source={require("../../../assets/images/wasteManagement/Home.png")}
      style={{ width: "100%", height: "100%" }}
    >
        <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>Waste Management Services</Text>
        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => navigation.navigate("SchedulePickUp")}
        >
           <Image style={styles.img} source={require("../../../assets/images/wasteManagement/notification_icon.png")} />
         
        </TouchableOpacity>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <Text style={styles.upcomingScheduleText}>Upcoming schedule dates</Text>

      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.nextCollectionText}>Next Collection</Text>
          <View style={styles.circle}>
            <Text style={styles.circleDate}>{nextCollectionData.date}</Text>
          </View>
          <Text style={styles.cardMonthText}>{nextCollectionData.month}</Text>
          <Text style={styles.cardTimeText}>{nextCollectionData.time}</Text>
        </View>
      </View>

      <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, marginLeft: 30, marginBottom: 20 }}>What can we do for you?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCard}
          onPress={() => navigation.navigate("SchedulePickUp")}
        >
           <Image style={styles.img} source={require("../../../assets/images/wasteManagement/schedule_bin.png")} />
          <Text style={styles.buttonText}>Schedule a Pick Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCard}
          onPress={() => navigation.navigate("ViewSchedule")}
        >
           <Image style={styles.img} source={require("../../../assets/images/wasteManagement/view_schedule_h.png")} />
          <Text></Text>
          <Text style={styles.buttonText} margin='3'>View Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCard}
          onPress={() => navigation.navigate("NearestBin")}
        >
           <Image style={styles.img} source={require("../../../assets/images/wasteManagement/nearest_bin.png")} />
          <Text style={styles.buttonText}>Nearest Bin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCard}
          onPress={() => navigation.navigate("BinSummary")}
        >
           <Image style={styles.img} source={require("../../../assets/images/wasteManagement/bin_summary.png")} />
          <Text style={styles.buttonText}>Bin Summary</Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
 );
  
};

const styles = StyleSheet.create({
    headerContainer: {
      position: "absolute",
      top: 50,
      left: 20,
      zIndex: 1,
    },
    greetingText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
    dateText: {
      fontSize: 14,
      color: "white",
    },
    upcomingScheduleText: {
        marginTop: 120,
        marginStart: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
      },
      cardContent: {
        alignItems: "center",
      },
      nextCollectionText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft:-20
      },
      cardContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: "#FFB64A",
        borderRadius: 10,
      },
      circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#33807C",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginStart:-230,
        marginTop:-10
      },
      circleDate: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
      },
      cardMonthText: {
        fontSize: 24,
        marginTop:-60,
        fontWeight: "bold",
        color: "white",
        marginLeft:-20
      },
      cardTimeText: {
        fontSize: 14,
        marginTop: 20,
        marginEnd:-200,
        color: "white",
        fontWeight: "bold",

      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly", // Adjust the spacing between the cards
        flexWrap: "wrap", // Allow cards to wrap to the next line
        marginTop: 10,
      },
      buttonCard: {
        width: 160,
        height: 148,
        backgroundColor: "#136A66CC", // Change the background color
        marginVertical: 5, // Add vertical margin between cards
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white", // Text color
        margin:10,
      },
      bellButton:{
        position:"absolute",
        marginStart:330
      }
     
  });

export default WasteMgtHome;