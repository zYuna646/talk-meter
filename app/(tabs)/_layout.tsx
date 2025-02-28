import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        tabBarInactiveTintColor: color.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 90,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: color.background,
            paddingBottom: 20,
          },
          default: {
            backgroundColor: color.background,
            height: 90,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingBottom: 20,
          },
        }),
        tabBarItemStyle: {
          alignSelf: "center",
          flex: 1,
          marginTop: "10%",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",

          tabBarIcon: ({ color: active, focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? color.tabIconDefault
                  : color.background,
                borderRadius: 10,
                width: 80,
                height: 60,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                size={28}
                name="book-open-variant"
                color={focused ? color.tabIconSelected : color.tabIconDefault}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ color: active, focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? color.tabIconDefault
                  : color.background,
                borderRadius: 10,
                width: 80,
                height: 60,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                size={28}
                name="view-dashboard-outline"
                color={focused ? color.tabIconSelected : color.tabIconDefault}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color: active, focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? color.tabIconDefault
                  : color.background,
                borderRadius: 10,
                width: 80,
                height: 60,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5
                size={28}
                name="user-circle"
                color={focused ? color.tabIconSelected : color.tabIconDefault}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
