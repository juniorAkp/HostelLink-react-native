import { FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { Colors } from "../../constants/theme";

interface RestaurantHeaderProps {
  title: string;
  scrollOffset: SharedValue<number>;
}

const SCOLL_THRESHOLD = 60;

const RestaurantHeader = ({ title, scrollOffset }: RestaurantHeaderProps) => {
  const insets = useSafeAreaInsets();
  const [header1PointerEvents, setHeader1PointerEvents] = useState<
    "auto" | "none"
  >("auto");
  const [header2PointerEvents, setHeader2PointerEvents] = useState<
    "auto" | "none"
  >("none");

  useAnimatedReaction(
    () => scrollOffset.value,
    (current) => {
      const header1Opacity = interpolate(
        current,
        [0, SCOLL_THRESHOLD * 0.6],
        [1, 0],
        Extrapolation.CLAMP
      );
      const header2Opacity = interpolate(
        current,
        [SCOLL_THRESHOLD * 0.3, SCOLL_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP
      );

      // Header2 should receive touches when it's significantly visible
      // When header2 is visible, disable header1 to allow touches to pass through
      const header2ShouldBeActive = header2Opacity > 0.1;
      const header1ShouldBeActive =
        header1Opacity > 0.1 && !header2ShouldBeActive;

      scheduleOnRN(
        setHeader1PointerEvents,
        header1ShouldBeActive ? "auto" : "none"
      );
      scheduleOnRN(
        setHeader2PointerEvents,
        header2ShouldBeActive ? "auto" : "none"
      );
    }
  );

  const header1Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD * 0.6],
      [1, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD * 0.6],
      [0, -10],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const header2Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCOLL_THRESHOLD * 0.3, SCOLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [SCOLL_THRESHOLD * 0.3, SCOLL_THRESHOLD],
      [-10, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      shadowOpacity: opacity * 0.1,
      elevation: opacity * 4,
    };
  });

  return (
    <Animated.View
      style={[styles.headerContainer, shadowStyle, { paddingTop: insets.top }]}
    >
      {/* Header 1 */}
      <Animated.View
        style={[styles.header1, header1Style]}
        pointerEvents={header1PointerEvents}
      >
        <Link href="/location" asChild>
          <Pressable style={styles.locationButton}>
            <FontAwesome6 name="map-pin" size={20} color={"red"} />
            <Text style={styles.locationText}>Münster</Text>
            <Ionicons name="chevron-down" size={16} />
          </Pressable>
        </Link>

        <View style={styles.rightIcons}>
          <Link href="/filter" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </Link>
          <Link href="/location" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>

      {/* Header 2 */}
      <Animated.View
        style={[styles.header2, header2Style]}
        pointerEvents={header2PointerEvents}
      >
        <View style={styles.centerContent}>
          <Text style={styles.titleSmall}>{title}</Text>
          <Link href="/location" asChild>
            <TouchableOpacity style={styles.locationSmall}>
              <Text style={styles.locationSmallText}>Münster</Text>
              <Ionicons name="chevron-down" size={14} />
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.rightIcons}>
          <Link href="/location" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 100,
    // boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.2)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  header1: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    gap: 6,
  },
  locationButtonIcon: {
    borderRadius: 20,
    backgroundColor: Colors.light,
    padding: 10,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.light,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 40,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 2,
  },
  locationSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  locationSmallText: {
    fontSize: 12,
    color: Colors.muted,
  },
});
export default RestaurantHeader;
