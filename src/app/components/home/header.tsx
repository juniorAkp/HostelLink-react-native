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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { scheduleOnRN } from "react-native-worklets";
import { Colors } from "../../constants/theme";

interface RestaurantHeaderProps {
  title: string;
  address?: string;
  scrollOffset: SharedValue<number>;
}

const SCOLL_THRESHOLD = verticalScale(60);

const RestaurantHeader = ({
  title,
  scrollOffset,
  address,
}: RestaurantHeaderProps) => {
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
        <Pressable style={styles.locationButton}>
          <FontAwesome6 name="map-pin" size={20} color={"red"} />
          <Text style={styles.locationText}>{address}</Text>
        </Pressable>

        <View style={styles.rightIcons}>
          <Link href="/favourite" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart" size={20} color="#FF3B30" />
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
          <Pressable style={styles.locationSmall}>
            <Text style={styles.locationSmallText}>{address}</Text>
          </Pressable>
        </View>
        <View style={styles.rightIcons}>
          <Link href="/favourite" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart" size={20} color="#FF3B30" />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: scale(4),
  },
  header1: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(20),
    gap: scale(6),
  },
  locationButtonIcon: {
    borderRadius: scale(20),
    backgroundColor: Colors.light,
    padding: scale(10),
  },
  rightIcons: {
    flexDirection: "row",
    gap: scale(8),
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    backgroundColor: Colors.light,
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingLeft: scale(40),
  },
  titleSmall: {
    fontSize: moderateScale(16),
    fontWeight: 700,
    marginBottom: verticalScale(2),
  },
  locationSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(2),
  },
  locationSmallText: {
    fontSize: moderateScale(12),
    color: Colors.muted,
  },
});
export default RestaurantHeader;
