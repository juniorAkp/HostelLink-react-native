import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Colors } from "../../constants/theme";

const SecurityLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="/reset-password"
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
    </Stack>
  );
};

export default SecurityLayout;
