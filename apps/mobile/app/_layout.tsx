import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { PowerSyncContext } from "@powersync/react-native";
import { db } from "../lib/powersync";
// Demo mode: start disconnected — user taps Go Online to trigger first sync

export default function RootLayout() {
  useEffect(() => {
    // Don't auto-connect — demo mode starts offline.
    // Connection is triggered by the toggle button in the header.
    return () => {
      db.disconnect();
    };
  }, []);

  return (
    <PowerSyncContext.Provider value={db}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6366f1" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="story/[id]"
          options={{ title: "Story", headerBackTitle: "Library" }}
        />
      </Stack>
    </PowerSyncContext.Provider>
  );
}
