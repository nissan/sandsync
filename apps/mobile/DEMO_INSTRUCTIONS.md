# SandSync Mobile — Demo Instructions

## ⚠️ Important: Development Build (Not Expo Go)

This app uses a **development build** (native dev client) — NOT Expo Go. The app is compiled natively via Xcode and installed directly in the simulator. This is better for demos: no QR scanning, launches like a real app.

> **Note:** `bun` causes HMRClient resolution failures with Expo Metro. Always use `npm` for this project.

---

## Quick Start (iPhone 17 Pro Simulator)

### Prerequisites
- Xcode installed
- iPhone 17 Pro simulator booted (UUID: `F5F6B51C-5F75-470C-9320-F267D8234144`)
- The SandSync app already installed in the simulator from `expo run:ios`

### Option A — App already installed (fastest)
```bash
# Boot the simulator
xcrun simctl boot F5F6B51C-5F75-470C-9320-F267D8234144 2>/dev/null || true
open -a Simulator

# Start Metro bundler
cd ~/projects/sandsync/apps/mobile
LANG=en_US.UTF-8 npx expo start --dev-client --port 8082
# Press 'i' or tap the SandSync app in the simulator
```

### Option B — Full rebuild from scratch
```bash
cd ~/projects/sandsync/apps/mobile

# 1. Install deps (npm, NOT bun — bun breaks Metro HMR)
npm install --no-workspaces

# 2. Prebuild native project
LANG=en_US.UTF-8 npx expo prebuild --platform ios --clean

# 3. Pod install (needs LANG set to avoid Ruby encoding error)
cd ios && LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 pod install && cd ..

# 4. Build and install in simulator
xcrun simctl boot F5F6B51C-5F75-470C-9320-F267D8234144 2>/dev/null || true
open -a Simulator
LANG=en_US.UTF-8 npx expo run:ios --device "iPhone 17 Pro"
```

---

## Known Issues / Workarounds

| Issue | Fix |
|-------|-----|
| `bun add` breaks Metro HMR | Use `npm install --no-workspaces` instead |
| `pod install` encoding error | Always set `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8` |
| npm arborist crash from root | Use `--no-workspaces` flag (monorepo has bun workspaces at root) |
| `expo-av` header not found (SDK 55) | Removed; AudioPlayer is stubbed for demo |

---

## The Hackathon Demo — "Kids in the Car, Dead Zone"

This demo shows:
1. **Real-time sync**: Story appears on phone the moment it's generated on the web
2. **Offline-first**: Works perfectly with no internet (airplane mode)
3. **Offline indicator**: Live 🟢/🔴 badge powered by `usePowerSyncStatus()`

### Step-by-Step Demo Script

#### Setup (before the demo)
1. Open the SandSync web app: `https://sandsync.vercel.app` (or `localhost:3000`)
2. Confirm the mobile app is running in the simulator with the **🟢 Live** badge
3. The story library may be empty or have existing stories

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

#### Act 2 — Offline Mode (The Car Demo)

> *"Now the family is in the car, no signal. Can the kids still read their story?"*

1. Open the story on the phone (tap the story card)
2. **Enable Airplane Mode** on the simulator (or via Hardware > Network menu in Simulator)
3. Watch the badge change: **🟢 Live → 🔴 Offline**
4. Scroll through chapters — **content still loads from local SQLite cache** ✅

> *"Full airplane mode. No signal. Kids still read their story."*

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
| Image caching | `expo-image` built-in cache |
| Sync status | `usePowerSyncStatus()` hook → SyncBadge component |
| Navigation | `expo-router` file-based routing |
| Native build | `expo-dev-client` development build (not Expo Go) |

## Key Files

```
app/_layout.tsx            # PowerSync init + provider
app/index.tsx              # Story library (live query)
app/story/[id].tsx         # Story reader with chapters
components/SyncBadge.tsx   # 🟢/🔴 live status
components/AudioPlayer.tsx # Stubbed (expo-av removed for SDK 55 compat)
lib/powersync.ts           # Schema + DB singleton
lib/supabase.ts            # Supabase connector + URLs
```

## Troubleshooting

**Stories not appearing?**
- Check SyncBadge — if 🔴 Offline, PowerSync isn't connected
- Confirm PowerSync endpoint is reachable: `https://69ae074bd42a43395100b01b.powersync.journeyapps.com`

**Metro "port in use" error?**
- Use `--port 8082` flag: `npx expo start --dev-client --port 8082`

**Build fails with expo-av header error?**
- expo-av was removed from this project (incompatible with SDK 55 ExpoModulesCore)
- AudioPlayer is now a stub — this is intentional
