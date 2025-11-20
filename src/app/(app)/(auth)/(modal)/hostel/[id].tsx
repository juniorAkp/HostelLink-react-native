import { blurhash } from "@/src/app/constants/blurhash";
import { Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import { useHostel } from "@/src/app/hooks/useHostels";
import { useTheme } from "@/src/app/hooks/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
  const { user, isGuest } = useUserStore();
  const { colors } = useTheme();

  // Loading State
  if (isFetching) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Error State
  if (isError || !hostel) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>
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
  const Separator = () => (
    <View style={[styles.separator, { backgroundColor: colors.border }]} />
  );

  // Reusable Section Title
  const SectionTitle = ({ children }: { children: string | string[] }) => (
    <Text style={[styles.sectionTitle, { color: colors.text }]}>
      {children}
    </Text>
  );

  // Reusable Detail Text
  const DetailText = ({ children }: { children: string }) => (
    <Text style={[styles.detailText, { color: colors.muted }]}>{children}</Text>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
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
            <Text style={[styles.hostelName, { color: colors.text }]}>
              {hostel.name}
            </Text>
            <Text style={[styles.hostelAddress, { color: colors.muted }]}>
              {hostel.address}
            </Text>
          </View>
          <Pressable
            style={[styles.navigateButton, { backgroundColor: colors.light }]}
            onPress={() =>
              router.push({
                pathname: "/(app)/(auth)/(tabs)/explore",
                params: { viewMode: "single", hostelId: hostel.id },
              })
            }
          >
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={24}
              color={colors.text}
            />
          </Pressable>
        </View>

        <Separator />

        {/* Amenities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionTitle>Amenities</SectionTitle>
            <Pressable>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
            </Pressable>
          </View>
          <View style={styles.amenitiesRow}>
            {hostel.amenities.map((amenity, idx) => (
              <View
                key={idx}
                style={[styles.amenityChip, { backgroundColor: colors.light }]}
              >
                <Text style={[styles.amenityText, { color: colors.text }]}>
                  {amenity}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Separator />

        {/* Gallery */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionTitle>Gallery</SectionTitle>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(app)/(auth)/(modal)/hostel/gallery",
                  params: { images: JSON.stringify(hostel.images) },
                })
              }
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
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
                <Text
                  key={idx}
                  style={[styles.linkText, { color: colors.primary }]}
                  selectable
                >
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
                <Text
                  key={idx}
                  style={[styles.linkText, { color: colors.primary }]}
                  selectable
                >
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
              style={[styles.websiteLink, { color: colors.primary }]}
              selectable
              onPress={() => Linking.openURL(hostel.website_url!)}
            >
              {hostel.website_url}
            </Text>
          </View>
        )}

        {/* Partner CTA Banner - Only show for non-admin authenticated users */}
        {!isGuest && user?.role !== "admin" && (
          <TouchableOpacity
            style={[
              styles.partnerBanner,
              { backgroundColor: colors.light, borderColor: colors.border },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                "Become a Hostel Partner",
                "List your hostel on HostelLink and reach thousands of potential guests. Upgrade to a partner account to get started.",
                [
                  { text: "Not Now", style: "cancel" },
                  {
                    text: "Learn More",
                    onPress: () => {
                      // TODO: Navigate to partner onboarding
                      Alert.alert("Coming Soon", "Partner onboarding page");
                    },
                  },
                ]
              );
            }}
          >
            <View
              style={[
                styles.partnerBannerIcon,
                { backgroundColor: colors.card },
              ]}
            >
              <Ionicons name="business" size={24} color={colors.primary} />
            </View>
            <View style={styles.partnerBannerContent}>
              <Text style={[styles.partnerBannerTitle, { color: colors.text }]}>
                Own a hostel? List it here!
              </Text>
              <Text
                style={[styles.partnerBannerSubtitle, { color: colors.muted }]}
              >
                Join HostelLink as a partner and grow your business
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default HostelPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(40),
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
    padding: scale(20),
  },
  errorText: {
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(280),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(24),
    gap: verticalScale(6),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hostelName: {
    fontFamily: Fonts.brandBlack,
    fontSize: moderateScale(24),
  },
  hostelAddress: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(15),
    marginTop: verticalScale(2),
  },
  navigateButton: {
    padding: scale(8),
    borderRadius: scale(30),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginVertical: verticalScale(16),
  },
  section: {
    gap: verticalScale(6),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(16),
  },
  seeAllText: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(16),
  },
  amenitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(8),
    marginTop: verticalScale(4),
  },
  amenityChip: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  amenityText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(14),
  },
  galleryImage: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(16),
    marginRight: scale(10),
  },
  detailText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(15),
    lineHeight: verticalScale(22),
  },
  linkText: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(15),
    marginBottom: verticalScale(2),
  },
  websiteLink: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(15),
    textDecorationLine: "underline",
  },
  partnerBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(12),
    padding: scale(16),
    marginTop: verticalScale(24),
    borderWidth: 1,
    gap: scale(12),
  },
  partnerBannerIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  partnerBannerContent: {
    flex: 1,
  },
  partnerBannerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: moderateScale(15),
    marginBottom: verticalScale(2),
  },
  partnerBannerSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: moderateScale(13),
  },
});
