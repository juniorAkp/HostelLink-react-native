import MenuItem from "@/src/app/components/profile/MenuItem";
import MenuSection from "@/src/app/components/profile/MenuSection";
import { Colors, Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const { user, logout, deleteAccount, setIsGuest, isGuest } = useUserStore();
  const insets = useSafeAreaInsets();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userInitials =
    user?.username
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    user?.username?.[0]?.toUpperCase() ||
    "G";

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              logout();
              setIsGuest(false);
            } catch (error) {
              Alert.alert("Error", "Failed to sign out. Please try again.");
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              //TODO update user id to original user id
              await deleteAccount("1");
              setIsGuest(false);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 60 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={[styles.header]}>
          <Text style={styles.headerTitle}>Your Profile</Text>
        </View>
        {/* User Details Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            {user?.avatar_url ? (
              <Image
                source={{ uri: user.avatar_url }}
                style={styles.avatar}
                contentFit="cover"
                placeholderContentFit="cover"
                transition={200}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{userInitials}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              disabled={isGuest}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.username || "Guest"}</Text>
          <Text style={styles.userEmail}>
            {user?.email || "guest@gmail.com"}
          </Text>
          {!isGuest ? (
            <Link href="/edit-profile" asChild>
              <TouchableOpacity
                style={styles.editProfileButton}
                activeOpacity={0.7}
              >
                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </Link>
          ) : null}
        </View>

        {/* Account Management Section */}
        <MenuSection title="Account">
          <MenuItem
            disabled={isGuest}
            icon="mail"
            title="Email Verfication"
            subtitle="Verify your Email"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <Link href={"/security"} asChild>
            <MenuItem
              disabled={isGuest}
              icon="lock-closed-outline"
              title="Password & Security"
              subtitle="Change password, two-factor authentication"
              onPress={() => {}}
            />
          </Link>
          <View style={styles.separator} />
          <MenuItem
            disabled={isGuest}
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage notification preferences"
            onPress={() => {}}
          />
        </MenuSection>

        {/* App Section */}
        <MenuSection title="App">
          <MenuItem
            icon="document-text-outline"
            title="Privacy Policy"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="document-outline"
            title="Terms of Service"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => {}}
          />
        </MenuSection>

        {/* Logout Section */}
        <MenuSection>
          <MenuItem
            icon="log-out-outline"
            title="Sign Out"
            onPress={handleLogout}
            showChevron={false}
            danger={true}
            disabled={isLoggingOut}
          />
        </MenuSection>

        {/* Delete Account Section */}
        <MenuSection>
          <MenuItem
            icon="trash-outline"
            title="Delete Account"
            subtitle="Permanently delete your account and all data"
            onPress={handleDeleteAccount}
            showChevron={false}
            danger={true}
            disabled={isDeleting || isGuest}
          />
        </MenuSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    color: Colors.dark,
    fontFamily: Fonts.brandBlack,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
  },
  userSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    fontFamily: Fonts.brandBold,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.background,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 4,
    fontFamily: Fonts.brandBold,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  editProfileButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    fontFamily: Fonts.brandBold,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light,
    marginLeft: 60,
  },
});
export default Page;
