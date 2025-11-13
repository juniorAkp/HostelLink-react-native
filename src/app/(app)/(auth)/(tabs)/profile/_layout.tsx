import { Fonts } from "@/src/app/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const Layout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: Platform.OS === "ios" ? true : false,
          headerTitle: "Profile",
          headerShown: Platform.OS === "ios" ? true : false,
          headerTransparent: true,
          headerLargeTitleStyle: {
            fontFamily: Fonts.brandBold,
            fontWeight: "900",
            color: "#000",
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
