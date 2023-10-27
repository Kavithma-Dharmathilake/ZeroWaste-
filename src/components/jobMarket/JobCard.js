import React, { useEffect, useState, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { categories, colors } from "../../jobMarketConstant";

// Initialize Firebase
const db = getFirestore();

const JobCard = forwardRef(({ navigation }, ref) => {
  const [jobCards, setJobCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchJobCards = async () => {
    try {
      const jobCardsRef = collection(db, "jobs");
      const querySnapshot = await getDocs(jobCardsRef);

      const fetchedJobCards = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.imageUrl) {
          fetchedJobCards.push({
            id: doc.id,
            location: data.location,
            amount: data.amount,
            description: data.description,
            imageUrl: data.imageUrl,
            category: data.category,
            time: data.time,
            date: data.date,
          });
        } else {
          console.warn(`Missing imageUrl for document with ID: ${doc.id}`);
        }
      });

      setJobCards(fetchedJobCards);
    } catch (error) {
      console.error("Error fetching sales items:", error);
    }
  };

  useEffect(() => {
    fetchJobCards();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchJobCards();

      const reloadInterval = setInterval(fetchJobCards, 5 * 60 * 1000);

      return () => clearInterval(reloadInterval);
    }, [])
  );

  // Toggle category selection
  const toggleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (





    <View>
      {/* SearchBar */}
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
                          ? colors.COLOR_PRIMARY
                          : colors.COLOR_LIGHT,
                    },
                  ]}
                  onPress={() => toggleCategorySelection(category.category)}
                >
                  <Text style={styles.categoryButtonText}>{category.category}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        ref={ref}
        data={jobCards.filter((item) =>
          selectedCategory
            ? item.category.toLowerCase() === selectedCategory.toLowerCase()
            : true
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("JobDetails", { item: item })}
            style={styles.artworkImageContainer}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.artworkImage} />
            <View style={styles.detailView}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                {item.category}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                }}
              >
                {item.location}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "900",
                  color: "#666600",
                }}
              >
                {item.amount}$
              </Text>
            </View>
            <Image
              style={styles.icon}
              source={require("../../../assets/jobMarket/view.jpg")}
            />
          </Pressable>
        )}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});





const styles = StyleSheet.create({
  artworkImageContainer: {
    backgroundColor: "rgba(221, 221, 221, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    flexDirection: "row",
    width: "95%",
    height: "10",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    marginLeft: 10,
    alignItems: "left",
    paddingVertical: 20,
    overflow: "hidden",
    marginTop: 10
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: -30,
    fontFamily: "Roboto",
  },
  categoryButton: {
    backgroundColor: colors.COLOR_LIGHT, // Start with the default color
    marginRight: -2,
    borderRadius: 120,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
    marginLeft:10,
    marginTop:-1
  },
  categoryButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Roboto",
  },
  artworkImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 20,
    marginTop: 1,
  },
  icon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 30,
    right: 12,
    zIndex: 1,
    borderRadius: 16,
  },
  detailView: {
    flexDirection: "column",
    marginBottom: -11,
    marginHorizontal: 0,
    marginLeft: 20,
  },
});

export default JobCard;




