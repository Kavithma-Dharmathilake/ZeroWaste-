import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import SalesItem from "../../components/Arts&Market/SalesItem";
import BottomNavigationMarket from "../../components/Arts&Market/MarketNavigation";
import { useNavigation } from "@react-navigation/native";

const MarketPlaceScreen = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false); // State to track SearchBar focus
  const data = [{ key: "salesItem" }];

  const scrollToTop = () => {
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          {/* Head */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 30,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../../assets/artgallery/images/retailer.png")}
              style={{ marginLeft: 10, width: 80, height: 80 }}
            />
            <View
              style={{
                flexDirection: "column",
                marginTop: -15,
                marginLeft: -5,
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 40,
                  color: "#fff",
                  fontFamily: "Roboto",
                  fontWeight: 600,
                }}
              >
                MarketPlace
              </Text>
              <Text
                style={{
                  marginTop: -5,
                  marginLeft: 11,
                  fontSize: 16,
                  color: "#fff",
                  fontFamily: "Roboto",
                  fontWeight: 200,
                }}
              >
                Best out of Waste
              </Text>
            </View>
          </View>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search..."
            onChangeText={(text) => setSearch(text)}
            value={search}
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: "#fff",
              borderRadius: 25,
            }}
            onFocus={() => setIsSearchBarFocused(true)}
            onBlur={() => setIsSearchBarFocused(false)}
          />

          {/* FlatList with SalesItem */}
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              switch (item.key) {
                case "salesItem":
                  return (
                    <SalesItem navigation={navigation} searchText={search} />
                  );
                default:
                  return null;
              }
            }}
          />
        </View>
        {/* Conditionally render BottomNavigationMarket based on SearchBar focus */}
        {isSearchBarFocused ? null : (
          <KeyboardAvoidingView>
            <BottomNavigationMarket onPressScrollToTop={scrollToTop} />
          </KeyboardAvoidingView>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});

export default MarketPlaceScreen;
