// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Pressable,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   TextInput,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   getDocs,
//   orderBy,
//   serverTimestamp,
// } from "firebase/firestore";
// import * as ImagePicker from "expo-image-picker";
// import { db } from "../index";

// const categories = [
//   "Home Decor",
//   "Garden & Outdoor",
//   "Kitchen & Dining",
//   "Fashion & Accessories",
//   "Other",
// ];

// const AddItem = () => {
//   const navigation = useNavigation();
//   const [itemName, setItemName] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUri, setImageUri] = useState(null);
//   const [category, setCategory] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleAddPress = async () => {
//     if (!itemName || !itemPrice || !description || !imageUri || !category) {
//       Alert.alert("All fields are required.");
//       return;
//     }

//     try {
//       const salesRef = collection(db, "sales");
//       const newItem = {
//         itemName: itemName,
//         itemPrice: itemPrice,
//         description: description,
//         imageUrl: imageUri,
//         category: category,
//         createdAt: serverTimestamp(), // Use serverTimestamp for Firestore timestamp
//       };

//       await addDoc(salesRef, newItem);

//       setItemName("");
//       setItemPrice("");
//       setDescription("");
//       setImageUri(null);
//       setCategory("");

//       navigation.navigate("Market");
//     } catch (error) {
//       console.error("Error saving item:", error);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const selectedImage = result.assets?.[0] || { uri: result.uri };
//       setImageUri(selectedImage.uri);
//     }
//   };

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   const handleCategorySelect = (selectedCategory) => {
//     setCategory(selectedCategory);
//     toggleModal();
//   };

//   const renderCategoryModal = () => (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={isModalVisible}
//       onRequestClose={toggleModal}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Select a Category</Text>
//           {categories.map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={[
//                 styles.modalOption,
//                 category === item && styles.selectedCategory,
//               ]}
//               onPress={() => handleCategorySelect(item)}
//             >
//               <Text style={{ color: category === item ? "white" : "black" }}>
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <SafeAreaView>
//       <ImageBackground
//         source={require("../../assets/images/background.png")}
//         style={{ width: "100%", height: "100%" }}
//       >
//         {renderCategoryModal()}
//         <Pressable onPress={() => navigation.goBack()}>
//           <Image
//             source={require("../../assets/images/back-Arrow.png")}
//             style={{
//               width: 40,
//               height: 40,
//               marginHorizontal: 10,
//               marginVertical: 10,
//             }}
//           />
//         </Pressable>
//         <ScrollView>
//           <View
//             style={{
//               borderRadius: 30,
//               borderWidth: 2,
//               backgroundColor: "rgba(211, 211, 211, 0.8)",
//               borderColor: "rgba(211, 211, 211, 0.8)",
//               width: 330,
//               height: 330,
//               marginHorizontal: 42,
//               marginBottom: 18,
//             }}
//           >
//             <Pressable onPress={pickImage}>
//               <Image
//                 source={
//                   imageUri
//                     ? { uri: imageUri }
//                     : require("../../assets/images/add-image.png")
//                 }
//                 style={{
//                   borderRadius: 20,
//                   width: 300,
//                   height: 300,
//                   marginHorizontal: 15,
//                   marginVertical: 12,
//                 }}
//               />
//             </Pressable>
//           </View>
//           <View
//             style={{
//               marginTop: -20,
//               marginHorizontal: 10,
//               marginVertical: 10,
//               borderRadius: 10,
//             }}
//           >
//             <TextInput
//               placeholder="Enter item name"
//               style={styles.input}
//               value={itemName}
//               onChangeText={(text) => setItemName(text)}
//             />

//             <TextInput
//               placeholder="Enter item price ($)"
//               style={styles.input}
//               value={itemPrice}
//               onChangeText={(text) => setItemPrice(text)}
//               keyboardType="numeric"
//             />
//             <TouchableOpacity onPress={toggleModal}>
//               <Text style={styles.inputCat}> Category: {category}</Text>
//             </TouchableOpacity>
//             <TextInput
//               placeholder="Description"
//               value={description}
//               style={[styles.input, { height: 150, textAlignVertical: "top" }]}
//               onChangeText={(text) => setDescription(text)}
//               multiline
//             />
//           </View>
//           <TouchableOpacity
//             onPress={handleAddPress}
//             style={{
//               backgroundColor: "#5DB075",
//               borderRadius: 60,
//               paddingVertical: 16,
//               width: "80%",
//               alignItems: "center",
//               marginTop: 2,
//               marginHorizontal: 40,
//               marginBottom: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: "#fff",
//                 fontWeight: "400",
//               }}
//             >
//               Add
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: "lightgray",
//     padding: 10,
//     fontSize: 17,
//     width: "95%",
//     alignSelf: "center",
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   inputCat: {
//     backgroundColor: "lightgray",
//     color: "#5A5A5A",
//     padding: 10,
//     fontSize: 17,
//     width: "95%",
//     alignSelf: "center",
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalOption: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   selectedCategory: {
//     backgroundColor: "#000",
//     color: "white",
//   },
// });

// export default AddItem;

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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
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

const categories = [
  "Home Decor",
  "Garden & Outdoor",
  "Kitchen & Dining",
  "Fashion & Accessories",
  "Other",
];

const AddItem = () => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddPress = async () => {
    if (!itemName || !itemPrice || !description || !imageUri || !category) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      const salesRef = collection(db, "sales");
      const newItem = {
        itemName: itemName,
        itemPrice: itemPrice,
        description: description,
        imageUrl: imageUri,
        category: category,
        createdAt: serverTimestamp(), // Use serverTimestamp for Firestore timestamp
      };

      await addDoc(salesRef, newItem);

      setItemName("");
      setItemPrice("");
      setDescription("");
      setImageUri(null);
      setCategory("");

      navigation.navigate("Market");
    } catch (error) {
      console.error("Error saving item:", error);
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
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        {renderCategoryModal()}
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/artgallery/images/back-Arrow.png")}
            style={{
              width: 40,
              height: 40,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          />
        </Pressable>
        <ScrollView>
          <View
            style={{
              borderRadius: 30,
              borderWidth: 2,
              backgroundColor: "rgba(211, 211, 211, 0.8)",
              borderColor: "rgba(211, 211, 211, 0.8)",
              width: 330,
              height: 330,
              marginHorizontal: 42,
              marginBottom: 18,
            }}
          >
            <Pressable onPress={pickImage}>
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require("../../../assets/artgallery/images/add-image.png")
                }
                style={{
                  borderRadius: 20,
                  width: 300,
                  height: 300,
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
            <TextInput
              placeholder="Enter item name"
              style={styles.input}
              value={itemName}
              onChangeText={(text) => setItemName(text)}
            />

            <TextInput
              placeholder="Enter item price ($)"
              style={styles.input}
              value={itemPrice}
              onChangeText={(text) => setItemPrice(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.inputCat}> Category: {category}</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Description"
              value={description}
              style={[styles.input, { height: 150, textAlignVertical: "top" }]}
              onChangeText={(text) => setDescription(text)}
              multiline
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
    </SafeAreaView>
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
});

export default AddItem;
