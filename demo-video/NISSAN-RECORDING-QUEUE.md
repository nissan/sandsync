# 🎬 NISSAN RECORDING QUEUE — SandSync Demo V4
**Created by:** Finn (video pipeline agent)  
**Date:** 2026-03-17 (overnight production run)  
**Draft status:** `sandsync-demo-DRAFT-v4.mp4` is COMPLETE — 2:54 min, 14.9 MB  
**Location:** `~/projects/sandsync/demo-video/sandsync-demo-DRAFT-v4.mp4`

---

## PRIORITY QUEUE

### 🔴 CRITICAL — Take 1: Scene G Voice (THE PowerSync climax)

**Your line:**
> "It was offline the whole time. The moment I reconnect — PowerSync pushes everything live. Just like that."

**Context in the video:** This is the emotional climax — the moment at 2:01 where the split screen shows the browser pipeline on the left and the iOS app on the right. Your voice bridges it. It's the "wow" sentence judges will remember.

**Tone:** Calm. Natural. Like you're showing a friend something that surprised even you — not reading from a script.

**Target duration:** ~8 seconds (current Kokoro placeholder is 6s — a slightly slower delivery is actually better here)

**Setup:**
- Find a quiet room — no HVAC, no keyboard clicks
- Record on your phone's voice memo or MacBook mic, both are fine
- One take is enough if it feels natural

**Deliver as:** `scene_g_nissan_voice.m4a` or `.mp3`  
**Drop in:** `demo-video/takes/nissan/`

When you drop the file, Finn can swap it into Scene G in under 5 minutes.

---

### 🟡 OPTIONAL — Take 2: Scene G Visual (preferred but not blocking)

**What to record:** ~25s of you with the browser open on the left side of your screen and the iOS simulator on the right. Generate a new story via the web UI. Watch the card appear in the simulator. That's the whole shot.

**Why it's optional:** The current draft uses a desktop screen capture (which shows the app running, it just isn't as dramatic as the real sync moment with you at the keyboard). The voice swap alone will make this scene 80% better. The visual swap is the extra 20%.

**Setup:**
1. Open sandsync.reddi.tech in a browser on the left half of your screen
2. Open Simulator on the right half
3. Start recording your screen (QuickTime → File → New Screen Recording)
4. Generate a story through the web UI
5. Let it run until the card appears on the phone
6. Stop recording

**Deliver as:** `scene_g_screen.mp4`  
**Drop in:** `demo-video/takes/nissan/`

**Duration target:** 25–35 seconds (Finn will crop to the best 21s)

---

## WHAT FINN DID OVERNIGHT

### ✅ Completed
1. **5 new ElevenLabs VO files generated** (Sarah voice):
   - `v4_scene_a_vo.mp3` — TanStack callout (10.8s)
   - `v4_scene_b_vo.mp3` — local SQLite callout (15.3s)
   - `v4_scene_d_vo.mp3` — full 5-agent description (22.3s)
   - `v4_scene_f_vo.mp3` — Supabase Storage callout (11.1s)
   - `v4_scene_h_vo.mp3` — Dead Zone narrative (14.5s)

2. **Scene G placeholder VO** — ElevenLabs Sarah reading your line (marked as PLACEHOLDER, needs your real voice)

3. **TanStack sponsor slide created** (`slide_tanstack.png`) — dark navy, shows all 4 bonus prize sponsors in visual hierarchy

4. **Scene G composed** — split screen: pipeline footage (left) + iOS simulator screen capture (right), 6.5s

5. **Scene H composed** — 3-frame offline sequence (Online → Airplane Mode → Still Works), 14.8s with VO

6. **Full video stitched**: 10 scenes, 2:54 (174s), 14.9 MB

### ⚠️ Known Placeholder Issues
| Scene | Issue | Fix |
|-------|-------|-----|
| G — Voice | ElevenLabs Sarah reading your line | Replace with `takes/nissan/scene_g_nissan_voice.mp3` |
| G — Visual | Desktop screen capture (static-ish) | Replace with `takes/nissan/scene_g_screen.mp4` (optional) |
| H — Visual | Illustrated frames (not actual simulator) | Replace with real simulator recording (optional) |
| C — Full scene | Reused from v3 | Works fine for now |
| E — Full scene | Reused from v3 | Works fine for now |

### Scene Duration Map (actual)
| Scene | Duration | Status |
|-------|----------|--------|
| INTRO | 7.0s | ✅ REUSED |
| A | 11.1s | ✅ NEW VO + TanStack slide |
| B | 16.1s | ✅ NEW VO |
| C | 27.2s | ✅ REUSED |
| D | 22.6s | ✅ NEW VO (full agent chain) |
| E | 45.0s | ✅ REUSED |
| F | 11.9s | ✅ NEW VO |
| G | 6.5s | ⚠️ PLACEHOLDER voice + desktop capture |
| H | 14.8s | ⚠️ PLACEHOLDER visual (illustrated frames) |
| OUTRO | 11.8s | ✅ REUSED |
| **TOTAL** | **174.0s (2:54)** | |

---

## HOW TO APPLY YOUR RECORDINGS

Once you drop files in `takes/nissan/`, run:
```bash
cd ~/projects/sandsync/demo-video/auto

# If you have just the voice:
# 1. Re-run compose_v4.py with the new voice file
# (Finn will handle this in next session — just drop the files)

# Or trigger Finn to do the swap:
# "Finn — Nissan dropped scene_g_nissan_voice.mp3 in takes/nissan/ — recompose Scene G and rebuild the final"
```

---

## HACKATHON DEADLINE
**March 20.** You have 3 days.  
Scene G voice take is the only critical change. Everything else in the draft is submission-ready.

> "It was offline the whole time. The moment I reconnect — PowerSync pushes everything live. Just like that."

That one line. That's the whole scene.
