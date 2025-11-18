import { useSearchStore } from "@/src/app/hooks/use-useSearchStore";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { setSearchQuery, addSearch } = useSearchStore();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
