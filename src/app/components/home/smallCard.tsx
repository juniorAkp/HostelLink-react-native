import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { blurhash } from "../../constants/blurhash";
import { Colors, Fonts } from "../../constants/theme";
import type { Hostels } from "../../data/hostel";

interface HorizontalCardProps {
  hostel?: Hostels;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
  price?: string;
  rating?: number;
}

const HorizontalCard = ({
  onPress,
  onLike,
  isLiked = false,
  hostel,
}: HorizontalCardProps) => {
  // Get first few amenities for display
  // const displayedAmenities = hostel.amenities?.slice(0, 3) || [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
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
            <Text style={styles.title} numberOfLines={1}>
              {hostel?.name}
            </Text>
            <View style={styles.locationContainer}>
              <FontAwesome6 name="map-pin" size={10} color={"red"} />
              <Text style={styles.location} numberOfLines={1}>
                {hostel?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
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
    minHeight: 120,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 5,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.light,
  },
  imageContainer: {
    width: 150,
    height: 120,
    position: "relative",
    backgroundColor: Colors.light,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
    fontFamily: Fonts.brandBold,
  },
  likeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 6,
  },
  titleContainer: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 4,
    fontFamily: Fonts.brandBold,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 12,
    color: Colors.muted,
    flex: 1,
    fontFamily: Fonts.brandBold,
  },
  description: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 18,
    marginBottom: 8,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  amenityTag: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amenityText: {
    fontSize: 11,
    color: Colors.muted,
    fontFamily: Fonts.brandBold,
  },
  moreAmenities: {
    fontSize: 11,
    color: Colors.primary,
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
    gap: 4,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.muted,
    fontFamily: Fonts.brandBold,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
    fontFamily: Fonts.brandBold,
  },
  priceUnit: {
    fontSize: 11,
    color: Colors.muted,
    fontFamily: Fonts.brandBold,
  },
  countryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  countryText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: "600",
    fontFamily: Fonts.brandBold,
  },
});
