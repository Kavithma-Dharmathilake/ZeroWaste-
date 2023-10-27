import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";

const Cards = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable>
          <Image
            style={styles.cards}
            source={require("../../../assets/artgallery/images/card1.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={styles.cards}
            source={require("../../../assets/artgallery/images/card3.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={styles.cards}
            source={require("../../../assets/artgallery/images/card2.png")}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cards: {
    marginVertical: 5,
    marginRight: 10,
  },
});
