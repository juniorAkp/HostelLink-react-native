import MapScreen from "@/src/app/components/map/MapScreen";
import { Fonts } from "@/src/app/constants/theme";
import { useCreateHostelStore } from "@/src/app/hooks/useCreateHostelStore";
import { useTheme } from "@/src/app/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SelectLocation = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { setForm, form } = useCreateHostelStore();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(form.location);

  const handleConfirm = () => {
    if (selectedLocation) {
      setForm({ location: selectedLocation });
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Pick Location",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <MapScreen
        mode="select"
        initialLocation={selectedLocation || undefined}
        onLocationSelect={setSelectedLocation}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: selectedLocation ? colors.primary : colors.muted,
            },
          ]}
          onPress={handleConfirm}
          disabled={!selectedLocation}
        >
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: verticalScale(30),
    left: scale(20),
    right: scale(20),
  },
  confirmButton: {
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmText: {
    color: "#fff",
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(16),
  },
});
