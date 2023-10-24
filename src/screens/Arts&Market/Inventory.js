import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import SalesItem from "../components/SalesItem";
import InventoryItem from "../../components/Arts&Market/InventoryItem";
import BottomNavigationMarket from "../../components/Arts&Market/MarketNavigation";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Inventory = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [search, setSearch] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false); // State to track SearchBar focus
  const data = [{ key: "salesItem" }];

  const scrollToTop = () => {
    if (flatListRef && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -50 }}>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Head */}
        <View style={styles.screen}>
          <View style={{ flexDirection: "row", marginTop: -3 }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require("../../../assets/artgallery/images/back-Arrow.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginHorizontal: 6,
                  marginVertical: 10,
                }}
              />
            </Pressable>
            <View style={{ flexDirection: "row", left: 260 }}>
              <Pressable>
                <Image
                  source={require("../../../assets/artgallery/images/CartUp.png")}
                  style={{
                    width: 48,
                    height: 48,
                    marginRight: -2,
                    marginVertical: 10,
                  }}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../../../assets/artgallery/images/Home2.png")}
                  style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: 6,
                    marginVertical: 10,
                  }}
                />
              </Pressable>
            </View>
          </View>

          {/* Body */}
          <Text
            style={{
              fontSize: 30,
              marginLeft: 10,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "rgba(255, 255, 255,0.75)",
            }}
          >
            Inventory
          </Text>

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

          <InventoryItem ref={flatListRef} navigation={useNavigation()} />

          {/* <BottomNavigationMarket onPressScrollToTop={scrollToTop} /> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});
