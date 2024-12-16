import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f4f4f4" },
        headerTintColor: "#333",
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#666",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Video Diary",
          tabBarLabel: "Videos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="crop"
        options={{
          title: "Crop Video",
          tabBarLabel: "Crop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
