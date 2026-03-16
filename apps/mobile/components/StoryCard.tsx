import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type { Story } from "../lib/powersync";

const GENRE_EMOJI: Record<string, string> = {
  adventure: "🗺️",
  fantasy: "🧙",
  mystery: "🔍",
  scifi: "🚀",
  "sci-fi": "🚀",
  animals: "🐾",
  friendship: "🤝",
  fairy_tale: "🧚",
  humor: "😂",
  nature: "🌿",
};

interface StoryCardProps {
  story: Story & { cover_image?: string };
}

export function StoryCard({ story }: StoryCardProps) {
  const router = useRouter();
  const emoji = GENRE_EMOJI[story.genre?.toLowerCase()] ?? "📖";

  const isReady = story.status === "complete";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/story/${story.id}`)}
      activeOpacity={0.8}
    >
      {story.cover_image ? (
        <Image
          source={{ uri: story.cover_image }}
          style={styles.cover}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverEmoji}>{emoji}</Text>
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {story.title || "Untitled Story"}
          </Text>
        </View>
        <Text style={styles.genre}>{story.genre}</Text>
        <View style={styles.footer}>
          {isReady ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => router.push(`/story/${story.id}`)}
            >
              <Text style={styles.playButtonText}>▶ Read & Play</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {story.status === "generating" ? "✨ Generating..." : story.status}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  cover: {
    width: "100%",
    height: 160,
    backgroundColor: "#f3f4f6",
  },
  coverPlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  coverEmoji: {
    fontSize: 64,
  },
  info: {
    padding: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 4,
  },
  emoji: {
    fontSize: 18,
    marginTop: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  genre: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  playButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  statusBadge: {
    backgroundColor: "#fef3c7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#92400e",
    fontWeight: "500",
  },
});
