import { blurhash } from "@/src/app/constants/blurhash";
import { useTheme } from "@/src/app/hooks/useTheme";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");
const GAP = moderateScale(12);
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - GAP * 3) / COLUMN_COUNT; // GAP * 3 for left, middle, right padding

const Gallery = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { images: imagesParam } = useLocalSearchParams();

  const images = useMemo(() => {
    try {
      return typeof imagesParam === "string" ? JSON.parse(imagesParam) : [];
    } catch (e) {
      return [];
    }
  }, [imagesParam]);

  const heroImage = images.length > 0 ? images[0] : null;
  const gridImages = images.length > 1 ? images.slice(1) : [];

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.gridItemContainer}>
      <Image
        source={{ uri: item }}
        style={styles.gridImage}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={200}
      />
    </View>
  );

  const renderHeader = () => {
    if (!heroImage) return null;
    return (
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: heroImage }}
          style={styles.heroImage}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={200}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={gridImages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={COLUMN_COUNT}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !heroImage ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: colors.muted }}>No images available</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  listContent: {
    padding: GAP,
    paddingBottom: verticalScale(40),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: GAP,
  },
  heroContainer: {
    marginBottom: GAP,
    borderRadius: moderateScale(16),
    overflow: "hidden",
    width: "100%",
    height: verticalScale(220),
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gridItemContainer: {
    width: ITEM_WIDTH,
    height: verticalScale(150),
    borderRadius: moderateScale(12),
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: verticalScale(50),
  },
});
