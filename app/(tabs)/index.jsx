import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { UserLocationContext } from "../Context/UserLocationContext";
import GlobalAPI from "../Utils/GlobalAPI";
import { FontAwesome5 } from "@expo/vector-icons";
import PlaceListView from "../components/PlaceListView";
import { SelectMarkerContext } from "../Context/SelectMarkerContext";

const Index = () => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  useEffect(() => {
    if (location) {
      GetNearByPlace();
    }
  }, [location]);

  const GetNearByPlace = async () => {
    const data = {
      includedTypes: ["hospital"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          radius: 5000.0,
        },
      },
    };

    try {
      const response = await GlobalAPI.NewNearByPlace(data);
      setNearbyHospitals(response.data.places || []);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (error) {
        console.error("Error fetching location:", error);
        setErrorMsg("Error fetching location");
      }
    }

    getCurrentLocation();
  }, []);

  const handleLocationSelect = (searchLocation) => {
    if (searchLocation) {
      const newLocation = {
        coords: {
          latitude: searchLocation.lat,
          longitude: searchLocation.lng,
        },
      };
      setLocation(newLocation);
    }
  };

  const HospitalMarker = () => {
    return (
      <View style={styles.hospitalMarkerContainer}>
        <View style={styles.markerBubble}>
          <FontAwesome5 name="hospital" size={18} color="#fff" />
        </View>
        <View style={styles.markerArrow} />
      </View>
    );
  };

  return (
    <SelectMarkerContext.Provider
      value={{ selectedMarkerIndex, setSelectedMarkerIndex }}
    >
      <View style={styles.container}>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : location ? (
          <>
            <View style={styles.searchBarContainer}>
              <SearchBar searchedLocation={handleLocationSelect} />
            </View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              {nearbyHospitals.map((hospital, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: hospital.location.latitude,
                    longitude: hospital.location.longitude,
                  }}
                  title={hospital.displayName?.text || "Hospital"}
                  description={hospital.formattedAddress}
                  onPress={() => setSelectedMarkerIndex(index)}
                >
                  <HospitalMarker />
                </Marker>
              ))}
            </MapView>
            <View style={styles.placeListContainer}>
              {nearbyHospitals.length > 0 && (
                <PlaceListView nearbyHospitals={nearbyHospitals} />
              )}
            </View>
          </>
        ) : (
          <Text style={styles.loadingText}>Fetching location...</Text>
        )}
      </View>
    </SelectMarkerContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: 80,
    width: "100%",
    paddingHorizontal: 15,
    zIndex: 1,
    elevation: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
  },
  hospitalMarkerContainer: {
    alignItems: "center",
  },
  markerBubble: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#E74C3C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#E74C3C",
    transform: [{ translateY: -1 }],
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});

export default Index;
