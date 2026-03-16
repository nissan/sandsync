# SandSync Mobile — Demo Instructions

## Quick Start

### Prerequisites
- Node.js / bun installed
- Expo Go app installed on your phone **or** iOS Simulator (Xcode)
- Same WiFi network as your Mac (for Expo Go on phone)

### Run in iOS Simulator
```bash
cd ~/projects/sandsync/apps/mobile
npx expo start
# Press 'i' to open iOS Simulator
```

### Run on Physical Device (Expo Go)
```bash
cd ~/projects/sandsync/apps/mobile
npx expo start
# Scan the QR code with the Expo Go app (iOS camera or Android Expo Go)
```

---

## The Hackathon Demo — "Kids in the Car, Dead Zone"

This demo shows:
1. **Real-time sync**: Story appears on phone the moment it's generated on the web
2. **Offline-first**: Works perfectly with no internet (airplane mode)
3. **Audio caching**: Audio downloads automatically so it plays offline

### Step-by-Step Demo Script

#### Setup (before the demo)
1. Open the SandSync web app: `https://sandsync.vercel.app` (or `localhost:3000`)
2. Start the mobile app in Expo Go / Simulator
3. Confirm the **🟢 Live** badge is showing in the top-right header
4. The story library may be empty or have existing stories

---

#### Act 1 — Real-Time Sync

> *"Imagine a parent generating a bedtime story on their laptop before the family road trip..."*

1. On the **web app**, click **"Generate Story"**
2. Fill in: genre = "Adventure", theme = "Dragons and castles"
3. Click **Generate**
4. Watch the phone — **the story card appears automatically** as it syncs via PowerSync
5. Point out the **🟢 Live** badge — that's PowerSync keeping everything in sync

> *"No refresh needed. It just appears."*

---

#### Act 2 — Offline Playback (The Car Demo)

> *"Now the family is in the car, no signal. Can the kids still hear their story?"*

1. Open the story on the phone (tap the story card)
2. Tap **▶ Play Audio** on Chapter 1
3. Wait for it to download (first time): shows "Downloading..."
4. Audio plays ✅
5. Notice **📦 Cached offline** badge appears after first play

6. Now **enable Airplane Mode** on the phone (Settings → Airplane Mode ON)
7. Watch the badge change: **🟢 Live → 🔴 Offline**
8. Tap play again on Chapter 1 — **it plays from local cache** ✅

> *"Full airplane mode. No signal. Kids still hear their story."*

---

#### Act 3 — New Story Syncs When Back Online

1. Turn airplane mode **off**
2. Watch the badge flip back to **🟢 Live**
3. If another story was generated while offline, it will **sync automatically**

---

## Architecture Notes (for judges)

| Feature | Implementation |
|---------|---------------|
| Offline-first DB | PowerSync (SQLite) — `@powersync/react-native` |
| Real-time sync | PowerSync → Supabase Postgres |
| Audio caching | `expo-file-system/legacy` → `FileSystem.documentDirectory` |
| Image caching | `expo-image` built-in cache |
| Sync status | `usePowerSyncStatus()` hook → SyncBadge component |
| Navigation | `expo-router` file-based routing |

## Key Files

```
app/_layout.tsx       # PowerSync init + provider
app/index.tsx         # Story library (live query)
app/story/[id].tsx    # Story reader with chapters
components/SyncBadge.tsx   # 🟢/🔴 live status
components/AudioPlayer.tsx # Download + cache + play
lib/powersync.ts      # Schema + DB singleton
lib/supabase.ts       # Supabase connector + URLs
```

## Troubleshooting

**Stories not appearing?**
- Check SyncBadge — if 🔴 Offline, PowerSync isn't connected
- Confirm PowerSync endpoint is reachable: `https://69ae074bd42a43395100b01b.powersync.journeyapps.com`

**Audio won't play offline?**
- Must play once online first to cache it
- Cache location: `FileSystem.documentDirectory/audio_cache/`

**Expo Go compatibility**
- All libraries are Expo Go compatible (no bare native modules)
- `expo-av` for audio, `expo-file-system/legacy` for file caching
- If you see warnings about package versions, they're non-breaking
