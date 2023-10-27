// UpdateDetailsPopup.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, } from "react-native";
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


const data = [
  { label: "Food Waste", value: "food_waste" },
  { label: "Electrical Waste", value: "electrical_waste" },
  { label: "Medical Waste", value: "medical_waste" },
];

const UpdateDetailsPopup = ({ visible, onClose, onAddDetails,onSuccess  }) => {
  const [typeOfWaste, setTypeOfWaste] = useState("");
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState("");
 
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
   // Date picker
   const [date, setDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);

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


  const handleAddDetails= async () => {
 
    // Perform validation to check if all required fields are filled out
    if (!value) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const db = getFirestore(); // Initialize Firestore

      const pickupsCollection = collection(db, "updateBin"); // Reference to the "scheduledPickups" collection

      // Create an object representing the new pickup data
      const newBinUpdate = {
        wasteType: value,
        quantity:quantity,
        date: date.toDateString(),
        timestamp: serverTimestamp(), // Use serverTimestamp for Firestore timestamp
      };

      // Add the new pickup document to the "scheduledPickups" collection
      await addDoc(pickupsCollection, newBinUpdate);

      // Display a success message
    alert("Bin Update submitted successfully");

      // Clear the form
      setValue(null);
      setQuantity("");
      setDate(new Date());
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("An error occurred while submitting your request.");
    }
  };
 

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
     
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
 
      <View style={styles.outerContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={[styles.input, { marginTop: 0 }] /* Adjust the marginTop value */}
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
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
        <Button title="Submit" onPress={handleAddDetails} />
        <Text></Text>
        <Button title="Close" onPress={onClose} />
      </View>
      </View>
      </View>
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 240,
    borderRadius:15,
    height:550,
  
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
   
    
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    padding: 10,
  },
  coordinatesContainer: {
    marginTop: 8,
    marginBottom:15,
  },
  label: {
    marginStart:5,
    fontSize:15,
    fontWeight: "bold",
    marginTop:15,
    marginBottom:10,
   },
   locationContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:20,
  },
  submitButton: {
    marginTop: 20,
    width: 200, // Adjust the width as needed
    alignSelf: "center",
    backgroundColor: "#136A66",
  },
});

export default UpdateDetailsPopup;
