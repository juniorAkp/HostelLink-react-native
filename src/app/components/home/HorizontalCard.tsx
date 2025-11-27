import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { blurhash } from "../../constants/blurhash";
import { Fonts } from "../../constants/theme";
import type { Hostels } from "../../data/hostel";
import { useTheme } from "../../hooks/useTheme";

interface HorizontalCardProps {
  hostel: Hostels;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const HorizontalCard = ({
  onPress,
  onLike,
  isLiked = false,
  hostel,
}: HorizontalCardProps) => {
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
            size={20}
            color={isLiked ? "#FF3B30" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Title and Location */}
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {hostel?.name}
          </Text>
          <View style={styles.locationContainer}>
            <FontAwesome6
              name="location-dot"
              size={12}
              color={colors.primary}
            />
            <Text
              style={[styles.location, { color: colors.muted }]}
              numberOfLines={1}
            >
              {hostel?.address}
            </Text>
          </View>
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

export default HorizontalCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: moderateScale(120),
    flexDirection: "row",
    borderRadius: scale(16),
    padding: scale(8),
    overflow: "hidden",
    marginBottom: verticalScale(16),
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
    width: scale(120),
    height: moderateScale(120),
    position: "relative",
    borderRadius: scale(12),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  likeButton: {
    position: "absolute",
    top: moderateScale(8),
    right: moderateScale(8),
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: moderateScale(12),
    paddingVertical: moderateScale(4),
    justifyContent: "space-between",
  },
  header: {
    gap: verticalScale(4),
  },
  title: {
    fontSize: moderateScale(17),
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
    fontSize: moderateScale(13),
    flex: 1,
    fontFamily: Fonts.brand,
  },
  description: {
    fontSize: moderateScale(13),
    lineHeight: verticalScale(19),
    fontFamily: Fonts.brand,
  },
});
