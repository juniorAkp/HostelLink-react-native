import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
// import {
//   Icon,
//   Label,
//   NativeTabs,
//   VectorIcon,
// } from "expo-router/unstable-native-tabs";
import React from "react";
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name={focused ? "search-location" : "search"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"person"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
