import { blurhash } from "@/src/app/constants/blurhash";
import { Colors, Fonts } from "@/src/app/constants/theme";
import { useHostel } from "@/src/app/hooks/useHostels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HostelPage = () => {
  const { id } = useLocalSearchParams();
  const {
    data: hostel,
    isFetching,
    isError,
    error,
    refetch,
  } = useHostel(id as string);
  const router = useRouter();

  // Loading State
  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Error State
  if (isError || !hostel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error?.message || "Failed to fetch hostel details"}
        </Text>
        <Button
          title="Retry"
          onPress={() =>
            refetch({
              throwOnError: true,
            })
          }
        />
      </View>
    );
  }

  // Reusable Separator
  const Separator = () => <View style={styles.separator} />;

  // Reusable Section Title
  const SectionTitle = ({ children }: { children: string | string[] }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
  );

  // Reusable Detail Text
  const DetailText = ({ children }: { children: string }) => (
    <Text style={styles.detailText}>{children}</Text>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: hostel.images[0] }}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        {/* Name + Address + Navigate Button */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hostelName}>{hostel.name}</Text>
            <Text style={styles.hostelAddress}>{hostel.address}</Text>
          </View>
          <Pressable
            style={styles.navigateButton}
            onPress={() => router.dismiss()}
          >
            <MaterialCommunityIcons
              name="navigation-variant"
              size={24}
              color="#000"
            />
          </Pressable>
        </View>

        <Separator />

        {/* Amenities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionTitle>Amenities</SectionTitle>
            <Pressable>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.amenitiesRow}>
            {hostel.amenities.map((amenity, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <Separator />

        {/* Gallery */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionTitle>Gallery</SectionTitle>
            <Pressable>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.amenitiesRow}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={4}
              key={hostel.id}
              maxToRenderPerBatch={4}
              data={hostel.images}
              renderItem={({ item }) => {
                return (
                  <View style={styles.galleryImage}>
                    <Image
                      contentFit="cover"
                      transition={200}
                      style={styles.image}
                      source={{ uri: item }}
                      placeholder={{ blurhash: blurhash }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>

        <Separator />

        {/* Description */}
        {hostel.description && (
          <>
            <View style={styles.section}>
              <SectionTitle>Description</SectionTitle>
              <DetailText>{hostel.description}</DetailText>
            </View>
            <Separator />
          </>
        )}

        {/* Phone Numbers */}
        {hostel.phone_numbers?.length > 0 && (
          <>
            <View style={styles.section}>
              <SectionTitle>
                Phone Number{hostel.phone_numbers.length > 1 ? "s" : ""}
              </SectionTitle>
              {hostel.phone_numbers.map((phone, idx) => (
                <Text key={idx} style={styles.linkText} selectable>
                  {phone}
                </Text>
              ))}
            </View>
            <Separator />
          </>
        )}

        {/* Email Addresses */}
        {hostel.email_addresses?.length > 0 && (
          <>
            <View style={styles.section}>
              <SectionTitle>
                Email Address{hostel.email_addresses.length > 1 ? "es" : ""}
              </SectionTitle>
              {hostel.email_addresses.map((email, idx) => (
                <Text key={idx} style={styles.linkText} selectable>
                  {email}
                </Text>
              ))}
            </View>
            <Separator />
          </>
        )}

        {/* Website */}
        {hostel.website_url && (
          <View style={styles.section}>
            <SectionTitle>Website</SectionTitle>
            <Text
              style={styles.websiteLink}
              selectable
              onPress={() => Linking.openURL(hostel.website_url!)}
            >
              {hostel.website_url}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HostelPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40, // Extra space at bottom
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 280, // Fixed height for consistency
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hostelName: {
    fontFamily: Fonts.brandBlack,
    fontSize: 24,
    color: "#000",
  },
  hostelAddress: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.muted,
    marginTop: 2,
  },
  navigateButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: Colors.light,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.secondary,
    marginVertical: 16,
  },
  section: {
    gap: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: "#000",
  },
  seeAllText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: Colors.primary,
  },
  amenitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  amenityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.light,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  amenityText: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: "#000",
  },
  galleryImage: {
    height: 120,
    width: 120,
    borderRadius: 16,
    marginRight: 10,
  },
  detailText: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.muted,
    lineHeight: 22,
  },
  linkText: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  websiteLink: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
