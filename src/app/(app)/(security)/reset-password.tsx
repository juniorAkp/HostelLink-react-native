import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import RegularButton from "../../components/common/RegularButtont";
import { Fonts } from "../../constants/theme";
import useUserStore from "../../hooks/use-userStore";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";

const ResetPasswordScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useUserStore();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "hostellink://update-password",
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + verticalScale(20),
            paddingTop: insets.top + verticalScale(20),
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Enter your email to receive instructions on how to reset your
            password.
          </Text>
        </View>

        {sent ? (
          <View style={styles.successContainer}>
            <Ionicons
              name="checkmark-circle"
              size={moderateScale(60)}
              color="green"
            />
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Check Your Email
            </Text>
            <Text style={[styles.successSubtitle, { color: colors.muted }]}>
              We've sent a password reset link to{" "}
              <Text style={{ fontFamily: Fonts.brandBold }}>{email}</Text>.
            </Text>
            <RegularButton
              title="Back to Login"
              onPress={() => router.replace("/other-options")}
              color={colors.background}
              buttonColor={colors.primary}
              style={{ marginTop: verticalScale(30) }}
            />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={[
                styles.textInput,
                { backgroundColor: colors.light, color: colors.text },
              ]}
              editable={!user}
            />

            <RegularButton
              isLoading={loading}
              isDisabled={!email}
              title="Send Reset Link"
              onPress={handlePasswordReset}
              color={colors.background}
              buttonColor={!email ? colors.muted : colors.primary}
              style={{ marginTop: verticalScale(25) }}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.brandBlack,
    textAlign: "center",
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.brand,
    textAlign: "center",
    marginTop: verticalScale(10),
    lineHeight: moderateScale(22),
  },
  formContainer: {
    gap: verticalScale(14),
    width: "100%",
  },
  textInput: {
    borderRadius: scale(15),
    padding: scale(18),
    fontSize: moderateScale(16),
    fontFamily: Fonts.brand,
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(10),
  },
  successTitle: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.brandBold,
    marginTop: verticalScale(20),
  },
  successSubtitle: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.brand,
    textAlign: "center",
    marginTop: verticalScale(10),
    lineHeight: moderateScale(22),
  },
});
