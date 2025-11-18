import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
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
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Image Section */}
      <View style={[styles.imageContainer, { backgroundColor: colors.light }]}>
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
          style={[styles.likeButton, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
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

      {/* Content Section */}
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {hostel?.name}
        </Text>

        <View style={styles.locationContainer}>
          <FontAwesome6 name="location-dot" size={12} color={colors.primary} />
          <Text
            numberOfLines={1}
            style={[styles.location, { color: colors.muted }]}
          >
            {hostel?.address}
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={[styles.description, { color: colors.muted }]}
        >
          {hostel?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    width: scale(180),
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
    elevation: 4,
    borderWidth: 1,
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(140),
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  likeButton: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    padding: scale(12),
    gap: verticalScale(6),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    fontFamily: Fonts.brandBold,
    letterSpacing: -0.3,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  location: {
    fontSize: moderateScale(12),
    flex: 1,
    fontFamily: Fonts.brand,
  },
  description: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontFamily: Fonts.brand,
  },
});
