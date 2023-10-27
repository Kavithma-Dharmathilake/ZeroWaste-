import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../index";

const screenWidth = Dimensions.get("window").width;

const renderDotIndicators = (activeIndex, length) => {
  return Array.from({ length }, (_, index) => (
    <View
      key={index}
      style={{
        backgroundColor: activeIndex === index ? "#36797D" : "black",
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: -50,
      }}
    />
  ));
};

const MostPopular = () => {
  const [mostLikedItems, setMostLikedItems] = useState([]);
  const scrollViewRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const getMostLikedItems = async () => {
      try {
        const itemsRef = collection(db, "items");
        const q = query(itemsRef, orderBy("likes", "desc"), limit(3));
        const querySnapshot = await getDocs(q);

        const topItems = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          topItems.push({
            id: doc.id,
            title: data.title,
            imageUrl: data.imageUrl,
            likes: data.likes || 0,
          });
        });

        setMostLikedItems(topItems);
      } catch (error) {
        console.error("Error fetching most liked items:", error);
      }
    };

    getMostLikedItems();
  }, []);

  const handleMomentumScrollEnd = (event) => {
    const offsetX =
      (event &&
        event.nativeEvent &&
        event.nativeEvent.contentOffset &&
        event.nativeEvent.contentOffset.x) ||
      0;

    const slideIndex = Math.floor(offsetX / screenWidth);

    if (slideIndex === mostLikedItems.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(slideIndex + 1);
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: screenWidth * currentSlide,
          animated: true,
        });

        setCurrentSlide((prev) =>
          prev === mostLikedItems.length - 1 ? 0 : prev + 1
        );
      }
    }, 3000);
    return () => clearInterval(scrollInterval);
  }, [currentSlide, mostLikedItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Most Popular</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {mostLikedItems.map((item, index) => (
          <View style={styles.itemContainer} key={`${item.id}-${index}`}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <FontAwesome
                name="heart"
                size={60}
                color="#EA4855"
                style={{
                  marginBottom: 20,
                  marginLeft: 14,
                  marginRight: 14,
                }}
              />
              <Text style={{ fontSize: 30, fontFamily: "Roboto" }}>
                {item.likes}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotIndicators(currentSlide - 1, mostLikedItems.length)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 5,
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
    marginBottom: -7,
    backgroundColor: "rgba(211, 211, 211, 0.7)",
    width: screenWidth - 10,
    padding: 5,
  },
  image: {
    // width: screenWidth - 20,
    height: 220,
    resizeMode: "cover",
    marginTop: 3,
    marginVertical: 10,
    marginLeft: 5,
    width: 310,
    //     height: 220,
    //     resizeMode: "cover",
    //     marginTop: 3,
    //     marginVertical: 10,
    //     marginLeft: 5,
  },
});

export default MostPopular;
