import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bin from '../../../assets/images/wasteManagement/bin.png';


const NearestBin = () => {
  const binLocations = [
    { id: 1, name: 'Kaduwela Waste Management Facility', latitude: 6.935768133956983, longitude: 79.98680776429345},
    { id: 2, name: 'Kaduwela municipal council garbage recycling center', latitude: 6.948255558885881, longitude: 79.98428696415078 },
    { id: 3, name: 'Pilisaru Organic Project Garbage Collection center', latitude: 6.93734979025152, longitude: 79.98566025506871 },
    { id: 4, name: 'Green wave lanka Pvt Ltd - Collects Waste including e-Waste', latitude: 7.019136871470878, longitude: 79.95819443671037 },
    { id: 5, name: 'Ceylon Waste Management (CWM) E-Waste Processing Factory', latitude: 6.966658469624512, longitude: 79.92248887284453 },
    { id: 6, name: 'Kalhari Enterprises-Waste management service center', latitude: 7.000736025397627, longitude: 79.97742050956121 },
    { id: 7, name: 'Omegaa Ventures Lanka (Pvt) Ltd- Waste management service center', latitude: 6.912810887918333, longitude: 79.93896836385953 },
    { id: 8, name: 'Heiyanthuduwa Recycle', latitude: 6.96734004505242, longitude: 79.98497360960975 },

    // Add more bin locations here
  ];

  return (
    <View style={styles.container}>
      <MapView

        style={styles.map}
        initialRegion={{
          latitude: 6.935768133956983,
          longitude: 79.98680776429345,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {binLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            image={bin}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default NearestBin;
