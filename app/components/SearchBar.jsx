import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ searchedLocation }) => {
  const searchBarRef = useRef(null);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={searchBarRef}
        placeholder="Search Hospitals Nearby"
        onPress={(data, details = null) => {
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: "en",
          types: ["hospital", "health"],
          components: "country:in",
          radius: 5000,
        }}
        styles={{
          container: {
            flex: 0,
            width: "100%",
          },
          textInput: {
            height: 45,
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingRight: 35,
          },
          listView: {
            position: "absolute",
            top: 45,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: 5,
            elevation: 3,
            zIndex: 1000,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        }}
        renderRightButton={() => (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              searchBarRef.current?.setAddressText("");
            }}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
        enablePoweredByContainer={false}
        fetchDetails={true}
        minLength={2}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 50,
    backgroundColor: "transparent",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 12,
    zIndex: 2,
  },
});

export default SearchBar;
