import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { PowerSyncContext } from "@powersync/react-native";
import { db } from "../lib/powersync";
import { SupabaseConnector } from "../lib/supabase";

export default function RootLayout() {
  useEffect(() => {
    const connector = new SupabaseConnector();
    db.connect(connector);
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
