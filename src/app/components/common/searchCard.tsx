import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { blurhash } from "../../constants/blurhash";
import { Colors, Fonts } from "../../constants/theme";
import type { Hostels } from "../../data/hostel";

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
  return (
    <Link href={`/hostel/${hostel.id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.9}>
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
          <Text style={styles.text}>{hostel?.name}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <FontAwesome6 name="map-pin" size={10} color={"red"} />
            <Text numberOfLines={1}>{hostel?.address}</Text>
          </View>

          <Text numberOfLines={1}>{hostel?.description}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 200,
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
    width: 170,
    height: 120,
    position: "relative",
    backgroundColor: Colors.light,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
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
  info: {
    padding: 5,
    gap: 4,
  },
  text: {
    fontFamily: Fonts.brandBold,
  },
});
