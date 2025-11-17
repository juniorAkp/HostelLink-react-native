import { useTheme as useNavigationTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import useUserStore from "../hooks/use-userStore";

const RootLayout = () => {
  const { isGuest, user } = useUserStore();
  const { colors } = useNavigationTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Protected guard={isGuest || !!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isGuest && !user}>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="(security)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
