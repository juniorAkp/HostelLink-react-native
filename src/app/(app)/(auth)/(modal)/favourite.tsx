import { Colors, Fonts } from "@/src/app/constants/theme";
import { useFavouriteHostels } from "@/src/app/hooks/useFavourite";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Favourite = () => {
  const { data: hostel, isFetching, error } = useFavouriteHostels();

  // Loading State
  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error?.message}</Text>
      </View>
    );
  }

  //empty state
  if (!hostel) {
    return (
      <View style={styles.errorContainer}>
        <Feather name="search" size={24} />
        <Text
          style={{
            fontFamily: Fonts.brandBold,
            fontSize: 24,
            marginBottom: 10,
          }}
        >
          No Recent Searches
        </Text>
        <Text>Recent Searches will appear here</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text>Favourite</Text>
    </ScrollView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40, // Extra space at bottom
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
});
