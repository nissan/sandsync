import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, usePowerSyncStatus } from "@powersync/react-native";
import { StoryCard } from "../components/StoryCard";
import { isDemoOnline, setDemoOnline, subscribeDemoMode } from "../lib/demoMode";
import type { Story } from "../lib/powersync";

export default function LibraryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(isDemoOnline());
  const [syncing, setSyncing] = useState(false);
  const status = usePowerSyncStatus();

  // Subscribe to demo mode changes
  useEffect(() => {
    return subscribeDemoMode((online) => setIsOnline(online));
  }, []);

  // Watch for sync completing after going online
  useEffect(() => {
    if (status.connected) {
      setSyncing(false);
    }
  }, [status.connected]);

  const handleToggle = useCallback(async () => {
    if (!isOnline) {
      setSyncing(true);
      await setDemoOnline(true);
    } else {
      await setDemoOnline(false);
    }
  }, [isOnline]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  // Live query — reads from local SQLite (works online AND offline)
  const { data: stories } = useQuery<Story & { cover_image: string | null }>(
    `SELECT s.*, sc.image_url as cover_image
     FROM stories s
     LEFT JOIN story_chapters sc ON sc.story_id = s.id AND sc.chapter_number = 1
     WHERE s.status != 'failed'
     ORDER BY s.created_at DESC`
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📖 SandSync</Text>
          <Text style={styles.headerSub}>
            {stories?.length ?? 0} {(stories?.length ?? 0) === 1 ? "story" : "stories"} · local SQLite
          </Text>
        </View>

        {/* Online/Offline toggle */}
        <TouchableOpacity
          style={[styles.toggleBtn, isOnline ? styles.toggleOnline : styles.toggleOffline]}
          onPress={handleToggle}
          activeOpacity={0.8}
        >
          {syncing ? (
            <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
          ) : (
            <Text style={styles.toggleDot}>{isOnline ? "●" : "○"}</Text>
          )}
          <Text style={styles.toggleText}>
            {syncing ? "Syncing…" : isOnline ? "Online" : "Go Online"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sync banner — shown while connecting */}
      {syncing && (
        <View style={styles.syncBanner}>
          <ActivityIndicator size="small" color="#6366f1" />
          <Text style={styles.syncBannerText}>
            PowerSync connecting… stories will appear automatically
          </Text>
        </View>
      )}

      {/* Offline banner */}
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineBannerText}>
            ✈️  Offline mode — reading from local SQLite cache
          </Text>
        </View>
      )}

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
            <Text style={styles.emptyEmoji}>{isOnline ? "🌊" : "✈️"}</Text>
            <Text style={styles.emptyTitle}>
              {isOnline ? "Syncing stories…" : "Offline — no local stories yet"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isOnline
                ? "PowerSync is pulling your stories from the cloud. They'll appear here in seconds."
                : "Tap Go Online to sync stories from the cloud to this device."}
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
  headerSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  toggleOnline: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  toggleOffline: {
    backgroundColor: "#dc2626",
  },
  toggleDot: {
    fontSize: 11,
    color: "#fff",
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  syncBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ede9fe",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#c4b5fd",
  },
  syncBannerText: {
    fontSize: 13,
    color: "#5b21b6",
    flex: 1,
  },
  offlineBanner: {
    backgroundColor: "#fef2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fecaca",
  },
  offlineBannerText: {
    fontSize: 12,
    color: "#991b1b",
    textAlign: "center",
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
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
});
