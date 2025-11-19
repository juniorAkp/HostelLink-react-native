import MapCard from "@/src/app/components/map/MapCard";
import { Colors } from "@/src/app/constants/theme";
import { useHostels } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const { latitude, longitude, country } = useLocationStore();
  const { data: hostels } = useHostels(country ?? "");
  const [selectedHostelId, setSelectedHostelId] = useState<string | null>(null);

  const displayedHostels = selectedHostelId
    ? hostels?.filter((h) => h.id === selectedHostelId)
    : hostels;

  const handleMarkerPress = (hostelId: string) => {
    setSelectedHostelId(hostelId);
  };

  const handleMapPress = () => {
    setSelectedHostelId(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialCamera={{
          center: {
            latitude: latitude!,
            longitude: longitude!,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 15,
        }}
        style={styles.map}
        showsUserLocation={true}
        zoomControlEnabled={false}
        showsCompass={false}
        onPress={handleMapPress}
      >
        {hostels &&
          hostels.map((hostel) => (
            <Marker
              key={hostel.id}
              pinColor={
                selectedHostelId === hostel.id ? Colors.primary : "#000"
              }
              coordinate={{
                latitude: hostel.exact_location.lat,
                longitude: hostel.exact_location.lng,
              }}
              onPress={(e) => {
                e.stopPropagation();
                handleMarkerPress(hostel.id);
              }}
            />
          ))}
      </MapView>
      <FlatList
        keyExtractor={(item) => item.id}
        data={displayedHostels}
        style={{ position: "absolute", bottom: 10, left: 10, right: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MapCard
            hostel={item}
            onPress={() => router.push(`/hostel/${item.id}`)}
          />
        )}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
