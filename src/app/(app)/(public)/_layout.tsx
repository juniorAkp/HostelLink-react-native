import { Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
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
