import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@powersync/react-native";
import { SyncBadge } from "../components/SyncBadge";
import { StoryCard } from "../components/StoryCard";
import type { Story } from "../lib/powersync";

const API_BASE = "https://sandsync-api.fly.dev";

export default function LibraryScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Live query — updates automatically when PowerSync syncs new data
  const { data: stories } = useQuery<Story>(
    "SELECT * FROM stories ORDER BY created_at DESC"
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Ping API to trigger any pending syncs
      await fetch(`${API_BASE}/health`).catch(() => {});
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 SandSync</Text>
        <SyncBadge />
      </View>

      {/* Story list */}
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoryCard story={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🌙</Text>
            <Text style={styles.emptyTitle}>No stories yet</Text>
            <Text style={styles.emptySubtitle}>
              Stories will appear here when generated on the web
            </Text>
            <Text style={styles.emptyHint}>
              They sync automatically — no refresh needed!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6366f1",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    fontStyle: "italic",
  },
});
