import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import HorizontalCard from "../../../components/home/HorizontalCard";
import { Fonts } from "../../../constants/theme";
import { Hostels } from "../../../data/hostel";
import { useTheme } from "../../../hooks/useTheme";

// Dummy data for owner's hostels
const OWNER_HOSTELS: Hostels[] = [
  {
    id: "1",
    name: "Sunny Side Hostel",
    description:
      "A beautiful hostel with a sunny view and great amenities for travelers.",
    amenities: ["Wifi", "Pool", "Breakfast"],
    phone_numbers: ["123-456-7890"],
    exact_location: { lat: 37.7749, lng: -122.4194 },
    address: "123 Sunny St, San Francisco, CA",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    ],
    type: "Hostel",
    website_url: "https://sunnyside.com",
    email_addresses: ["contact@sunnyside.com"],
    country: "USA",
  },
  {
    id: "2",
    name: "Mountain Retreat",
    description:
      "Escape to the mountains in this cozy retreat perfect for hikers.",
    amenities: ["Hiking Trails", "Fireplace", "Kitchen"],
    phone_numbers: ["987-654-3210"],
    exact_location: { lat: 39.5501, lng: -105.7821 },
    address: "456 Mountain Rd, Denver, CO",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    type: "Cabin",
    website_url: "https://mountainretreat.com",
    email_addresses: ["info@mountainretreat.com"],
    country: "USA",
  },
];

const DashBoard = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Hostels</Text>
      </View>

      <FlatList
        data={OWNER_HOSTELS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <HorizontalCard hostel={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No hostels found. Create one!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          router.push("/create");
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.brandBold,
  },
  listContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(80), // Space for FAB
  },
  cardContainer: {
    marginBottom: verticalScale(15),
  },
  fab: {
    position: "absolute",
    bottom: verticalScale(30),
    right: scale(20),
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(50),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.brand,
  },
});
