import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, FlatList, TextInput, Image } from "react-native";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, name: "Kavindu", score: 1200 },
    { rank: 2, name: "Chamal", score: 1100 },
    { rank: 3, name: "Rasura", score: 1000 },
    { rank: 4, name: "Lasen", score: 980 },
    { rank: 5, name: "Praveen", score: 920 },
    { rank: 6, name: "Dilshan", score: 800 },
    { rank: 7, name: "Nimal", score: 700 },
    // Add more leaderboard data
  ]);

  const [searchText, setSearchText] = useState("");

  // Filter the leaderboard data based on the search text
  const filteredData = leaderboardData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/background.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <View style={styles.leaderboardCard}>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>{item.rank}</Text>
              <Image
                source={require("../../../assets/jobMarket/main.png")}
                style={styles.img}
              />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{item.score} Points</Text>
                <Image
                  source={require("../../../assets/jobMarket/like.png")}
                  style={styles.likeImage}
                />
              </View>
            </View>
          </View>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 20,
  },
  header: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "black",
    marginTop: 50,
    marginLeft: 115,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginLeft: 10,
    color: "black",
    width: "95%",
    marginTop: 30
  },
  leaderboardCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 10,
    margin: 10,
    width: "95%",
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "black",
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: "black",
    fontWeight: "800",
    flex: 1,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    fontSize: 16,
    color: "black",
    fontWeight: "800",
  },
  likeImage: {
    height: 30, // Adjust the height and width as needed
    width: 30,
    marginLeft: 5, // Adjust the spacing as needed
    marginRight: 10, //
  },
});

export default LeaderBoard;
