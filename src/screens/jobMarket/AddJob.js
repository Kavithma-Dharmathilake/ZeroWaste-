import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../index";
import { useNavigation } from "@react-navigation/native";


const categories = [
  "Garden Cleaning",
  "Vehicle Cleaning",
  "Land Cleaning",
  "Home Cleaning",
  "Shop Cleaning",
  "Other",
];

const AddJob = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const { item } = route.params;

  const handleAddPress = async () => {
    if (!location || !amount || !description  || !category || !date || !time) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      const salesRef = collection(db, "jobs");
      const newItem = {
        location: location,
        amount: amount,
        description: description,
        imageUrl: imageUri,
        category: category,
        time:time,
        date:date,
        createdAt: serverTimestamp(), // Use serverTimestamp for Firestore timestamp
      };

      await addDoc(salesRef, newItem);

      setLocation("");
      setAmount("");
      setDescription("");
      setImageUri(null);
      setCategory("");
      setTime();
      setDate();

      navigation.navigate("JobMarket");
    } catch (error) {
      console.error("Error saving item:", error);
    }


    try{
      const myjobsRef = collection(db,"myListings");
      await addDoc (myjobsRef,{
        location: location,
          amount: amount,
          description: description,
          imageUrl: imageUri,
          category: category,
          time:  time,
          date:  date,
      })
  
  
    }catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets?.[0] || { uri: result.uri };
      setImageUri(selectedImage.uri);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    toggleModal();
  };

  const renderCategoryModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Category</Text>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.modalOption,
                category === item && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(item)}
            >
              <Text style={{ color: category === item ? "white" : "black" }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
      <ImageBackground
        source={require("../../../assets/jobMarket/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        {renderCategoryModal()}
        
        <ScrollView>
        <Pressable onPress={() => navigation.navigate("JobMarket")}>
          <Image
            source={require("../../../assets/jobMarket/back-Arrow.png")}
            style={{
              width: 40,
              height: 40,
              marginHorizontal: 10,
              marginVertical: 10,
              marginTop: 60,
              marginBottom:-33
            }}
          />
        </Pressable>
          <View
            style={{
              borderRadius: 30,
              borderWidth: 2,
              backgroundColor: "rgba(211, 211, 211, 0.8)",
              borderColor: "rgba(211, 211, 211, 0.8)",
              width: 95,
              height: 90,
              marginLeft:300,
              marginHorizontal: 42,
              marginTop:0
            }}
          >
            
            <Pressable onPress={pickImage}>
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require("../../../assets/jobMarket/add-image.png")
                }
                style={{
                  borderRadius: 20,
                  width: 60,
                  height: 60,
                  marginHorizontal: 15,
                  marginVertical: 12,
              
                }}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: -20,
              marginHorizontal: 10,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={styles.label}>Location:</Text>
            <TextInput
              placeholder="Enter Location"
              style={styles.input}
              value={location}
              onChangeText={(text) => setLocation(text)}
            />

            <Text style={styles.label}>Category:</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.inputCat}> Category: {category}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Description:</Text>
            <TextInput
              placeholder="Description"
              value={description}
              style={[styles.input, { height: 150, textAlignVertical: "top" }]}
              onChangeText={(text) => setDescription(text)}
              multiline
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
              placeholder="Enter amount ($)"
              style={styles.input}
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Estimated Time:</Text>
            <TextInput
              placeholder="Enter Estimated time (Hrs)"
              style={styles.input}
              value={time}
              onChangeText={(text) => setTime(text)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Date:</Text>
            <TextInput
              placeholder="Enter date "
              style={styles.input}
              value={date}
              onChangeText={(text) => setDate(text)}
              keyboardType="numeric"
            />      

          </View>
          
          <TouchableOpacity
            onPress={handleAddPress}
            style={{
              backgroundColor: "#5DB075",
              borderRadius: 60,
              paddingVertical: 16,
              width: "80%",
              alignItems: "center",
              marginTop: 2,
              marginHorizontal: 40,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "400",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  inputCat: {
    backgroundColor: "lightgray",
    color: "#5A5A5A",
    padding: 10,
    fontSize: 17,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedCategory: {
    backgroundColor: "#000",
    color: "white",
  },
  label: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
    marginLeft: 10,
  },
});

export default AddJob;