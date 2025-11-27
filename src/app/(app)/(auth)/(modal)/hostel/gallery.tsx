import { blurhash } from "@/src/app/constants/blurhash";
import { useTheme } from "@/src/app/hooks/useTheme";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const GAP = moderateScale(12);

const Gallery = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { images: imagesParam } = useLocalSearchParams();

  // Determine columns based on screen width
  // Tablet (>768px): 4 columns
  // Large Phone/Small Tablet (>500px): 3 columns
  // Phone: 2 columns
  const numColumns = width > 768 ? 4 : width > 500 ? 3 : 2;

  // Calculate item width dynamically
  // Available width = Screen Width - (Left Padding + Right Padding)
  // Total Gap Space = Gap * (Number of Columns - 1)
  // Item Width = (Available Width - Total Gap Space) / Number of Columns
  const availableWidth = width - GAP * 2;
  const totalGapSpace = GAP * (numColumns - 1);
  const itemWidth = (availableWidth - totalGapSpace) / numColumns;

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
    <View
      style={[
        styles.gridItemContainer,
        { width: itemWidth, height: itemWidth },
      ]}
    >
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
        key={numColumns}
        data={gridImages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
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
    gap: GAP,
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
