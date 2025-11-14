import SearchCard from "@/src/app/components/common/searchCard";
import RestaurantHeader from "@/src/app/components/home/header";
import PopularCard from "@/src/app/components/home/popularCard";
import HorizontalCard from "@/src/app/components/home/smallCard";
import { Colors, Fonts } from "@/src/app/constants/theme";
import { useHostels } from "@/src/app/hooks/useHostels";
import {
  ActivityIndicator,
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

  const { isFetching, isError, error, data: hostels } = useHostels();

  // Loading State
  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Error State
  if (isError || !hostels) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || "Failed to load hostel details"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RestaurantHeader
        title="Discover Great Hostels"
        scrollOffset={scrollOffset}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_HEIGHT,
          paddingBottom: insets.bottom + HEADER_HEIGHT,
        }}
      >
        <Text style={styles.pageTitle}>Discover Great Hostels</Text>
        {/* <PopularCard /> */}
        <Text style={styles.textHeading}>Popular Hostels</Text>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={hostels}
          renderItem={({ item }) => <PopularCard hostel={item} />}
        />
        {/* <PopularCard hostel={}/> */}
        <Text style={styles.textHeading}>Nearby Hostels</Text>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={hostels}
          renderItem={({ item }) => <SearchCard hostel={item} />}
        />
        <Text style={styles.textHeading}>Recommended Hostels For You</Text>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={hostels}
          renderItem={({ item }) => <HorizontalCard hostel={item} />}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  pageTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    marginBottom: 16,
  },
  textHeading: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  allRestaurantsTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 16,
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
