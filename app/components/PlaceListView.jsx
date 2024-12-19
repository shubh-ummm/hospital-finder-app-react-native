import { View, FlatList, Dimensions } from "react-native";
import React, { useContext, useRef, useEffect } from "react";
import Card from "./Card";
import { SelectMarkerContext } from "../Context/SelectMarkerContext";

const PlaceListView = ({ nearbyHospitals }) => {
  const flatListRef = useRef(null);
  const { selectedMarkerIndex } = useContext(SelectMarkerContext);

  useEffect(() => {
    if (selectedMarkerIndex !== null && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedMarkerIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selectedMarkerIndex]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={nearbyHospitals}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card hospital={item} />}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("screen").width,
          offset: Dimensions.get("screen").width * index,
          index,
        })}
      />
    </View>
  );
};

export default PlaceListView;
