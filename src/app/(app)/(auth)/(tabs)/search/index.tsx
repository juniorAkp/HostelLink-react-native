import HorizontalCard from "@/src/app/components/home/smallCard";
import { Colors, Fonts } from "@/src/app/constants/theme";
import { useSearchStore } from "@/src/app/hooks/use-useSearchStore";
import { useSearch } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { getDistance } from "@/src/app/utils/haversine";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

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

  // Debounce server search
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  // Server-side search
  const {
    data: searchResults = [],
    isFetching,
    isError,
  } = useSearch(debouncedSearchQuery);

  // Sort by distance (after server returns)
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

  const hasResults = sortedResults.length > 0;
  const showRecent = recentSearches.length > 0 && !searchQuery;

  if (!searchQuery.trim()) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons name="magnify" size={48} color={Colors.muted} />
        <Text>Start Searching</Text>
      </View>
    );
  }
  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={48} color={Colors.primary} />
      </View>
    );
  }

  if (searchQuery.trim() && !hasResults && !isFetching) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons name="magnify" size={48} color={Colors.muted} />
        <Text style={styles.emptyTitle}>
          No Search Results match "{debouncedSearchQuery}"
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 80 },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* RECENT SEARCHES */}
      {showRecent && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearSearches} hitSlop={8}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentList}>
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
        </View>
      )}

      {/* LIVE SEARCH RESULTS */}
      {debouncedSearchQuery && (
        <View style={styles.section}>
          {/* Error */}
          {isError && !isFetching && (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={48}
                color={"red"}
              />
              <Text style={styles.emptyTitle}>Search failed</Text>
              <Text style={styles.emptySubtitle}>Please try again</Text>
            </View>
          )}

          {/* Results */}
          {sortedResults && (
            <>
              <Text style={styles.resultCount}>
                {sortedResults.length} hostel
                {sortedResults.length !== 1 ? "s" : ""} found
              </Text>

              <View style={styles.resultsList}>
                {sortedResults.map((hostel) => (
                  <View key={hostel.id} style={styles.resultItem}>
                    <HorizontalCard hostel={hostel} />
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Section
  section: {
    marginTop: 24,
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
    color: Colors.text,
  },
  clearAllText: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: "red",
  },

  // Recent Searches
  recentList: {
    backgroundColor: Colors.light,
    borderRadius: 12,
    overflow: "hidden",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.secondary,
    marginLeft: 48,
  },

  // Loading
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginLeft: 12,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: Colors.muted,
  },

  // Empty / Error States
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    marginTop: 16,
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: Colors.text,
  },
  emptySubtitle: {
    marginTop: 8,
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.muted,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  // Results
  resultCount: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 12,
  },
  resultsList: {
    gap: 12,
  },
  resultItem: {
    backgroundColor: Colors.light,
    borderRadius: 12,
    overflow: "hidden",
  },
});
