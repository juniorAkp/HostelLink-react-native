import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AuthButton from "../../components/auth/AuthButton";
import { Colors, Fonts } from "../../constants/theme";
import useUserStore from "../../hooks/use-userStore";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoginState, setIsLoginState] = useState(true);

  const router = useRouter();
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

  const commonInputs = (
    <>
      {!isLoginState && (
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.textInput}
        />
      )}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeBtn} onPress={() => router.dismiss()}>
        <Ionicons name="close" size={28} color="#000" />
      </Pressable>

      <Text style={styles.title}>
        {isLoginState ? "Welcome Back!" : "Create An Account!"}
      </Text>

      <View style={styles.buttonContainer}>
        {commonInputs}

        {zodErrors &&
          zodErrors.map((err, i) => (
            <Text key={i} style={{ color: "red", fontSize: 14 }}>
              {err}
            </Text>
          ))}

        <AuthButton
          isLoading={isLoading}
          isDisabled={isDisabled}
          title={isLoginState ? "Login" : "Register"}
          onPress={isLoginState ? handleLogin : handleRegister}
          color="#fff"
          icon="log-in-outline"
          buttonColor={isDisabled ? Colors.muted : "#4285F4"}
          style={{ marginTop: 25 }}
        />

        <Text style={{ textAlign: "center", marginTop: 30 }}>
          {isLoginState
            ? "Don't have an account? "
            : "Already have an account? "}
          <Text style={styles.privacyLink} onPress={toggleMode}>
            {isLoginState ? "Create Account" : "Login"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Page;

// styles unchanged (you can keep yours)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: Colors.light,
    borderRadius: 30,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.brandBlack,
    marginVertical: 30,
    textAlign: "center",
  },
  buttonContainer: { gap: 14, width: "100%" },
  textInput: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
  },
  privacyLink: { color: "#4285F4", textDecorationLine: "underline" },
});
