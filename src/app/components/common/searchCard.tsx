import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { blurhash } from "../../constants/blurhash";
import { Fonts } from "../../constants/theme";
import type { Hostels } from "../../data/hostel";
import { useTheme } from "../../hooks/useTheme";

interface SearchCardProps {
  hostel: Hostels;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}
const SearchCard = ({
  hostel,
  onPress,
  onLike,
  isLiked = false,
}: SearchCardProps) => {
  const { colors } = useTheme();
  return (
    <Link href={`/hostel/${hostel.id}`} asChild>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.card }]}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: hostel?.images[0],
            }}
            contentFit="cover"
            transition={200}
            style={styles.image}
            placeholder={{ blurhash: blurhash }}
          />

          {/* Like Button */}
          <TouchableOpacity
            style={styles.likeButton}
            onPress={onLike}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? "#FF3B30" : "#fff"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={[styles.text, { color: colors.text }]}>
            {hostel?.name}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <FontAwesome6 name="map-pin" size={10} color={"red"} />
            <Text numberOfLines={1} style={{ color: colors.muted }}>
              {hostel?.address}
            </Text>
          </View>

          <Text numberOfLines={1} style={{ color: colors.muted }}>
            {hostel?.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    width: scale(170),
    height: verticalScale(200),
    borderRadius: scale(16),
    overflow: "hidden",
    marginRight: scale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },

    shadowOpacity: 0.1,
    shadowRadius: scale(8),
    elevation: 5,
  },
  imageContainer: {
    width: scale(170),
    height: verticalScale(120),
    position: "relative",
    borderRadius: scale(10),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: scale(10),
  },
  likeButton: {
    position: "absolute",
    top: scale(12),
    right: scale(12),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 3,
  },
  info: {
    padding: scale(5),
    gap: scale(4),
  },
  text: {
    fontFamily: Fonts.brandBold,
  },
});
