// import React, { useRef, useState } from "react";
// import {
//   StyleSheet,
//   ImageBackground,
//   FlatList,
//   Image,
//   View,
//   Text,
//   Pressable
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import BottomNavigationMarket from "../../components/jobMarket/jobMarketNavigation";
// import SearchFilter from "../../components/jobMarket/SearchFilter";
// // import CategoriesFilter from "../../components/jobMarket/CategoriesFilter"
// import JobCard from "../../components/jobMarket/JobCard";
// import { useNavigation } from "@react-navigation/native";


// // import MostPopular from "../../components/MostPopular";

// const JobMarket = () => {

//   const flatListRef = useRef(null);
//   const navigation = useNavigation();
//   const [search, setSearch] = useState("");
//   const [isSearchBarFocused, setIsSearchBarFocused] = useState(false); // State to track SearchBar focus
//   const data = [{ key: "jobCard" }];

//     const scrollToTop = () => {
//         if (scrollRef && scrollRef.current) {
//           scrollRef.current.scrollToOffset({ offset: 0, animated: true });
//         }
//       };
 
//   return (
//       <ImageBackground
//         source={require("../../../assets/images/jobMarket/JobMarketHomeBackGround.png")}
//         style={{ width: "100%", height: "100%", marginTop: "200px" }}
//       >
//         <View>
//         <SearchFilter icon="search" placeholder="Search here..."></SearchFilter>
//         <Pressable onPress={() => navigation.navigate("AddJob")}>
//           <Image
//             style={styles.icon3}
//             source={require("../../../assets/images/jobMarket/leaderBoard.png")}
//           />
//         </Pressable>
//         </View>
        

//     <FlatList
//           ref={flatListRef}
//           showsVerticalScrollIndicator={false}
//           data={data}
//           keyExtractor={(item) => item.key}
//           renderItem={({ item }) => {
//             switch (item.key) {
//               case "jobCard":
//                 return (
//                   <JobCard navigation={navigation} searchText={search} />
//                 );
//               default:
//                 return null;
//             }
//           }}
//         />
//         <BottomNavigationMarket onPressScrollToTop={scrollToTop} />
//       </ImageBackground>
//   ); 
// };

// export default JobMarket;

// const styles = StyleSheet.create({});

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
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigationMarket from "../../components/jobMarket/jobMarketNavigation";
import SearchFilter from "../../components/jobMarket/SearchFilter";
import JobCard from "../../components/jobMarket/JobCard";
import { useNavigation } from "@react-navigation/native";

const JobMarket = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const data = [{ key: "jobCard" }];

  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/jobMarket/JobMarketHomeBackGround.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <SearchFilter icon="search" placeholder="Search here..." />
        </View>
        <Pressable onPress={() => navigation.navigate("AddJob")}>
          <Image
            style={styles.icon3}
            source={require("../../../assets/images/jobMarket/leaderBoard.png")}
          />
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "jobCard":
              return <JobCard navigation={navigation} searchText={search} />;
            default:
              return null;
          }
        }}
      />
      <BottomNavigationMarket onPressScrollToTop={scrollToTop} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchContainer: {
    flex: 1, // Allow the search filter to expand and fill the remaining space
  },
  icon3: {
    width: 40,
    height: 40,
    marginTop:120
  },
});

export default JobMarket;





