import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { blurhash } from "../../constants/blurhash";
import { Fonts } from "../../constants/theme";
import type { Hostels } from "../../data/hostel";
import { useTheme } from "../../hooks/useTheme";

interface MapCardProps {
  hostel: Hostels;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const MapCard = ({
  onPress,
  onLike,
  isLiked = false,
  hostel,
}: MapCardProps) => {
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
      onPress={onPress}
      activeOpacity={0.9}
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
            size={moderateScale(18)}
            color={isLiked ? "#FF3B30" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {hostel?.name}
        </Text>

        {/* Location */}
        <View style={styles.locationContainer}>
          <FontAwesome6
            name="location-dot"
            size={moderateScale(11)}
            color={colors.primary}
          />
          <Text
            style={[styles.location, { color: colors.muted }]}
            numberOfLines={1}
          >
            {hostel?.address}
          </Text>
        </View>

        {/* Description */}
        <Text
          style={[styles.description, { color: colors.muted }]}
          numberOfLines={2}
        >
          {hostel?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MapCard;

const styles = StyleSheet.create({
  container: {
    width: scale(280),
    borderRadius: scale(12),
    borderWidth: 1,
    overflow: "hidden",
    marginRight: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(140),
    position: "relative",
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
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: scale(12),
    gap: verticalScale(4),
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(15),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  location: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(12),
    flex: 1,
  },
  description: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(12),
    lineHeight: verticalScale(16),
  },
});
