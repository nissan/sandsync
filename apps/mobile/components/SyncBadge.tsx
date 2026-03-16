import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { usePowerSyncStatus } from "@powersync/react-native";

export function SyncBadge() {
  const status = usePowerSyncStatus();
  const isConnected = status.connected;

  return (
    <View style={[styles.badge, isConnected ? styles.live : styles.offline]}>
      <Text style={styles.dot}>{isConnected ? "●" : "●"}</Text>
      <Text style={[styles.text, isConnected ? styles.liveText : styles.offlineText]}>
        {isConnected ? "Live" : "Offline"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  live: {
    backgroundColor: "#dcfce7",
  },
  offline: {
    backgroundColor: "#fee2e2",
  },
  dot: {
    fontSize: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  liveText: {
    color: "#16a34a",
  },
  offlineText: {
    color: "#dc2626",
  },
});
