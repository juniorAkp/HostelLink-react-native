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
  const { user, logout, deleteAccount, setIsGuest } = useUserStore();
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
    user?.email?.[0]?.toUpperCase() ||
    "U";

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

  const MenuSection = ({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.menuContainer}>{children}</View>
    </View>
  );

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
    danger = false,
    disabled = false,
  }: {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
    danger?: boolean;
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.menuItem, disabled && styles.menuItemDisabled]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        {icon && (
          <View
            style={[styles.menuItemIcon, danger && styles.menuItemIconDanger]}
          >
            <Ionicons
              name={icon}
              size={20}
              color={danger ? "#FF3B30" : Colors.muted}
            />
          </View>
        )}
        <View style={styles.menuItemTextContainer}>
          <Text
            style={[styles.menuItemTitle, danger && styles.menuItemTitleDanger]}
          >
            {title}
          </Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && onPress && (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={styles.headerTitle}>Profile</Text>
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
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.username || "User"}</Text>
          <Text style={styles.userEmail}>{user?.email || ""}</Text>
          <Link href="/edit-profile" asChild>
            <TouchableOpacity
              style={styles.editProfileButton}
              activeOpacity={0.7}
            >
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Account Management Section */}
        <MenuSection title="Account">
          <MenuItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Name, email, phone number"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <MenuItem
            icon="lock-closed-outline"
            title="Password & Security"
            subtitle="Change password, two-factor authentication"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <MenuItem
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
            disabled={isDeleting}
          />
        </MenuSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.dark,
    fontFamily: Fonts.brandBold,
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
    fontFamily: Fonts.brandBold,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuItemIconDanger: {
    backgroundColor: "#FFE5E5",
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 2,
    fontFamily: Fonts.brandBold,
  },
  menuItemTitleDanger: {
    color: "#FF3B30",
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light,
    marginLeft: 60,
  },
});

export default Page;
