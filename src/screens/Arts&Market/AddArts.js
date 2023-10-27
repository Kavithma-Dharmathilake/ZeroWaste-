import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
// import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../index";
import { RadioButton } from "react-native-paper";
import { CheckBox } from "react-native-elements";

const categories = [
  "Home Decor",
  "Garden & Outdoor",
  "Kitchen & Dining",
  "Fashion & Accessories",
  "Other",
];

const AddArts = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  useEffect(() => {
    // Reload logic goes here
    if (isFocused) {
      // For example, you can fetch data again or perform any reload action
      console.log("ArtGallery screen is focused. Reload logic goes here.");
    }
  }, [isFocused]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Check if the result has assets
      if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      } else if (result.uri) {
        setImageUri(result.uri);
      }
    }
  };

  const handleAddPress = async () => {
    if (!category) {
      Alert.alert("Select Category...", Alert);
      return;
    }

    if (!confirmationChecked) {
      Alert.alert("Confirmation Required", "Please confirm your artwork.");
      return;
    }

    try {
      const itemsRef = collection(db, "items");
      const newItem = {
        category: category,
        imageUrl: imageUri,
        createdAt: serverTimestamp(), // Include the creation timestamp
      };
      await addDoc(itemsRef, newItem);

      setCategory("");
      setImageUri(null);

      navigation.navigate("ArtGallery");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const renderCategoryRow = (rowCategories) => {
    return (
      <View style={styles.row}>
        {rowCategories.map((item, index) => (
          <View
            key={item}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: index < rowCategories.length - 1 ? 4 : 0,
              // marginRight: 40,
              marginHorizontal: 10,
            }}
          >
            <RadioButton
              value={item}
              status={category === item ? "checked" : "unchecked"}
              onPress={() => setCategory(item)}
              color="#F3AF4A"
            />
            <Text style={{ marginLeft: 8 }}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
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
              <Text
                style={{
                  fontSize: 40,
                  alignSelf: "center",
                  marginTop: 20,
                  color: "white",
                  fontWeight: "500",
                  marginHorizontal: 73,
                }}
              >
                Art Work
              </Text>
            </View>

            <View
              style={{
                borderRadius: 30,
                borderWidth: 2,
                backgroundColor: "rgba(211, 211, 211, 0.8)",
                borderColor: "rgba(211, 211, 211, 0.8)",
                width: 330,
                height: 330,
                marginHorizontal: 40,
                marginTop: 15,
                marginBottom: 20,
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
                    marginHorizontal: 13,
                    marginVertical: 12,
                  }}
                />
              </Pressable>
            </View>

            {/* Category selection using radio buttons */}
            <View
              style={{
                backgroundColor: "rgba(211, 211, 211, 0.8)",
                alignItems: "left",
                marginHorizontal: 10,
                marginBottom: 10,
                marginTop: -5,
                borderRadius: 10,
              }}
            >
              <Text style={styles.categoryLabel}>Category : </Text>
              {renderCategoryRow(categories.slice(0, 2))}
              {renderCategoryRow(categories.slice(2, 4))}
              {renderCategoryRow(categories.slice(4))}
            </View>

            {/* Confirmation checkbox */}
            <View style={styles.confirmationCheckbox}>
              <CheckBox
                checked={confirmationChecked}
                onPress={() => setConfirmationChecked(!confirmationChecked)}
                checkedColor="blue"
                uncheckedColor="black"
              />
              <Text style={{ marginTop: 12, marginLeft: -12, fontSize: 14.5 }}>
                By uploading this artwork, I confirm that it is my{"\n"}original
                creation and does not infringe upon the{"\n"}work of others
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAddPress}
              style={{
                backgroundColor: "#5DB075",
                borderRadius: 60,
                paddingVertical: 16,
                width: "80%",
                alignItems: "center",
                marginTop: 15,
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  categoryLabel: {
    fontSize: 17,
    color: "#000",
    fontWeight: "400",
    marginLeft: 5,
  },
  confirmationCheckbox: {
    backgroundColor: "rgba(211, 211, 211, 0.6)",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
  screen: {
    flex: 1,
    marginTop: 30,
  },
});

export default AddArts;
