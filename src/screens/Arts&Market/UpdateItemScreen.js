import React from "react";
import { View, StyleSheet } from "react-native";
import UpdateItem from "../../components/Arts&Market/UpdateItem"; // Assuming the component is in the 'components' folder

const UpdateItemScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <UpdateItem item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UpdateItemScreen;
