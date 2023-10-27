import React from "react";
import { View, Text } from "react-native";

const MapView = ({ route }) => {
  // You can use the data from the selected card here, which is passed as a route parameter
  const { start, end } = route.params;

  // Implement your map view here
  // You can use libraries like react-native-maps to display a map
  // For simplicity, we'll display the start and end locations as text
  return (
    <View>
      <Text>Start Location: {start}</Text>
      <Text>End Location: {end}</Text>
      {/* Implement your map component here */}
    </View>
  );
};

export default MapView;
