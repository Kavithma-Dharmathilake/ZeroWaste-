import React from "react";
import { View, StyleSheet } from "react-native";
import UpdateJob from "../../components/jobMarket/UpdateJob"; 

const UpdateJobScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <UpdateJob item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UpdateJobScreen;
