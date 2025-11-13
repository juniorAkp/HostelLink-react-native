import RestaurantHeader from "@/src/app/components/home/header";
import { Fonts } from "@/src/app/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const HEADER_HEIGHT = 60;
const RestaurantListPage = () => {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });
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
  allRestaurantsTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
export default RestaurantListPage;
