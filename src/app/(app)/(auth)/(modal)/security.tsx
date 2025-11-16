import { Colors, Fonts } from "@/src/app/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SecurityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Security</Text>
      </View>

      <View style={styles.actions}>
        <Link href="/reset-password" asChild>
          <Pressable style={styles.actionButton}>
            <MaterialCommunityIcons
              name="lock-reset"
              size={24}
              color={Colors.primary}
            />

            <Text style={styles.buttonText}>Update Password</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors.muted}
            />
          </Pressable>
        </Link>

        <Pressable style={styles.actionButton}>
          <MaterialCommunityIcons
            name="shield-check"
            size={24}
            color={Colors.muted}
          />
          <Text style={styles.buttonText}>Enable 2FA</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={Colors.muted}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 28,
    color: Colors.primary,
  },
  actions: {
    paddingHorizontal: 20,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light,
    padding: 18,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  buttonText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: Fonts.brand,
    fontSize: 17,
    color: Colors.primary,
  },
});
