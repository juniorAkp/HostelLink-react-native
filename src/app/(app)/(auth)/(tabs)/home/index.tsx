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
import { useRouter } from "expo-router";
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
    isFetching,
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

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (sortedHostels.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error?.message || " Oops! No hostels found in your region"}
        </Text>
      </View>
    );
  }

  // Error
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.error }]}>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  errorText: {
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});

export default HostelPage;
