import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import JobListing from "../../components/jobMarket/JobListing";


const JobHistory = () => {

  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const data = [{ key: "jobListing" }];

  

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/JobMarketBackground.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
      <Pressable onPress={() => navigation.navigate("JobMarket")}>
          <Image
            source={require("../../../assets/jobMarket/back-Arrow.png")}
            style={{
              width: 40,
              height: 40,
              marginHorizontal: 10,
              marginVertical: 10,
              marginTop: 60,
              marginBottom:-200,
              marginLeft:15
            }}
          />
      </Pressable>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "jobListing":
              return <JobListing navigation={navigation} searchText={search} />;
            default:
              return null;
          }
        }}
      />
      </View>
    </ImageBackground>
  );
}

export default JobHistory;

const styles = StyleSheet.create({});


