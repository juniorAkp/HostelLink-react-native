import { Fonts } from "@/src/app/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            placement: "automatic",
            placeholder: "Search for hostels",
            onChangeText: () => {},
          },
          headerBackTitleStyle: {
            fontFamily: Fonts.brandBold,
          },
          navigationBarHidden: true,
        }}
      />
    </Stack>
  );
};

export default Layout;
