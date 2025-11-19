import RegularButton from "@/src/app/components/common/RegularButtont";
import { Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import { useTheme } from "@/src/app/hooks/useTheme";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const Page = () => {
  const { colors } = useTheme();
  const {
    user,
    updateProfile,
    zodErrors,
    errorMessage,
    clearError,
    isLoading,
  } = useUserStore();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setPhone(user.phone_number ?? "Add phone number");
    }
  }, [user]);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert("Error", errorMessage, [{ text: "OK", onPress: clearError }]);
    }
  }, [errorMessage, clearError]);

  const hasChanges =
    username.trim() !== (user?.username ?? "") ||
    phone.trim() !== (user?.phone_number ?? "");

  const handleProfileUpdate = async () => {
    if (!user) return;
    await updateProfile(user.id, username.trim(), phone.trim());
    clearError();
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Update Profile</Text>

      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={colors.muted}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={[
            styles.textInput,
            { backgroundColor: colors.light, color: colors.text },
          ]}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={colors.muted}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={[
            styles.textInput,
            { backgroundColor: colors.light, color: colors.text },
          ]}
        />

        {/* Zod Validation Errors */}
        {zodErrors && (
          <View style={{ marginTop: verticalScale(8) }}>
            {zodErrors.map((err, i) => (
              <Text key={i} style={[styles.errorText, { color: colors.error }]}>
                {err}
              </Text>
            ))}
          </View>
        )}

        <RegularButton
          title="Update Profile"
          isDisabled={!hasChanges || isLoading}
          isLoading={isLoading}
          onPress={handleProfileUpdate}
          color={colors.background}
          buttonColor={colors.primary}
          style={{ marginTop: verticalScale(25) }}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.brandBlack,
    marginVertical: verticalScale(22),
  },
  buttonContainer: {
    gap: verticalScale(12),
    width: "100%",
  },
  textInput: {
    borderRadius: scale(15),
    padding: scale(18),
    fontSize: moderateScale(16),
  },
  errorText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.brand,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    gap: verticalScale(16),
    padding: scale(16),
  },
});
