import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  View,
  Text,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import ArtWork from "../../components/Arts&Market/ArtWork";
import BottomNavigation from "../../components/Arts&Market/Navigation";
import MostPopular from "../../components/Arts&Market/MostPopular";

const ArtGallery = () => {
  const scrollRef = useRef(null);
  const [reloadMostPopular, setReloadMostPopular] = useState(false);

  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handleAddArtsUpdate = () => {
    setReloadMostPopular((prev) => !prev); // Toggle the state to trigger a reload
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/artgallery/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.screen}>
          <FlatList
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 50,
                }}
              >
                <Image
                  source={require("../../../assets/artgallery/images/camera.png")}
                  style={{ marginLeft: 10, width: 80, height: 80 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 40,
                      color: "#fff",
                      fontFamily: "System",
                      fontWeight: 600,
                      fontFamily: "Roboto",
                    }}
                  >
                    Art Gallery
                  </Text>
                  <Text
                    style={{
                      marginTop: -5,
                      marginLeft: 11,
                      fontSize: 16,
                      color: "#fff",
                      fontFamily: "System",
                      fontWeight: 200,
                      fontFamily: "Roboto",
                    }}
                  >
                    Waste to treasure
                  </Text>
                </View>
              </View>
            }
            data={[{ key: "mostPopular" }, { key: "artWork" }]}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              switch (item.key) {
                case "mostPopular":
                  return <MostPopular reload={reloadMostPopular} />;
                case "artWork":
                  return <ArtWork onUpdate={handleAddArtsUpdate} />;
                default:
                  return null;
              }
            }}
          />
        </View>
        <BottomNavigation onPressScrollToTop={scrollToTop} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ArtGallery;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});
