import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AudioPlayerProps {
  audioUrl: string;
  chapterTitle?: string;
}

// expo-av removed for SDK 55 compatibility — audio playback stubbed for demo build
export function AudioPlayer({ audioUrl, chapterTitle }: AudioPlayerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>🎵 Audio available — tap to listen</Text>
      <Text style={styles.sub}>(Audio playback coming soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  sub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
