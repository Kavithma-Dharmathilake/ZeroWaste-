import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  View,
  Text,
  Pressable
} from "react-native";
import JobItem from '../../components/jobMarket/JobItem';
import SearchFilter from "../../components/jobMarket/SearchFilter";
import { useNavigation } from "@react-navigation/native";


const MyJobs = () => {

  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const data = [{ key: "jobItem" }];

  

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/JobMarketBackground.png")}
      style={{ width: "100%", height: "100%" }}
    >

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

      <View style={styles.searchContainer}>
        <SearchFilter icon="search" placeholder="Search here..." style={styles.searchContainer1}/>
      </View>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "jobItem":
              return <JobItem navigation={navigation} searchText={search} />;
            default:
              return null;
          }
        }}
      />
    </ImageBackground>
  );
}

export default MyJobs;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginBottom: 20,
    
  },
  searchContainer: {
    height:200,
    width: 385,
    marginLeft:20,
    marginTop: -20
  },
});


