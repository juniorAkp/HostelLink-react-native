import useUserStore from "@/src/app/hooks/use-userStore";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

const Profile = () => {
  const { setIsGuest } = useUserStore();

  const onLogout = () => {
    setIsGuest(false);
  };
  return (
    <View style={styles.container}>
      {/* <Text>Profile</Text> */}
      <Button title="logout" onPress={onLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
