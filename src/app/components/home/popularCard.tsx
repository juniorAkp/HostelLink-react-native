import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fonts } from "../../constants/theme";
import { Hostels } from "../../data/hostel";

interface PopularCardProps {
  hostel: Hostels;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

const PopularCard = ({
  hostel,
  onPress,
  onLike,
  isLiked = false,
}: PopularCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Section with Overlay Text */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: hostel.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {/* Gradient Overlay for better text readability */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.gradientOverlay}
        />
        {/* Text Overlay */}
        <View style={styles.textOverlay}>
          <Text style={styles.titleText} numberOfLines={2}>
            {hostel.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{hostel.address}</Text>
            <Text style={styles.locationText}> • {hostel.country}</Text>
          </View>
        </View>
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
    </TouchableOpacity>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 320,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    fontFamily: Fonts.brandBold,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 4,
    fontFamily: Fonts.brandBold,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  locationText: {
    fontSize: 13,
    color: "#fff",
    marginLeft: 4,
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  likeButton: {
    position: "absolute",
    top: 12,
    right: 12,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
