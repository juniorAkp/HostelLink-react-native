import { Stack } from "expo-router";
import React from "react";

const SecurityLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="update-password" options={{ headerShown: true }} />
      <Stack.Screen
        name="reset-password"
        options={{
          headerBackTitle: "Onboarding",
          headerBackButtonDisplayMode: "minimal",
          title: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default SecurityLayout;
