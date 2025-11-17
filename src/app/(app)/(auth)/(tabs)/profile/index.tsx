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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
          { paddingBottom: insets.bottom + verticalScale(60) },
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

        {/* Hostel Management Section - Only for authenticated users */}
        {!isGuest && (
          <MenuSection title="Business">
            {user?.role === "admin" ? (
              <MenuItem
                icon="business-outline"
                title="My Hostels"
                subtitle="Manage your hostel listings"
                onPress={() => {
                  // TODO: Navigate to hostel dashboard
                  Alert.alert("Coming Soon", "Hostel management dashboard");
                }}
              />
            ) : (
              <MenuItem
                icon="ribbon-outline"
                title="Become a Hostel Partner"
                subtitle="Start earning by listing your hostel"
                onPress={() => {
                  // TODO: Navigate to partner onboarding
                  Alert.alert(
                    "Become a Partner",
                    "Upgrade to a hostel partner account to list and manage your hostels on HostelLink"
                  );
                }}
              />
            )}
          </MenuSection>
        )}

        {/* Account Management Section */}
        <MenuSection title="Account">
          <MenuItem
            disabled={isGuest}
            icon="mail"
            title="Email Verification"
            subtitle="Verify your Email"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <Link href={"/reset-password"} asChild>
            <MenuItem
              disabled={isGuest}
              icon="lock-closed-outline"
              title="Password"
              subtitle="Change your password at any time"
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
    paddingHorizontal: scale(6),
    paddingBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(34),
    color: Colors.dark,
    fontFamily: Fonts.brandBlack,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: verticalScale(20),
  },
  userSection: {
    alignItems: "center",
    paddingVertical: verticalScale(32),
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(8),
  },
  avatarContainer: {
    position: "relative",
    marginBottom: verticalScale(16),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: Colors.light,
  },
  avatarPlaceholder: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: moderateScale(36),
    fontWeight: "700",
    color: "#fff",
    fontFamily: Fonts.brandBold,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(3),
    borderColor: Colors.background,
  },
  userName: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: verticalScale(4),
    fontFamily: Fonts.brandBold,
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: Colors.muted,
    marginBottom: verticalScale(16),
  },
  editProfileButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  editProfileButtonText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: Colors.primary,
    fontFamily: Fonts.brandBold,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light,
    marginLeft: scale(60),
  },
});
export default Page;
