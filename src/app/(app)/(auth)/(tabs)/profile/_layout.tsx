import { Fonts } from "@/src/app/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: "Profile",
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
