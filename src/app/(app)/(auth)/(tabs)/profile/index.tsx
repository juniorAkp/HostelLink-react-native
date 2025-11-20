import MenuItem from "@/src/app/components/profile/MenuItem";
import MenuSection from "@/src/app/components/profile/MenuSection";
import { Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import { useTheme } from "@/src/app/hooks/useTheme";
import { transactionService } from "@/src/app/services/transactionService";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Page = () => {
  const { colors, isDark } = useTheme();
  const { user, logout, deleteAccount, setIsGuest, isGuest, upgradeProfile } =
    useUserStore();
  const insets = useSafeAreaInsets();
  const { popup } = usePaystack();
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
      { cancelable: true, userInterfaceStyle: isDark ? "dark" : "light" }
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
      { cancelable: true, userInterfaceStyle: isDark ? "dark" : "light" }
    );
  };

  const handlePayment = async () => {
    if (!user?.email || !user?.id) {
      Alert.alert("Error", "User details not found. Please log in again.");
      return;
    }
    const amount = Number(process.env.EXPO_PUBLIC_AMOUNT || 0);

    popup.checkout({
      email: user.email,
      amount: amount,
      reference: `HL_TXN_${Date.now()}`,
      onError(res) {
        Alert.alert("Payment Error", "Something went wrong. Please try again.");
        console.log("Paystack Error:", res);
      },
      async onSuccess(res) {
        console.log("Paystack Success:", res);

        try {
          await transactionService.createTransaction({
            user_id: user.id,
            amount: amount,
            status: "success",
            reference: res.reference,
          });

          await upgradeProfile(user.id);

          Alert.alert(
            "Payment Confirmed",
            "Payment confirmed! You are now a Partner."
          );
        } catch (error) {
          console.error("Post-payment error:", error);
          Alert.alert(
            "Action Required",
            "Payment was successful, but we couldn't update your profile automatically. Please contact support."
          );
        }
      },
      onCancel() {
        Alert.alert("Payment Cancelled", "You cancelled the payment.");
      },
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Your Profile
          </Text>
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
              <View
                style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.avatarText}>{userInitials}</Text>
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.editAvatarButton,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.background,
                },
              ]}
              disabled={isGuest}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.username || "Guest"}
          </Text>
          <Text style={[styles.userEmail, { color: colors.muted }]}>
            {user?.email || "guest@gmail.com"}
          </Text>
          {!isGuest ? (
            <Link href="/edit-profile" asChild>
              <TouchableOpacity
                style={[
                  styles.editProfileButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.editProfileButtonText,
                    { color: colors.primary },
                  ]}
                >
                  Edit Profile
                </Text>
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
                onPress={() => router.push("/dashboard")}
              />
            ) : (
              <MenuItem
                icon="ribbon-outline"
                title="Become a Hostel Partner"
                subtitle="Start earning by listing your hostel"
                onPress={() => {
                  Alert.alert(
                    "Become a Partner",
                    "Upgrade to a Partner account to list and manage your hostels. This requires a one-time payment.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Pay now",
                        onPress: () => handlePayment(),
                        style: "default",
                      },
                    ],
                    {
                      cancelable: true,
                      userInterfaceStyle: isDark ? "dark" : "light",
                    }
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
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <Link href={"/reset-password"} asChild>
            <MenuItem
              disabled={isGuest}
              icon="lock-closed-outline"
              title="Password"
              subtitle="Change your password at any time"
              onPress={() => {}}
            />
          </Link>
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
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
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <MenuItem
            icon="document-outline"
            title="Terms of Service"
            onPress={() => {}}
          />
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => {}}
          />
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
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
    paddingHorizontal: scale(6),
    paddingBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(34),
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
  },
  avatarPlaceholder: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(3),
  },
  userName: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    marginBottom: verticalScale(4),
    fontFamily: Fonts.brandBold,
  },
  userEmail: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(16),
  },
  editProfileButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    borderWidth: 1,
  },
  editProfileButtonText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    fontFamily: Fonts.brandBold,
  },
  separator: {
    height: 1,
    marginLeft: scale(60),
  },
});
export default Page;
