import { Stack } from "expo-router";
import React from "react";
import useUserStore from "../hooks/use-userStore";

const RootLayout = () => {
  const { isGuest, user } = useUserStore();
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "dark",
      }}
    >
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
