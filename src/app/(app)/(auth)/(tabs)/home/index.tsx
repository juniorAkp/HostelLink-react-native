import SearchCard from "@/src/app/components/common/searchCard";
import RestaurantHeader from "@/src/app/components/home/header";
import PopularCard from "@/src/app/components/home/popularCard";
import HorizontalCard from "@/src/app/components/home/smallCard";
import { Fonts } from "@/src/app/constants/theme";
import { useHostels } from "@/src/app/hooks/useHostels";
import { FlatList, StyleSheet, Text, View } from "react-native";
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

  const { data } = useHostels();

  return (
    <View style={styles.container}>
      <RestaurantHeader title="Hostels" scrollOffset={scrollOffset} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}
      >
        <Text style={styles.pageTitle}>Hostels</Text>
        {/* <PopularCard /> */}
        <Text style={styles.textHeading}>Popular Hostels</Text>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <PopularCard hostel={item} />}
        />
        {/* <PopularCard hostel={}/> */}
        <Text style={styles.textHeading}>Nearby Hostels</Text>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <SearchCard hostel={item} />}
        />
        <Text style={styles.textHeading}>Recommended Hostels</Text>
        <HorizontalCard />
        {[...Array(30)].map((_, i) => (
          <View
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
              padding: 20,
              marginHorizontal: 16,
              marginBottom: 12,
              borderRadius: 8,
            }}
          >
            <Text>Test Row #{i + 1}</Text>
          </View>
        ))}
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
    fontFamily: Fonts.brand,
    fontSize: 26,
    marginTop: 15,
    marginBottom: 15,
  },
  allRestaurantsTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
export default HostelPage;
