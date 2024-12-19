import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import GlobalAPI from "../Utils/GlobalAPI";
import { FontAwesome } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const Card = ({ hospital }) => {
  const Photo_URL = "https://places.googleapis.com/v1/";

  const openInGoogleMaps = () => {
    try {
      const address = encodeURIComponent(hospital.formattedAddress);
      const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
      Linking.openURL(url);
    } catch (error) {
      console.error("Error opening Google Maps:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={openInGoogleMaps}
      style={{ width: SCREEN_WIDTH }}
    >
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          borderRadius: 10,
          width: SCREEN_WIDTH - 20,
          height: 270,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={
              hospital?.photos
                ? {
                    uri:
                      Photo_URL +
                      hospital?.photos[0]?.name +
                      "/media?key=" +
                      GlobalAPI.API_KEY +
                      "&maxHeightPx=800&maxWidthPx=1200",
                  }
                : require("../../assets/images/1copy.png")
            }
            style={{ width: "100%", height: 150, borderRadius: 10 }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "white",
              padding: 8,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <FontAwesome name="location-arrow" size={18} color="#278a84" />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            {hospital.displayName?.text}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            {hospital.formattedAddress}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
