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
          title: "Favourites",
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
        name="(modal)/location"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
          title: "",
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          headerRight: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/filter"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.8],
          title: "",
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          sheetAllowedDetents: [0.5],
          title: "",
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/security"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.5],
          title: "",
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/reset-password"
        options={{
          sheetAllowedDetents: [0.5],
          title: "",
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <Pressable
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
