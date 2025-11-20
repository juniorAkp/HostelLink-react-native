import RegularButton from "@/src/app/components/common/RegularButtont";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Fonts } from "../../../constants/theme";
import { useCreateHostelStore } from "../../../hooks/useCreateHostelStore";
import { useTheme } from "../../../hooks/useTheme";

const AMENITIES_LIST = [
  "Wifi",
  "Pool",
  "AC",
  "Kitchen",
  "Parking",
  "Bar",
  "Gym",
  "Laundry",
  "Security",
];

const HOSTEL_TYPES = ["Hostel", "Hotel", "Apartment", "Guesthouse", "Campsite"];

export default function CreateHostel() {
  const { colors } = useTheme();
  const router = useRouter();
  const { form, setForm, resetForm } = useCreateHostelStore();

  const toggleAmenity = (amenity: string) => {
    const newAmenities = form.amenities.includes(amenity)
      ? form.amenities.filter((a) => a !== amenity)
      : [...form.amenities, amenity];
    setForm({ amenities: newAmenities });
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setForm({ images: [...form.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...form.images];
    newImages.splice(index, 1);
    setForm({ images: newImages });
  };

  const handleCreate = () => {
    if (!form.name || !form.address || !form.description || !form.location) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all required fields, including location."
      );
      return;
    }
    // Submit logic here
    console.log("Creating hostel:", form);
    resetForm();
    router.back();
  };

  const renderInput = (
    label: string,
    value: string,
    key: keyof typeof form,
    placeholder: string,
    multiline = false,
    keyboardType: "default" | "email-address" | "phone-pad" | "url" = "default"
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
            height: multiline ? verticalScale(100) : verticalScale(45),
            textAlignVertical: multiline ? "top" : "center",
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value as string}
        onChangeText={(text) => setForm({ [key]: text })}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Basic Info
            </Text>
            {renderInput(
              "Hostel Name",
              form.name,
              "name",
              "e.g. Sunny Backpackers"
            )}

            <Text style={[styles.label, { color: colors.text }]}>Type</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.typeScroll}
              contentContainerStyle={styles.typeContainer}
            >
              {HOSTEL_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeChip,
                    {
                      backgroundColor:
                        form.type === type ? colors.primary : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setForm({ type })}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color: form.type === type ? "#fff" : colors.text,
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {renderInput("Country", form.country, "country", "e.g. Spain")}
            {renderInput(
              "Address",
              form.address,
              "address",
              "Full street address"
            )}

            {/* Location Picker */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Location
              </Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    justifyContent: "center",
                  },
                ]}
                onPress={() => router.push("/(modal)/select-location")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: form.location ? colors.text : colors.muted,
                      fontFamily: Fonts.brand,
                      fontSize: moderateScale(14),
                    }}
                  >
                    {form.location
                      ? `${form.location.lat.toFixed(
                          4
                        )}, ${form.location.lng.toFixed(4)}`
                      : "Tap to select on map"}
                  </Text>
                  <Ionicons
                    name="map-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: verticalScale(20) },
              ]}
            >
              Details
            </Text>
            {renderInput(
              "Description",
              form.description,
              "description",
              "Tell us about your place...",
              true
            )}
            {renderInput(
              "Website",
              form.website,
              "website",
              "https://...",
              false,
              "url"
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: verticalScale(20) },
              ]}
            >
              Contact
            </Text>
            {renderInput(
              "Email",
              form.email,
              "email",
              "contact@hostel.com",
              false,
              "email-address"
            )}
            {renderInput(
              "Phone",
              form.phone,
              "phone",
              "+1 234 567 890",
              false,
              "phone-pad"
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(500)}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: verticalScale(20) },
              ]}
            >
              Amenities
            </Text>
            <View style={styles.amenitiesContainer}>
              {AMENITIES_LIST.map((amenity) => {
                const isSelected = form.amenities.includes(amenity);
                return (
                  <TouchableOpacity
                    key={amenity}
                    style={[
                      styles.amenityChip,
                      {
                        backgroundColor: isSelected
                          ? colors.primary + "20" // 20% opacity
                          : colors.card,
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                    onPress={() => toggleAmenity(amenity)}
                  >
                    <Ionicons
                      name={
                        isSelected ? "checkmark-circle" : "add-circle-outline"
                      }
                      size={16}
                      color={isSelected ? colors.primary : colors.muted}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.amenityText,
                        {
                          color: isSelected ? colors.primary : colors.muted,
                          fontFamily: isSelected
                            ? Fonts.brandBold
                            : Fonts.brand,
                        },
                      ]}
                    >
                      {amenity}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(500)}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: verticalScale(20) },
              ]}
            >
              Photos
            </Text>
            <TouchableOpacity
              style={[
                styles.imageUpload,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                },
              ]}
              onPress={pickImages}
            >
              <Ionicons name="images-outline" size={32} color={colors.muted} />
              <Text style={[styles.uploadText, { color: colors.muted }]}>
                Tap to upload images
              </Text>
            </TouchableOpacity>
            <View style={styles.selectedImagesContainer}>
              {form.images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image
                    source={{ uri: image }}
                    style={[styles.selectedImage, { borderRadius: 12 }]}
                    contentFit="cover"
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={16}
                      color={colors.background}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Animated.View>

          <View style={{ height: verticalScale(100) }} />
        </ScrollView>

        <Animated.View
          entering={FadeInUp.delay(600).duration(500)}
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          {/* <TouchableOpacity onPress={handleCreate} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primary, "#4facfe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Create Hostel</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity> */}
          <RegularButton
            title="Create Hostel"
            isDisabled={false}
            onPress={handleCreate}
            color={colors.background}
            buttonColor={colors.primary}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.brandBold,
    marginBottom: verticalScale(15),
  },
  inputGroup: {
    marginBottom: verticalScale(15),
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.brandBold,
    marginBottom: verticalScale(8),
  },
  input: {
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    fontSize: moderateScale(14),
    fontFamily: Fonts.brand,
  },
  typeScroll: {
    marginBottom: verticalScale(15),
  },
  typeContainer: {
    gap: scale(10),
  },
  typeChip: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    borderWidth: 1,
  },
  typeText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.brandBold,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(12),
    borderWidth: 1,
  },
  amenityText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.brand,
  },
  imageUpload: {
    height: verticalScale(120),
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
  uploadText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(14),
    fontFamily: Fonts.brand,
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  imageWrapper: {
    position: "relative",
    width: scale(100),
    height: scale(100),
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 12,
  },
  footer: {
    padding: moderateScale(20),
    borderTopWidth: 1,
  },
});
