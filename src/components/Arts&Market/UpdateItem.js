import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../index";
import * as ImagePicker from "expo-image-picker";

const UpdateItem = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const [itemName, setItemName] = useState(item.itemName);
  const [itemPrice, setItemPrice] = useState(item.itemPrice.toString());
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [imageUri, setImageUri] = useState(item.imageUrl);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdatePress = async () => {
    if (!itemName || !itemPrice || !description || !category) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      const itemDocRef = doc(db, "sales", item.id);
      await updateDoc(itemDocRef, {
        itemName: itemName,
        itemPrice: parseFloat(itemPrice),
        description: description,
        category: category,
        imageUrl: imageUri, // Updated to include imageUrl
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImage = result.assets?.[0] || { uri: result.uri };
      setImageUri(selectedImage.uri);
    }
  };

  const categories = [
    "Home Decor",
    "Garden & Outdoor",
    "Kitchen & Dining",
    "Fashion & Accessories",
    "Other",
  ];

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Update Item</Text>

            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : require("../../../assets/artgallery/images/add-image.png")
                  }
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>

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

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text style={styles.inputCat}> Category: {category}</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Description"
              value={description}
              style={[styles.input, { height: 150, textAlignVertical: "top" }]}
              onChangeText={(text) => setDescription(text)}
              multiline
            />

            <TouchableOpacity
              onPress={handleUpdatePress}
              style={styles.updateButton}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
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
                  onPress={() => {
                    setCategory(item);
                    setIsModalVisible(false);
                  }}
                >
                  <Text
                    style={{ color: category === item ? "white" : "black" }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 12,
  },
  image: {
    borderRadius: 20,
    width: 300,
    height: 300,
  },
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
  updateButton: {
    backgroundColor: "#5DB075",
    borderRadius: 60,
    paddingVertical: 16,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
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

export default UpdateItem;
