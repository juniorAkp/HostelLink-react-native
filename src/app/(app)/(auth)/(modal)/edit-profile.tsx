import AuthButton from "@/src/app/components/auth/AuthButton";
import { Colors, Fonts } from "@/src/app/constants/theme";
import useUserStore from "@/src/app/hooks/use-userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Page = () => {
  const { user } = useUserStore();
  ("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setPhone(user.phone_number ?? "");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={"black"}
          value={username}
          onChangeText={(e) => setUsername(e)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor={"black"}
          onChangeText={setPhone}
          value={phone}
          style={styles.textInput}
        />
        <AuthButton
          title="Update Profile"
          onPress={() => {}}
          color="#fff"
          icon="bulb"
          buttonColor="#4285F4"
          style={{ marginTop: 25 }}
        />
      </View>
    </View>
  );
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
