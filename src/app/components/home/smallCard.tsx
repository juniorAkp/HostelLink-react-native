import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { blurhash } from "../../constants/blurhash";
import { Colors, Fonts } from "../../constants/theme";

interface HorizontalCardProps {
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
  price = "$50",
  rating = 4.5,
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
            uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          }}
          contentFit="cover"
          transition={200}
          style={styles.image}
          placeholder={{ blurhash: blurhash }}
        />

        {/* Like Button */}
        {onLike && (
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
        )}
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {"hostel 1"}
            </Text>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.muted}
              />
              <Text style={styles.location} numberOfLines={1}>
                {"hostel 1"}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {true && (
          <Text style={styles.description} numberOfLines={2}>
            {"hostel 1"}
          </Text>
        )}

        {/* Footer with Price */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
          <View style={styles.countryBadge}>
            <Ionicons name="flag-outline" size={12} color={Colors.primary} />
            <Text style={styles.countryText}>hello</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 140,
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
    width: 140,
    height: 140,
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
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
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
