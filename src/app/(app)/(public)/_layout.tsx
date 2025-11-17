import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../../hooks/useTheme";

const PublicLayout = () => {
  const { colors } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="other-options"
        options={{
          headerShown: true,
          headerBackTitle: "Onboarding",
          headerBackButtonDisplayMode: "minimal",
          title: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
