import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modal)" />
    </Stack>
  );
};

export default AuthLayout;
