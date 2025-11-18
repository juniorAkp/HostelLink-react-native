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
import SearchBar from "@/src/app/components/search/SearchBar";
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

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const showRecent = recentSearches.length > 0 && !searchQuery.trim();

  if (!searchQuery.trim() && !showRecent) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + verticalScale(16),
            paddingHorizontal: scale(16),
          },
        ]}
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          placeholder="Search hostels by name or location..."
        />

        {/* Empty State */}
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="magnify"
            size={moderateScale(64)}
            color={colors.muted}
          />
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            Start searching for hostels
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              { color: colors.muted, marginTop: verticalScale(8) },
            ]}
          >
            Find the perfect place to stay
          </Text>
        </View>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + verticalScale(16),
            paddingHorizontal: scale(16),
          },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          placeholder="Search hostels by name or location..."
        />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={[
              styles.emptyText,
              { color: colors.muted, marginTop: verticalScale(12) },
            ]}
          >
            Searching...
          </Text>
        </View>
      </View>
    );
  }

  if (searchQuery.trim() && !sortedResults.length && !isFetching) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + verticalScale(16),
            paddingHorizontal: scale(16),
          },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          placeholder="Search hostels by name or location..."
        />
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={moderateScale(64)}
            color={colors.muted}
          />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No results found
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              { color: colors.muted, marginTop: verticalScale(8) },
            ]}
          >
            Try searching with different keywords
          </Text>
        </View>
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* Search Bar Header */}
      <View
        style={[
          styles.searchHeader,
          {
            paddingTop: insets.top + verticalScale(16),
            paddingHorizontal: scale(16),
            paddingBottom: verticalScale(12),
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          placeholder="Search hostels by name or location..."
        />

        {/* Results Count */}
        {searchQuery.trim().length > 0 && !showRecent && (
          <Text
            style={[
              styles.resultsCount,
              {
                color: colors.muted,
                marginTop: verticalScale(8),
              },
            ]}
          >
            {isFetching
              ? "Searching..."
              : `${sortedResults.length} ${
                  sortedResults.length === 1 ? "hostel" : "hostels"
                } found`}
          </Text>
        )}
      </View>

      {/* Results List */}
      <FlatList
        data={sortedResults}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
          paddingBottom: insets.bottom + verticalScale(80),
          paddingTop: verticalScale(12),
        }}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <HorizontalCard
            hostel={item}
            onPress={() => {
              if (debouncedSearchQuery.trim()) {
                addSearch(debouncedSearchQuery.trim());
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          showRecent ? null : (
            <View style={styles.emptyList}>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                No hostels found
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    elevation: 2,
  },
  resultsCount: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(13),
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  emptyText: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(16),
    marginTop: verticalScale(16),
    textAlign: "center",
  },
  emptySubtext: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(14),
    textAlign: "center",
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(20),
    textAlign: "center",
    marginTop: verticalScale(16),
  },
  emptyList: {
    paddingVertical: verticalScale(40),
    alignItems: "center",
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
    fontSize: moderateScale(14),
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
    marginLeft: scale(48),
    marginLeft: scale(32),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
});
