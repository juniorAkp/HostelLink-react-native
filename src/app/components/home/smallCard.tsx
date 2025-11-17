import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
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
    <Link href={`/hostel/${hostel.id}`} asChild>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Image Section */}
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
              size={18}
              color={isLiked ? "#FF3B30" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text
                style={[styles.title, { color: colors.text }]}
                numberOfLines={1}
              >
                {hostel?.name}
              </Text>
              <View style={styles.locationContainer}>
                <FontAwesome6 name="map-pin" size={10} color={"red"} />
                <Text
                  style={[styles.location, { color: colors.muted }]}
                  numberOfLines={1}
                >
                  {hostel?.address}
                </Text>
              </View>
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
    </Link>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: verticalScale(120),
    flexDirection: "row",
    borderRadius: scale(12),
    padding: scale(5),
    overflow: "hidden",
    marginBottom: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
    elevation: 3,
    borderWidth: 1,
  },
  imageContainer: {
    width: scale(150),
    height: verticalScale(120),
    position: "relative",
    borderRadius: scale(16),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: scale(16),
  },
  ratingBadge: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(3),
    borderRadius: scale(12),
    gap: scale(3),
  },
  ratingText: {
    fontSize: moderateScale(11),
    fontWeight: "600",
    color: "#fff",
    fontFamily: Fonts.brandBold,
  },
  likeButton: {
    position: "absolute",
    top: scale(5),
    right: scale(5),
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
  },
  contentContainer: {
    flex: 1,
    padding: scale(12),
    justifyContent: "space-between",
  },
  header: {
    marginBottom: verticalScale(6),
  },
  titleContainer: {
    marginBottom: verticalScale(4),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginBottom: verticalScale(4),
    fontFamily: Fonts.brandBold,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  location: {
    fontSize: moderateScale(12),
    flex: 1,
    fontFamily: Fonts.brandBold,
  },
  description: {
    fontSize: moderateScale(13),
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(8),
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: scale(6),
    marginBottom: verticalScale(8),
  },
  amenityTag: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(8),
  },
  amenityText: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.brandBold,
  },
  moreAmenities: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.brandBold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: scale(4),
  },
  priceLabel: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.brandBold,
  },
  price: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    fontFamily: Fonts.brandBold,
  },
  priceUnit: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.brandBold,
  },
  countryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(8),
  },
  countryText: {
    fontSize: moderateScale(11),
    fontWeight: "600",
    fontFamily: Fonts.brandBold,
  },
});
