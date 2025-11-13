import { Stack } from "expo-router";
import React from "react";
import useUserStore from "../hooks/use-userStore";

const RootLayout = () => {
  const { isGuest, user } = useUserStore();
  console.log("🚀 ~ RootNav ~ isGuest:", isGuest);
  console.log("🚀 ~ RootNav ~ user:", user);
  return (
    <Stack>
      <Stack.Protected guard={isGuest || !!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isGuest && !user}>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
