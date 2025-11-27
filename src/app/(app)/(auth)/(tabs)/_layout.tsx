import { useTheme } from "@/src/app/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform } from "react-native";
const TabLayout = () => {
  const { colors } = useTheme();
  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarLabel: "",
    //     tabBarLabelStyle: {
    //       fontSize: moderateScale(12),
    //       fontWeight: "600",
    //     },
    //     tabBarIconStyle: {
    //       height: scale(15),
    //       width: scale(15),
    //     },
    //   }}
    // >
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       title: "Home",
    //       headerShown: false,
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialIcons name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: "Explore",
    //       tabBarIcon: ({ color, size, focused }) => (
    //         <Ionicons
    //           name={focused ? "compass" : "compass-outline"}
    //           color={color}
    //           size={size}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="search"
    //     options={{
    //       title: "Search",
    //       tabBarIcon: ({ color, size, focused }) => (
    //         <FontAwesome5
    //           name={focused ? "search-location" : "search"}
    //           color={color}
    //           size={size}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       headerShown: false,
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name={"person"} color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tabs>

    <NativeTabs
      labelVisibilityMode="labeled"
      indicatorColor={colors.primaryLight}
      iconColor={colors.primary}
      minimizeBehavior="onScrollDown"
      backgroundColor={colors.background}
      blurEffect="dark"
    >
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf="house" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
        {Platform.select({
          ios: <Icon sf="map" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="explore" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        {Platform.select({
          ios: <Icon sf="magnifyingglass" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="search" />} />
          ),
        })}
        <Label>Search</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        {Platform.select({
          ios: <Icon sf="person" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="person" />} />
          ),
        })}
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;
