import SearchCard from "@/src/app/components/common/searchCard";
import RestaurantHeader from "@/src/app/components/home/header";
import PopularCard from "@/src/app/components/home/popularCard";
import HorizontalCard from "@/src/app/components/home/smallCard";
import { Colors, Fonts } from "@/src/app/constants/theme";
import {
  useFavouriteStore,
  useSetFavourite,
} from "@/src/app/hooks/useFavourite";
import { useHostels } from "@/src/app/hooks/useHostels";
import { useLocationStore } from "@/src/app/hooks/useLocation";
import { getDistance } from "@/src/app/utils/haversine";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 60;

const HostelPage = () => {
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
    isFetching,
    isError,
    error,
    data: hostels = [],
    refetch,
  } = useHostels(country ?? "");

  const { addFavourite, removeFavourite } = useSetFavourite();
  const { favouriteHostelIds } = useFavouriteStore();

  const toggleLike = (hostelId: string) => {
    //if hostel id includes the favouritehosteIds remove
    if (favouriteHostelIds.includes(hostelId)) {
      removeFavourite(hostelId);
    } else {
      addFavourite(hostelId);
    }
  };
  // Start location watching
  useEffect(() => {
    startWatching();
    return () => stopWatching();
  }, [startWatching, stopWatching]);

  // Sort hostels by distance if location available
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

  // Loading
  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (sortedHostels.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || " Oops! No hostels found in your region"}
        </Text>
      </View>
    );
  }

  // Error
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || "An error occurred while fetching Hostels"}
        </Text>
        <Button
          title="Retry"
          onPress={() =>
            refetch({
              throwOnError: true,
            })
          }
        />
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
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_HEIGHT,
          paddingBottom: insets.bottom + 20,
        }}
      >
        <Text style={styles.pageTitle}>Discover Great Hostels</Text>

        {/* Popular Hostels */}
        <Text style={styles.textHeading}>Popular Hostels</Text>
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
          contentContainerStyle={{ paddingHorizontal: 6 }}
        />

        {/* Nearby Hostels */}
        <Text style={styles.textHeading}>
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
              <SearchCard
                hostel={item}
                isLiked={isLiked}
                onLike={() => toggleLike(item.id)}
              />
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 6 }}
        />

        {/* Recommended */}
        <Text style={styles.textHeading}>Recommended For You</Text>
        <FlatList
          data={sortedHostels.slice(0, 5)}
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
          scrollEnabled={false}
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
    fontSize: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  textHeading: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
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

export default HostelPage;
