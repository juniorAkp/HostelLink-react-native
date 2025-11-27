import SearchCard from "@/src/app/components/common/searchCard";
import RestaurantHeader from "@/src/app/components/home/header";
import HorizontalCard from "@/src/app/components/home/HorizontalCard";
import PopularCard from "@/src/app/components/home/popularCard";
import { Fonts } from "@/src/app/constants/theme";
import {
  useFavouriteStore,
  useSetFavourite,
} from "@/src/app/hooks/useFavourite";
import { useHostels } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { useTheme } from "@/src/app/hooks/useTheme";
import { getDistance } from "@/src/app/utils/haversine";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const HEADER_HEIGHT = verticalScale(60);

const HostelPage = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const {
    latitude,
    longitude,
    address,
    isLoading: locationLoading,
    error: locationError,
    country,
    startWatching,
    stopWatching,
  } = useLocationStore();
  const {
    isLoading,
    isRefetching,
    isError,
    error,
    data: hostels = [],
    refetch,
  } = useHostels(country ?? "");

  const { addFavourite, removeFavourite } = useSetFavourite();
  const { favouriteHostelIds } = useFavouriteStore();

  const router = useRouter();

  const toggleLike = (hostelId: string) => {
    if (favouriteHostelIds.includes(hostelId)) {
      removeFavourite(hostelId);
    } else {
      addFavourite(hostelId);
    }
  };
  useEffect(() => {
    startWatching();
    return () => stopWatching();
  }, [startWatching, stopWatching]);

  const sortedHostels =
    latitude && longitude
      ? [...hostels].sort((a, b) => {
          const distA = getDistance(
            latitude,
            longitude,
            a.exact_location.lat,
            a.exact_location.lng
          );
          const distB = getDistance(
            latitude,
            longitude,
            b.exact_location.lat,
            b.exact_location.lng
          );
          return distA - distB;
        })
      : hostels;

  // 1. Loading State
  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.muted }]}>
          Finding the best hostels for you...
        </Text>
      </View>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons name="cloud-offline-outline" size={64} color={colors.error} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>
          Oops! Something went wrong
        </Text>
        <Text style={[styles.errorMessage, { color: colors.muted }]}>
          {error?.message ||
            "We couldn't fetch the hostels. Please check your connection and try again."}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={() => refetch()}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Empty State
  if (!isLoading && !isError && hostels.length === 0) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons name="search-outline" size={64} color={colors.muted} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>
          No Hostels Found
        </Text>
        <Text style={[styles.errorMessage, { color: colors.muted }]}>
          We couldn't find any hostels in this region yet.
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={() => refetch()}
        >
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RestaurantHeader
        address={address ?? (locationLoading ? "Detecting..." : "Location off")}
        title="Discover Great Hostels"
        scrollOffset={scrollOffset}
      />

      <Animated.ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_HEIGHT,
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Discover Great Hostels
        </Text>

        {/* Popular Hostels */}
        <Text style={[styles.textHeading, { color: colors.text }]}>
          Popular Hostels
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={hostels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isLiked = favouriteHostelIds.includes(item.id);
            return (
              <PopularCard
                hostel={item}
                isLiked={isLiked}
                onLike={() => toggleLike(item.id)}
              />
            );
          }}
          contentContainerStyle={{ paddingHorizontal: scale(6) }}
        />

        {/* Nearby Hostels */}
        <Text style={[styles.textHeading, { color: colors.text }]}>
          {latitude ? "Nearby Hostels" : "All Hostels"}
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedHostels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isLiked = favouriteHostelIds.includes(item.id);
            return (
              <View>
                <SearchCard
                  hostel={item}
                  isLiked={isLiked}
                  onPress={() => router.push(`/hostel/${item.id}`)}
                  onLike={() => toggleLike(item.id)}
                />
              </View>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: scale(6) }}
        />

        {/* Recommended */}
        <Text style={[styles.textHeading, { color: colors.text }]}>
          Recommended For You
        </Text>
        <FlatList
          data={sortedHostels.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isLiked = favouriteHostelIds.includes(item.id);
            return (
              <View>
                <HorizontalCard
                  hostel={item}
                  isLiked={isLiked}
                  onPress={() => router.push(`/hostel/${item.id}`)}
                  onLike={() => toggleLike(item.id)}
                />
              </View>
            );
          }}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: scale(6) }}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: moderateScale(30),
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(6),
  },
  textHeading: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(20),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(6),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  loadingText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
  },
  errorTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(20),
    marginTop: verticalScale(16),
    textAlign: "center",
  },
  errorMessage: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(14),
    textAlign: "center",
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },
  retryButton: {
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
  },
  retryButtonText: {
    color: "#fff",
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(16),
  },
});

export default HostelPage;
