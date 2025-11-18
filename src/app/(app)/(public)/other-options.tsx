import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import RegularButton from "../../components/common/RegularButtont";
import { Fonts } from "../../constants/theme";
import useUserStore from "../../hooks/use-userStore";
import { useTheme } from "../../hooks/useTheme";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoginState, setIsLoginState] = useState(true);

  const router = useRouter();
  const { colors } = useTheme();
  const { isLoading, errorMessage, clearError, login, register, zodErrors } =
    useUserStore();

  useEffect(() => {
    if (errorMessage) {
      Alert.alert("Error", errorMessage, [{ text: "OK", onPress: clearError }]);
    }
  }, [errorMessage, zodErrors, clearError]);

  useEffect(() => {
    if (isLoginState) {
      setIsDisabled(!email || !password);
    } else {
      setIsDisabled(!email || !password || !username);
    }
  }, [email, password, username, isLoginState]);

  const handleLogin = async () => {
    await login(email.trim(), password);
  };

  const handleRegister = async () => {
    await register(email.trim(), username.trim(), password);
  };

  const toggleMode = () => {
    clearError();
    setIsLoginState((v) => !v);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const insets = useSafeAreaInsets();
  const commonInputs = (
    <>
      {!isLoginState && (
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
      )}
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.muted}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.textInput,
          { backgroundColor: colors.light, color: colors.text },
        ]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[
          styles.textInput,
          { backgroundColor: colors.light, color: colors.text },
        ]}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {isLoginState ? "Welcome Back!" : "Create An Account!"}
        </Text>

        <View style={styles.buttonContainer}>
          {commonInputs}

          {zodErrors &&
            zodErrors.map((err, i) => (
              <Text
                key={i}
                style={{ color: colors.error, fontSize: moderateScale(14) }}
              >
                {err}
              </Text>
            ))}

          <RegularButton
            isLoading={isLoading}
            isDisabled={isDisabled}
            title={isLoginState ? "Login" : "Register"}
            onPress={isLoginState ? handleLogin : handleRegister}
            color={colors.background}
            buttonColor={isDisabled ? colors.muted : colors.primary}
            style={{ marginTop: verticalScale(25) }}
          />

          <Text
            style={{
              textAlign: "center",
              marginTop: verticalScale(30),
              color: colors.text,
            }}
          >
            {isLoginState
              ? "Don't have an account? "
              : "Already have an account? "}
            <Text
              style={[styles.privacyLink, { color: colors.primary }]}
              onPress={toggleMode}
            >
              {isLoginState ? "Create Account" : "Login"}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: scale(20) },
  closeBtn: {
    alignSelf: "flex-end",
    borderRadius: scale(30),
    padding: scale(8),
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.brandBlack,
    marginVertical: verticalScale(30),
    textAlign: "center",
  },
  buttonContainer: { gap: verticalScale(14), width: "100%" },
  textInput: {
    borderRadius: scale(15),
    padding: scale(18),
    fontSize: moderateScale(16),
  },
  privacyLink: { textDecorationLine: "underline" },
  keyboardContainer: {
    gap: verticalScale(16),
    padding: scale(16),
  },
});
