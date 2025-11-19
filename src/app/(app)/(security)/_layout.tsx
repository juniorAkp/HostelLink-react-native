import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Colors } from "../../constants/theme";

const SecurityLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="update-password"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.background,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="arrow-back" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerBackTitle: "Onboarding",
          headerBackButtonDisplayMode: "minimal",
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.background,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="arrow-back" size={28} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default SecurityLayout;
