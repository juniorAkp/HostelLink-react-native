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
import { useDebounce } from "use-debounce";

import SearchCard from "@/src/app/components/common/searchCard";
import { Colors, Fonts } from "@/src/app/constants/theme";
import { useSearchStore } from "@/src/app/hooks/use-useSearchStore";
import { useSearch } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { getDistance } from "@/src/app/utils/haversine";

const SearchScreen = () => {
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
        <MaterialCommunityIcons name="magnify" size={48} color={Colors.muted} />
        <Text style={styles.emptyText}>Start Searching</Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={48} color={Colors.primary} />
      </View>
    );
  }

  if (searchQuery.trim() && !sortedResults.length && !isFetching) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="magnify" size={48} color={Colors.muted} />
        <Text style={styles.emptyTitle}>
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
          <Text style={styles.sectionTitle}>Recent Searches</Text>
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
                color={Colors.muted}
                style={styles.recentIcon}
              />
              <Text style={styles.recentText} numberOfLines={1}>
                {term}
              </Text>
            </TouchableOpacity>
            {index < recentSearches.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={sortedResults}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 80,
        paddingTop: insets.top,
      }}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <SearchCard
          hostel={item}
          onPress={() => handleRecentPress(debouncedSearchQuery)}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: Colors.muted,
    marginTop: 12,
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: Colors.primary,
  },
  clearAllText: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: "red",
  },
  recentContainer: {
    marginBottom: 16,
  },
  recentList: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    overflow: "hidden",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: Colors.primary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.secondary,
    marginLeft: 48,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
