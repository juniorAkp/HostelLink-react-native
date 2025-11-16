import AuthButton from "@/src/app/components/auth/AuthButton";
import { Colors, Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
const Page = () => {
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

  // Sync form with user data
  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setPhone(user.phone_number ?? "Add phone number");
    }
  }, [user]);

  // Show server/validation errors
  useEffect(() => {
    if (errorMessage) {
      Alert.alert("Error", errorMessage, [{ text: "OK", onPress: clearError }]);
    }
  }, [errorMessage, clearError]);

  // Realtime button disable logic
  const hasChanges =
    username.trim() !== (user?.username ?? "") ||
    phone.trim() !== (user?.phone_number ?? "");

  const handleProfileUpdate = async () => {
    if (!user) return;
    await updateProfile(user.id, username.trim(), phone.trim());
    clearError();
  };

  // Loading or no user
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.textInput}
        />

        {/* Zod Validation Errors */}
        {zodErrors && (
          <View style={{ marginTop: 8 }}>
            {zodErrors.map((err, i) => (
              <Text key={i} style={styles.errorText}>
                {err}
              </Text>
            ))}
          </View>
        )}

        <AuthButton
          title="Update Profile"
          isDisabled={!hasChanges || isLoading}
          isLoading={isLoading}
          onPress={handleProfileUpdate}
          color="#fff"
          icon="save-outline"
          buttonColor="#4285F4"
          style={{ marginTop: 25 }}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.brandBlack,
    marginVertical: 22,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  textInput: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: Fonts.brand,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    gap: 16,
    padding: 16,
  },
});
