import { Colors, Fonts } from "@/src/app/constants/theme";
import { useSearchStore } from "@/src/app/hooks/use-useSearchStore";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { setSearchQuery, addSearch } = useSearchStore();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: {
            backgroundColor: Colors.background,
          },
          title: "Search",
          headerSearchBarOptions: {
            autoFocus: true,
            hideWhenScrolling: true,
            placement: "automatic",
            placeholder: "Search for hostels",
            onChangeText: (value) => {
              const text =
                typeof value === "string"
                  ? value
                  : value?.nativeEvent?.text ?? "";

              setSearchQuery(text);
            },
            onSearchButtonPress: (value) => {
              const text =
                typeof value === "string"
                  ? value
                  : value?.nativeEvent?.text ?? "";
              addSearch(text);
              setSearchQuery(text);
            },
            onCancelButtonPress: () => {
              setSearchQuery("");
            },
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
