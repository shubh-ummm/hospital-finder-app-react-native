import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { UserLocationContext } from '../Context/UserLocationContext';

const AppMapView = () => {
  const { location, errorMsg } = useContext(UserLocationContext);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg || "Loading location..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker
         coordinate={{
           latitude: location.coords.latitude,
           longitude: location.coords.longitude
         }}
         title="You are here"
         description="Your current location"
       />
     </MapView>
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 800,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default AppMapView