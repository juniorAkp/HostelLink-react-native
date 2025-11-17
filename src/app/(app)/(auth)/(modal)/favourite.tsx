import HorizontalCard from "@/src/app/components/home/smallCard";
import { Fonts } from "@/src/app/constants/theme";
import {
  useFavouriteHostels,
  useFavouriteStore,
  useSetFavourite,
} from "@/src/app/hooks/useFavourite";
import { useTheme } from "@/src/app/hooks/useTheme";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Favourite = () => {
  const { colors } = useTheme();
  const {
    data: favouriteHostels = [],
    isFetching,
    error,
  } = useFavouriteHostels();

  const { addFavourite, removeFavourite } = useSetFavourite();
  const { favouriteHostelIds } = useFavouriteStore();
  const insets = useSafeAreaInsets();

  const toggleLike = (hostelId: string) => {
    if (favouriteHostelIds.includes(hostelId)) {
      removeFavourite(hostelId);
    } else {
      addFavourite(hostelId);
    }
  };

  // Loading
  if (isFetching) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
        edges={["top", "left", "right"]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // Error
  if (error) {
    return (
      <SafeAreaView
        style={{
          paddingTop: insets.top + 60,
        }}
        edges={["top", "left", "right"]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error?.message}
        </Text>
      </SafeAreaView>
    );
  }

  // Empty state
  if (!favouriteHostels.length) {
    return (
      <SafeAreaView
        style={styles.errorContainer}
        edges={["top", "left", "right"]}
      >
        <FontAwesome6 name="heart-crack" size={24} color="red" />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          No favourite Hostels
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.muted }]}>
          Favourite Hostels will appear here
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top + 60,
        backgroundColor: colors.background,
      }}
      edges={["top", "left", "right"]}
    >
      <FlatList
        data={favouriteHostels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isLiked = favouriteHostelIds.includes(item.id);

          return (
            <HorizontalCard
              hostel={item}
              isLiked={isLiked}
              onLike={() => toggleLike(item.id)}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 6,
    paddingBottom: 40,
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
    textAlign: "center",
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 24,
    marginBottom: 10,
    marginTop: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
