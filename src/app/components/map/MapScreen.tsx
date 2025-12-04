import MapCard from "@/src/app/components/map/MapCard";
import { Colors } from "@/src/app/constants/theme";
import { Hostels } from "@/src/app/data/hostel";
import { useHostel, useHostels } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";

interface MapScreenProps {
  mode?: "explore" | "single" | "select";
  hostel?: Hostels;
  initialLocation?: { lat: number; lng: number };
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

const MapScreen = ({
  mode = "explore",
  hostel: propHostel,
  initialLocation,
  onLocationSelect,
}: MapScreenProps) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { latitude, longitude, country } = useLocationStore();
  const { colors } = useTheme();
  const mapRef = useRef<MapView>(null);

  const paramHostelId = params.hostelId as string;
  const effectiveMode =
    (params.viewMode as "explore" | "single" | "select") ||
    (paramHostelId ? "single" : mode);

  const { data: allHostels } = useHostels(country ?? "");
  const { data: fetchedHostel } = useHostel(paramHostelId);

  const [selectedHostelId, setSelectedHostelId] = useState<string | null>(null);
  const [dragLocation, setDragLocation] = useState({
    latitude: initialLocation?.lat || latitude || 37.78825,
    longitude: initialLocation?.lng || longitude || -122.4324,
  });

  const insets = useSafeAreaInsets();

  let displayedHostels: Hostels[] = [];

  if (effectiveMode === "single") {
    const target = propHostel || fetchedHostel;
    if (target) displayedHostels = [target];
  } else if (effectiveMode === "explore") {
    displayedHostels = allHostels || [];
  }

  // Filter for carousel if a hostel is selected (in explore mode)
  const carouselData = selectedHostelId
    ? displayedHostels.filter((h) => h.id === selectedHostelId)
    : displayedHostels;

  // center map on single hostel
  useEffect(() => {
    if (
      effectiveMode === "single" &&
      displayedHostels.length > 0 &&
      mapRef.current
    ) {
      const h = displayedHostels[0];
      mapRef.current.animateCamera(
        {
          center: {
            latitude: h.exact_location.lat,
            longitude: h.exact_location.lng,
          },
          zoom: 15,
        },
        {
          duration: 500,
        }
      );
    }
  }, [effectiveMode, displayedHostels]);

  const handleMarkerPress = (hostelId: string) => {
    setSelectedHostelId(hostelId);
  };

  const handleMapPress = () => {
    setSelectedHostelId(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialCamera={{
          center: {
            latitude: initialLocation?.lat || latitude || 37.78825,
            longitude: initialLocation?.lng || longitude || -122.4324,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 15,
        }}
        style={styles.map}
        showsUserLocation={effectiveMode !== "select"}
        followsUserLocation={Platform.OS === "ios" ? false : true}
        mapType="satellite"
        googleMapId="58c60ab2a5f2b5df779556c6"
        showsMyLocationButton={false}
        zoomControlEnabled={false}
        showsCompass={false}
        toolbarEnabled={false}
        onPress={handleMapPress}
      >
        {/* Render Hostels for Explore/Single Mode */}
        {effectiveMode !== "select" &&
          displayedHostels.map((h) => (
            <Marker
              key={h.id}
              pinColor={selectedHostelId === h.id ? colors.primary : "#000"}
              coordinate={{
                latitude: h.exact_location.lat,
                longitude: h.exact_location.lng,
              }}
              onPress={(e) => {
                e.stopPropagation();
                handleMarkerPress(h.id);
              }}
            />
          ))}

        {/* Render Draggable Marker for Select Mode */}
        {effectiveMode === "select" && (
          <Marker
            coordinate={dragLocation}
            draggable
            isPreselected
            pinColor={Colors.primary}
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setDragLocation({ latitude, longitude });
              if (onLocationSelect) {
                onLocationSelect({ lat: latitude, lng: longitude });
              }
            }}
          />
        )}
      </MapView>

      {/* Carousel for Explore/Single Mode */}
      {effectiveMode !== "select" && (
        <FlatList
          keyExtractor={(item) => item.id}
          data={carouselData}
          style={{
            position: "absolute",
            bottom: insets.bottom + 60,
            left: insets.left,
            right: insets.right,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <MapCard
              hostel={item}
              onPress={() => router.push(`/hostel/${item.id}`)}
            />
          )}
        />
      )}
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
