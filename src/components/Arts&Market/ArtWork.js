import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { categories, colors } from "../../Constant";

// Initialize Firebase
const db = getFirestore();

const ArtWork = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch artworks function
  const fetchArtworks = async () => {
    try {
      const itemsRef = collection(db, "items");
      const querySnapshot = await getDocs(
        query(itemsRef, orderBy("createdAt", "desc"))
      );
  
      const fetchedArtworks = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        if (data.imageUrl) {
          fetchedArtworks.push({
            id: doc.id,
            category: data.category,
            imageUrl: data.imageUrl,
            likes: data.likes || 0,
            createdAt: data.createdAt.toDate(),
          });
        } else {
          console.warn(`Missing imageUrl for document with ID: ${doc.id}`);
        }
      });
  
      // console.log("Fetched Artworks: ", fetchedArtworks);
      // console.log("Selected Category: ", selectedCategory);
  
      setArtworks(fetchedArtworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };  

  // Fetch artworks on initial render and when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchArtworks();

      // Set up automatic reload every 5 minutes (adjust as needed)
      const reloadInterval = setInterval(fetchArtworks, 5 * 60 * 1000);

      // Clean up interval when the component is unmounted
      return () => clearInterval(reloadInterval);
    }, [])
  );

  const handleLikePress = async (artwork) => {
    try {
      const itemRef = doc(db, "items", artwork.id);
      await updateDoc(itemRef, {
        likes: artwork.likes + 1,
      });

      setArtworks((prevArtworks) => {
        return prevArtworks.map((item) =>
          item.id === artwork.id ? { ...item, likes: item.likes + 1 } : item
        );
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

 // Toggle category selection
const toggleCategorySelection = (category) => {
  // console.log("Selected Category: ", category);
  setSelectedCategory((prevCategory) => {
    // console.log("Previous Category: ", prevCategory);
    return prevCategory === category ? null : category;
  });
};

// Filter artworks based on the selected category
const filteredArtworks = selectedCategory
  ? artworks.filter((item) => {
      // console.log("Item Category: ", item.category);
      // console.log("Selected Category: ", selectedCategory);
      return (
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    })
  : artworks;

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Text style={styles.header}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category.category
                        ? colors.COLOR_LIGHT
                        : colors.COLOR_SECONDARY,
                  },
                ]}
                onPress={() => toggleCategorySelection(category.category)}
              >
                <Text style={styles.categoryButtonText}>
                  {category.category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      }
      data={filteredArtworks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.artworkImage}
            onError={(error) =>
              console.error("Image Error:", error.nativeEvent.error)
            }
          />
          <View style={styles.likesContainer}>
            <TouchableOpacity onPress={() => handleLikePress(item)}>
              <FontAwesome
                name="heart"
                size={styles.likeIcon.fontSize}
                color="#EA4855"
                style={styles.likeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.likeText}>{item.likes} Likes</Text>
          </View>
        </View>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ArtWork;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: -30,
    fontFamily: "Roboto",
  },
  categoryButton: {
    marginRight: 10,
    borderRadius: 120,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
  categoryButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Roboto",
  },
  artworkImageContainer: {
    backgroundColor: "rgba(211, 211, 211, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    width: "48%",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    marginLeft: 5,
    alignItems: "center",
    paddingVertical: 20,
    overflow: "hidden",
  },
  artworkImage: {
    marginTop: -19.5,
    width: 198,
    height: 220,
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  likesContainer: {
    flexDirection: "row",
    marginLeft: -10,
    marginBottom: -10,
  },
  likeIcon: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
  },
  likeText: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: "Roboto",
  },
});
