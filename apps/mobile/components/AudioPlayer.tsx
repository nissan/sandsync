import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

interface AudioPlayerProps {
  audioUrl: string;
  chapterTitle?: string;
}

export function AudioPlayer({ audioUrl, chapterTitle }: AudioPlayerProps) {
  const player = useAudioPlayer({ uri: audioUrl });
  const status = useAudioPlayerStatus(player);

  // Track play state locally — don't rely solely on status.isPlaying
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync local state when status changes (e.g. audio finishes)
  useEffect(() => {
    setIsPlaying(status.isPlaying ?? false);
  }, [status.isPlaying]);

  const isLoading = status.isBuffering && !isPlaying && (status.currentTime ?? 0) < 0.1;
  const duration = status.duration ?? 0;
  const position = status.currentTime ?? 0;
  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  }, [isPlaying, player]);

  const handleSeekBack = useCallback(() => {
    player.seekTo(Math.max(0, position - 15));
  }, [player, position]);

  const handleSeekForward = useCallback(() => {
    player.seekTo(Math.min(duration, position + 15));
  }, [player, position, duration]);

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        🎙️ {chapterTitle ? `Listen: ${chapterTitle}` : "Listen to this chapter"}
      </Text>
      <Text style={styles.offlineNote}>▶ Plays offline from local cache</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleSeekBack} style={styles.seekBtn}>
          <Text style={styles.seekText}>↩ 15</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playBtn}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶"}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSeekForward} style={styles.seekBtn}>
          <Text style={styles.seekText}>15 ↪</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 14,
    backgroundColor: "#1e1b4b",
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e0e7ff",
    marginBottom: 2,
  },
  offlineNote: {
    fontSize: 11,
    color: "#818cf8",
    marginBottom: 12,
    fontStyle: "italic",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 14,
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  playIcon: {
    fontSize: 22,
    color: "#fff",
  },
  seekBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  seekText: {
    fontSize: 13,
    color: "#a5b4fc",
    fontWeight: "600",
  },
  progressContainer: {
    gap: 4,
  },
  progressBg: {
    height: 4,
    backgroundColor: "#3730a3",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#818cf8",
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 11,
    color: "#6366f1",
    fontWeight: "500",
  },
});
