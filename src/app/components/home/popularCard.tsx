import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { blurhash } from "../../constants/blurhash";
import { Fonts } from "../../constants/theme";
import { Hostels } from "../../data/hostel";
import { useTheme } from "../../hooks/useTheme";

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
  const { colors } = useTheme();
  return (
    <Link href={`/hostel/${hostel.id}`} asChild>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.card }]}
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
            placeholder={{ blurhash: blurhash }}
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
              <FontAwesome6 name="map-pin" size={10} color={"red"} />
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
    </Link>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  container: {
    width: scale(280),
    height: verticalScale(320),
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
    height: verticalScale(140),
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(16),
    paddingBottom: verticalScale(20),
  },
  titleText: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#fff",
    marginBottom: verticalScale(6),
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
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#fff",
    marginLeft: scale(4),
    fontFamily: Fonts.brandBold,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  locationText: {
    fontSize: moderateScale(13),
    color: "#fff",
    marginLeft: scale(4),
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
});
