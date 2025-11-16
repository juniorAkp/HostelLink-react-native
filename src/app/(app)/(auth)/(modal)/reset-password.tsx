import { Colors, Fonts } from "@/src/app/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "../../../hooks/use-userStore";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { updatePassword, isLoading, errorMessage: error } = useUserStore();

  const resetPassword = async () => {
    updatePassword(password);
    alert("Password updated successfully!");
    router.dismissAll();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
      </View>
      <Text style={styles.label}>New Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={Colors.muted}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Confirm new password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={Colors.muted}
      />

      <Pressable
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={resetPassword}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Updating..." : "Update Password"}
        </Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },

  header: {
    paddingBottom: 30,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 28,
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: Colors.muted,
    marginTop: 4,
  },

  card: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.light,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  label: {
    alignSelf: "flex-start",
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 6,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 12,
    padding: 14,
    fontFamily: Fonts.brand,
    color: Colors.primary,
    marginBottom: 16,
  },

  button: {
    width: "100%",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },

  buttonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: "white",
  },

  error: {
    marginTop: 10,
    color: "red",
    fontFamily: Fonts.brand,
  },
});
