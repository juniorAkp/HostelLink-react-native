import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AuthButton from "../../components/auth/AuthButton";
import { Colors, Fonts } from "../../constants/theme";
import useUserStore from "../../hooks/use-userStore";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoginState, setIsLoginState] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, register } = useUserStore();
  const router = useRouter();

  const handleState = () => {
    setIsLoginState(!isLoginState);
  };

  const handleLogin = () => {
    try {
      setIsLoading(true);
      login(email, password);
    } catch (error) {
      Alert.alert("Error Logging In User", error as string);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = () => {
    try {
      setIsLoading(true);
      register(email, username, password);
    } catch (error) {
      Alert.alert("Error Logging In User", error as string);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoginState) {
    return (
      <View style={styles.container}>
        <Pressable style={styles.closeBtn} onPress={() => router.dismiss()}>
          <Ionicons name="close" size={24} />
        </Pressable>
        <Text style={styles.title}>Create An Account!</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={"black"}
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            keyboardType={"email-address"}
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"black"}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.textInput}
          />
          <AuthButton
            isLoading={isLoading}
            title="Register"
            onPress={handleRegister}
            color="#fff"
            icon="bulb"
            buttonColor="#4285F4"
            style={{ marginTop: 25 }}
          />
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Have an account?{" "}
            <Text style={styles.privacyLink} onPress={handleState}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Pressable style={styles.closeBtn} onPress={() => router.dismiss()}>
          <Ionicons name="close" size={24} />
        </Pressable>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.buttonContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            keyboardType={"email-address"}
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"black"}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.textInput}
          />
          <AuthButton
            isLoading={isLoading}
            title="Login"
            onPress={handleLogin}
            color="#fff"
            icon="bulb"
            buttonColor="#4285F4"
            style={{ marginTop: 25 }}
          />
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            Don't have an account?{" "}
            <Text style={styles.privacyLink} onPress={handleState}>
              Create Account
            </Text>
          </Text>
        </View>
      </View>
    );
  }
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  closeBtn: {
    backgroundColor: Colors.light,
    borderRadius: 40,
    padding: 8,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.brandBlack,
    marginVertical: 22,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  textInput: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    padding: 20,
  },
  privacyLink: {
    color: "#4285F4",
    textDecorationLine: "underline",
  },
});
