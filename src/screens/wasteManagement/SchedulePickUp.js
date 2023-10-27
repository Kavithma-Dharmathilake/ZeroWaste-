import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Linking,
  Pressable,
  Platform,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"; // Import Firestore functions

import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, TextInput } from "react-native-paper";

const data = [
  { label: "Food Waste", value: "food_waste" },
  { label: "Electrical Waste", value: "electrical_waste" },
  { label: "Medical Waste", value: "medical_waste" },
];

const SchedulePickUp = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // Get current location
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();
  // Date picker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  // Description
  const [description, setDescription] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectDate) => {
    if (event.type === "set") {
      const currentDate = selectDate || date;
      setDate(currentDate);
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  // Focus select waste type
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "green" }]}>
          Select your waste type
        </Text>
      );
    }
    return null;
  };

  // Get current location
  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        getCurrentLocation();
      }
    };
    getLocationPermission();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  // Open map
  const openMaps = () => {
    const { latitude, longitude } = currentLocation;
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      alert("Location not available");
    }
  };

  // Handle description change
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    // Perform validation to check if all required fields are filled out
    if (!value || !currentLocation) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const db = getFirestore(); // Initialize Firestore

      const pickupsCollection = collection(db, "scheduledPickups"); // Reference to the "scheduledPickups" collection

      // Create an object representing the new pickup data
      const newPickup = {
        wasteType: value,
        location: currentLocation,
        date: date.toDateString(),
        description: description,
        timestamp: serverTimestamp(), // Use serverTimestamp for Firestore timestamp
      };

      // Add the new pickup document to the "scheduledPickups" collection
      await addDoc(pickupsCollection, newPickup);

      // Display a success message
      alert("Your bin request has been confirmed.Driver will confirm and let you know soon.");

      // Redirect to the home page or any other desired page
      navigation.navigate("WasteMgtHome");
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("An error occurred while submitting your request.");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/wasteManagement/Home.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/wasteManagement/left.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Pick Up</Text>
      </View>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Type of Waste' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <Text style={styles.label}>Select your Location</Text>
      <View style={styles.locationLabelContainer}>
        
      
        <View style={styles.coordinatesContainer}>
          <Text>Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
          <Text>Longitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text>
        </View>
        </View>
     
      {currentLocation ? (
        <Button
          icon="map"
          mode="contained"
          onPress={openMaps}
          style={styles.mapButton}
        >
          Open Map
        </Button>
      ) : (
        <TouchableOpacity onPress={getCurrentLocation}>
          <View>
            <Button>
            <Text style={styles.label}>Get Location</Text>
            </Button>
          </View>
        </TouchableOpacity>
      )}
       <Text style={styles.label}>Select Date:</Text>
      <View style={styles.locationLabelContainer}>
        <View style={styles.coordinatesContainer}>
       
        <TouchableOpacity onPress={toggleDatePicker}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          label="Type your description here"
          value={description}
          onChangeText={handleDescriptionChange}
          style={[styles.descriptionInput]}
          multiline
          numberOfLines={4} // Adjust the number of lines as needed
          labelStyle={{ color: 'black' }}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleFormSubmit}
        style={styles.submitButton}
      >
        Submit
      </Button>
   
     
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 40,
  },
  locationContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    
  },
  locationLabelContainer: {
    borderWidth: 1, // Add a border to this container
    borderColor: '#C8C8C8', // Border color
    borderRadius: 10, // Border radius
    padding: 8,
    backgroundColor: 'white',
    marginTop: 8,
    width:360,
    marginStart:17
  },
  coordinatesContainer: {
    marginTop: 8,
    marginBottom:15,
  },
  mapButton: {
    marginTop: 20,
    width:360,
    marginStart:17,
    backgroundColor: '#136A66',
    marginBottom:15
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
   marginStart:15,
   fontSize:15,
   fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    marginVertical: 20,
    marginLeft: 30,
    justifyContent: "center",
  },
  descriptionInput: {
    marginVertical: 10,
    backgroundColor: 'white', 
   
  },
  submitButton: {
    marginTop: 20,
    width: 200, // Adjust the width as needed
    alignSelf: "center",
    backgroundColor: "#136A66",
  },
});

export default SchedulePickUp;
