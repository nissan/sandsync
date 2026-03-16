import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useQuery } from "@powersync/react-native";
import { AudioPlayer } from "../../components/AudioPlayer";
import { SyncBadge } from "../../components/SyncBadge";
import type { Story, StoryChapter } from "../../lib/powersync";

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: stories } = useQuery<Story>(
    "SELECT * FROM stories WHERE id = ?",
    [id]
  );

  const { data: chapters } = useQuery<StoryChapter>(
    "SELECT * FROM story_chapters WHERE story_id = ? ORDER BY chapter_number ASC",
    [id]
  );

  const story = stories?.[0];

  if (!story) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading story...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: story.title ?? "Story",
          headerRight: () => <SyncBadge />,
        }}
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          {/* Story header */}
          <View style={styles.storyHeader}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyMeta}>
              {story.genre} · {story.theme}
            </Text>
          </View>

          {/* Chapters */}
          {chapters.length === 0 ? (
            <View style={styles.noChapters}>
              <Text style={styles.noChaptersEmoji}>✨</Text>
              <Text style={styles.noChaptersText}>
                {story.status === "complete"
                  ? "Chapters syncing..."
                  : "Story is still being generated..."}
              </Text>
            </View>
          ) : (
            chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function ChapterCard({ chapter }: { chapter: StoryChapter }) {
  const text = chapter.reviewed_content || chapter.content;

  return (
    <View style={styles.chapter}>
      <Text style={styles.chapterTitle}>
        Chapter {chapter.chapter_number}: {chapter.title}
      </Text>

      {chapter.image_url && (
        <Image
          source={{ uri: chapter.image_url }}
          style={styles.chapterImage}
          contentFit="cover"
          transition={300}
        />
      )}

      <Text style={styles.chapterText}>{text}</Text>

      {chapter.audio_url ? (
        <AudioPlayer
          audioUrl={chapter.audio_url}
          chapterTitle={chapter.title}
        />
      ) : (
        <View style={styles.noAudio}>
          <Text style={styles.noAudioText}>🎵 Audio not available yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7ff",
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  storyHeader: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  storyTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 6,
    lineHeight: 32,
  },
  storyMeta: {
    fontSize: 14,
    color: "#6b7280",
    textTransform: "capitalize",
  },
  noChapters: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  noChaptersEmoji: {
    fontSize: 48,
  },
  noChaptersText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  chapter: {
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  chapterImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#f3f4f6",
  },
  chapterText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 26,
    marginBottom: 14,
  },
  noAudio: {
    paddingVertical: 8,
  },
  noAudioText: {
    fontSize: 13,
    color: "#9ca3af",
    fontStyle: "italic",
  },
});
