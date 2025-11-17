import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDebounce } from "use-debounce";

import HorizontalCard from "@/src/app/components/home/smallCard";
import { Fonts } from "@/src/app/constants/theme";
import { useSearchStore } from "@/src/app/hooks/use-useSearchStore";
import { useSearch } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { useTheme } from "@/src/app/hooks/useTheme";
import { getDistance } from "@/src/app/utils/haversine";

const SearchScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    recentSearches,
    addSearch,
    searchQuery,
    setSearchQuery,
    clearSearches,
  } = useSearchStore();

  const { latitude, longitude } = useLocationStore();

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const {
    data: searchResults = [],
    isFetching,
    isError,
  } = useSearch(debouncedSearchQuery);

  // Sort by distance
  const sortedResults = useMemo(() => {
    if (!latitude || !longitude || !searchResults.length) return searchResults;

    return [...searchResults].sort((a, b) => {
      const da = getDistance(
        latitude,
        longitude,
        a.exact_location.lat,
        a.exact_location.lng
      );
      const db = getDistance(
        latitude,
        longitude,
        b.exact_location.lat,
        b.exact_location.lng
      );
      return da - db;
    });
  }, [searchResults, latitude, longitude]);

  const handleRecentPress = (term: string) => {
    setSearchQuery(term);
    addSearch(term);
  };

  const showRecent = recentSearches.length > 0 && !searchQuery.trim();

  if (!searchQuery.trim() && !showRecent) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="magnify" size={48} color={colors.muted} />
        <Text style={[styles.emptyText, { color: colors.muted }]}>
          Start Searching
        </Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={48} color={colors.primary} />
      </View>
    );
  }

  if (searchQuery.trim() && !sortedResults.length && !isFetching) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="magnify" size={48} color={colors.muted} />
        <Text style={[styles.emptyTitle, { color: colors.primary }]}>
          No Search Results match "{debouncedSearchQuery}"
        </Text>
      </View>
    );
  }

  const renderHeader = () => {
    if (!showRecent) return null;

    return (
      <View style={styles.recentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Recent Searches
          </Text>
          <TouchableOpacity onPress={clearSearches} hitSlop={8}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {recentSearches.map((term, index) => (
          <View key={term}>
            <TouchableOpacity
              style={styles.recentItem}
              onPress={() => handleRecentPress(term)}
            >
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={colors.muted}
                style={styles.recentIcon}
              />
              <Text
                style={[styles.recentText, { color: colors.primary }]}
                numberOfLines={1}
              >
                {term}
              </Text>
            </TouchableOpacity>
            {index < recentSearches.length - 1 && (
              <View
                style={[styles.separator, { backgroundColor: colors.border }]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      {searchQuery.trim().length > 0 && (
        <View
          style={{
            paddingHorizontal: scale(16),
            paddingVertical: verticalScale(8),
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.brandBold,
              fontSize: moderateScale(14),
              color: colors.primary,
            }}
          >
            Found {sortedResults.length}{" "}
            {sortedResults.length === 1 ? "result" : "results"}
          </Text>
        </View>
      )}
      <FlatList
        data={sortedResults}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
          paddingBottom: insets.bottom + verticalScale(80),
          paddingTop: insets.top,
        }}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <HorizontalCard
            hostel={item}
            onPress={() => handleRecentPress(debouncedSearchQuery)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  emptyText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(16),
    marginTop: verticalScale(12),
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(18),
    textAlign: "center",
    marginTop: verticalScale(12),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(18),
  },
  clearAllText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(15),
    color: "red",
  },
  recentContainer: {
    marginBottom: verticalScale(16),
  },
  recentList: {
    borderRadius: scale(12),
    overflow: "hidden",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },
  recentIcon: {
    marginRight: scale(12),
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: moderateScale(16),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: scale(48),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
});
