import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Colors } from "../../constants/theme";

const AuthLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/hostel/[id]"
        options={{
          title: "",
          headerShadowVisible: false,
          headerTransparent: true,
          headerShown: true,
          headerLeft: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="arrow-back" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/favourite"
        options={{
          headerShadowVisible: false,
          headerTransparent: true,
          headerShown: true,
          title: "Favorite",
          headerBackTitle: "Home",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          title: "",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerShown: true,
          headerBackTitle: "Profile",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
