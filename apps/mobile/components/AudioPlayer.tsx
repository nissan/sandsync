import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";

interface AudioPlayerProps {
  audioUrl: string;
  chapterTitle?: string;
}

function getCachedPath(url: string): string {
  // Convert URL to a safe filename
  const filename = url
    .replace(/https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .slice(0, 100) + ".mp3";
  return `${FileSystem.documentDirectory}audio_cache/${filename}`;
}

export function AudioPlayer({ audioUrl, chapterTitle }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cachedPath = getCachedPath(audioUrl);

  // Check if already cached on mount
  useEffect(() => {
    (async () => {
      try {
        const info = await FileSystem.getInfoAsync(cachedPath);
        setIsCached(info.exists);
      } catch {}
    })();
  }, [cachedPath]);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const ensureCacheDir = async () => {
    const dir = `${FileSystem.documentDirectory}audio_cache/`;
    const info = await FileSystem.getInfoAsync(dir);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
  };

  const downloadAndCache = async (): Promise<string> => {
    await ensureCacheDir();
    const download = await FileSystem.downloadAsync(audioUrl, cachedPath);
    if (download.status !== 200) {
      throw new Error(`Download failed: ${download.status}`);
    }
    setIsCached(true);
    return cachedPath;
  };

  const getAudioPath = async (): Promise<string> => {
    const info = await FileSystem.getInfoAsync(cachedPath);
    if (info.exists) return cachedPath;
    return downloadAndCache();
  };

  const handlePlayPause = useCallback(async () => {
    setError(null);

    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else if (status.isLoaded) {
        await sound.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    try {
      setIsLoading(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const path = await getAudioPath();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: path },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setIsPlaying(false);
              newSound.unloadAsync();
              setSound(null);
            }
          }
        }
      );
      setSound(newSound);
      setIsPlaying(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Playback failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [sound, audioUrl, cachedPath]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonLoading]}
        onPress={handlePlayPause}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonIcon}>{isPlaying ? "⏸" : "▶️"}</Text>
        )}
        <Text style={styles.buttonText}>
          {isLoading
            ? isCached
              ? "Loading..."
              : "Downloading..."
            : isPlaying
            ? "Pause"
            : "Play Audio"}
        </Text>
      </TouchableOpacity>
      {isCached && !isPlaying && !isLoading && (
        <Text style={styles.cachedBadge}>📦 Cached offline</Text>
      )}
      {error && <Text style={styles.error}>⚠️ {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonLoading: {
    backgroundColor: "#a5b4fc",
  },
  buttonIcon: {
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  cachedBadge: {
    marginTop: 4,
    fontSize: 11,
    color: "#6b7280",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#dc2626",
  },
});
