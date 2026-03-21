# SandSync Demo Video — Comprehensive Assessment
**Author:** Finn (video pipeline specialist)  
**Date:** 2026-03-18  
**Deadline:** 2026-03-20 (48 hours)  
**Current best draft:** `demo-video/sandsync-demo-DRAFT-v4.mp4` — 174s (2:54), 14.9 MB

---

## Executive Summary

The v4 draft is **≈75% submission-ready**. The story is coherent, voiceovers are ElevenLabs quality, the pipeline-demo page IS captured with nodes lighting up, and the stack callouts are solid. The two critical gaps are:

1. **Scene G voice**: Kokoro TTS placeholder (robotic) where Nissan's real voice should be — the emotional climax
2. **Scene H visual**: Illustrated phone mockup instead of real iOS simulator in airplane mode

Everything else is real footage or polished slides. The demo CAN be submitted as-is (7/10 quality), but swapping in Nissan's voice for Scene G would take it to 9/10.

---

## 1. Complete Asset Inventory

### 📹 Main Draft Videos

| File | Duration | Resolution | Size | Quality |
|------|----------|-----------|------|---------|
| `sandsync-demo-DRAFT-v4.mp4` | **174s (2:54)** | 1440×900 | 15 MB | ✅ **CURRENT BEST — submission candidate** |
| `sandsync-demo-DRAFT-v3.mp4` | 121s (2:01) | 1440×900 | 12 MB | ⚠️ Superseded by v4 |
| `sandsync-demo-DRAFT-v2.mp4` | 139s (2:19) | 1280×720 | 16 MB | ⚠️ Lower res, superseded |
| `sandsync-demo-DRAFT.mp4` | 92s (1:32) | 1920×1080 | 17 MB | ⚠️ Older draft, shorter |
| `sandsync-demo-final.mp4` | 163s (2:43) | 1920×1080 | 61 MB | ❌ **Synthetic colored screens — DO NOT SUBMIT** |

### 📹 Raw Scenario Clips (original captures)

| File | Duration | Resolution | Has Audio | Quality |
|------|----------|-----------|-----------|---------|
| `scenario-pipeline-full.mp4` | 94.9s | 1920×1080 | No (silent) | ⚠️ Synthetic/placeholder render |
| `scenario-offline-sync.mp4` | 60.8s | 1920×1080 | No (silent) | ⚠️ Synthetic/placeholder render |
| `scenario-agents-debug.mp4` | 40.2s | 1920×1080 | No (silent) | ⚠️ Synthetic/placeholder render |

### 📹 Takes (raw recordings, no audio)

| File | Duration | Resolution | Shows |
|------|----------|-----------|-------|
| `takes/scene-01-hook.mp4` | 12s | 1280×720 | Hook/intro footage |
| `takes/scene-02-request.mp4` | 18s | 1280×720 | Story request UI |
| `takes/scene-03-pipeline-start.mp4` | 33s | 1280×720 | Pipeline starting |
| `takes/scene-04-agents-working.mp4` | 36s | 1280×720 | Agents working |
| `takes/scene-05-sync-publish.mp4` | 22s | 1280×720 | Sync/publish moment |
| `takes/scene-06-result.mp4` | 18s | 1280×720 | Story result |

### 🎬 Composed V4 Scenes (the building blocks of the v4 draft)

| Scene | File | Duration | Status | What It Shows |
|-------|------|----------|--------|---------------|
| INTRO | `v3_intro_composed_v4norm.mp4` | 7.0s | ✅ Real slides | Title card + Papa Bois "Some stories cannot wait for a signal" |
| A | `v4_scene_a_composed_v4norm.mp4` | 11.1s | ✅ Slides + VO | Stack slides: PowerSync+Mastra+Supabase+TanStack. ElevenLabs Sarah VO. |
| B | `v4_scene_b_composed_v4norm.mp4` | 16.1s | ✅ Real app footage | Live Showcase gallery — 8 real stories. "Offline – local SQLite" status visible. |
| C | `v3_scene_c_composed_v4norm.mp4` | 27.2s | ✅ Real app footage | Story reader ("The Parrot's Message") + offline browser demo |
| D | `v4_scene_d_composed_v4norm.mp4` | 22.6s | ✅ Slides + VO | Mastra/pipeline slides — 5 agents named. Full agent chain described. |
| E | `v3_scene_e_composed_v4norm.mp4` | 45.0s | ✅ **Real pipeline-demo footage** | `/pipeline-demo` page with nodes lighting up live |
| F | `v4_scene_f_composed_v4norm.mp4` | 11.9s | ✅ Real app footage | Completed story + Supabase storage callout |
| G | `v4_scene_g_composed_v4norm.mp4` | **6.6s** | ⚠️ **PLACEHOLDER VOICE** | Real desktop capture: browser (left) + iOS Simulator (right). Kokoro TTS voice. |
| H | `v4_scene_h_composed_v4norm.mp4` | **14.8s** | ⚠️ **PLACEHOLDER VISUAL** | Illustrated phone mockup (not real simulator) showing Online → Offline states |
| OUTRO | `v3_outro_composed_v4norm.mp4` | 11.8s | ✅ Slides | Sponsor logos + closing line + "Built on PowerSync" card |

### 🎙️ Voiceover Files

| File | Duration | Voice | Status |
|------|----------|-------|--------|
| `vo/v4_scene_a_vo.mp3` | 10.8s | ElevenLabs Sarah | ✅ Production quality |
| `vo/v4_scene_b_vo.mp3` | 15.3s | ElevenLabs Sarah | ✅ Production quality |
| `vo/v4_scene_d_vo.mp3` | 22.3s | ElevenLabs Sarah | ✅ Production quality |
| `vo/v4_scene_f_vo.mp3` | 11.1s | ElevenLabs Sarah | ✅ Production quality |
| `vo/v4_scene_g_vo_kokoro_placeholder.mp3` | 6.0s | **Kokoro TTS (robotic)** | ❌ **PLACEHOLDER — replace with Nissan's real voice** |
| `vo/v4_scene_h_vo.mp3` | 14.5s | ElevenLabs Sarah | ✅ Production quality |
| `vo/v3_intro_vo.mp3` | 6.9s | ElevenLabs Papa Bois | ✅ Production quality |
| `vo/v3_outro_vo.mp3` | 11.5s | ElevenLabs Papa Bois | ✅ Production quality |
| `takes/vo-scene-01-papa-bois.mp3` | 10.4s | ElevenLabs Papa Bois | ✅ Used in earlier draft |
| `takes/vo-scene-02-nissan-PLACEHOLDER.mp3` | 6.5s | Placeholder | ❌ Placeholder only |
| `takes/vo-scene-05-nissan-PLACEHOLDER.mp3` | 9.4s | Placeholder | ❌ Placeholder only |
| `voiceover-ai-draft.mp3` | 107s | ElevenLabs Papa Bois | ⚠️ Old draft, not used in v4 |

### 🖼️ Slides (PNG, used in composed scenes)

All 13 slides exist in `auto/slides/`:
- `slide_01.png` → `slide_12.png` — Full presentation deck (12 slides)
- `slide_tanstack.png` — **NEW: "SandSync Built On" — 4 sponsor boxes (PowerSync, Mastra, Supabase, TanStack) + 3 service logos (fal.ai, ElevenLabs, Claude)**

---

## 2. Current Draft Assessment — `sandsync-demo-DRAFT-v4.mp4`

### Scene Map (what's actually on screen)

| Timestamp | Scene | On Screen | Assessment |
|-----------|-------|-----------|------------|
| 0:00–0:07 | INTRO | Dark slide: "THE SOLUTION — SandSync: Offline-First AI Folklore" (slide 3/12). Three feature cards: Caribbean Soul / Offline-First / Living Stories. | ✅ Polished |
| 0:07–0:18 | A | Slides: SandSync architecture, PowerSync→SQLite diagram, TanStack stack slide ("Built On": 4 sponsor boxes), hackathon credit. | ✅ All 4 bonus sponsors shown |
| 0:18–0:34 | B | Real app: Showcase gallery with 8 story cards. "Offline – local SQLite" badge in nav. Some card images broken (consistent with offline mode). | ✅ Real app, good quality |
| 0:34–1:01 | C | Real app: Story reader ("The Parrot's Message"). Full text visible. Pipeline bar shown. "Offline" indicator active. Offline-first principle demonstrated in-browser. | ✅ Strong offline demo |
| 1:01–1:24 | D | Slides: Mastra pipeline flow (Papa Bois → Anansi → Ogma → Devi → fal.ai), agent descriptions, ElevenLabs/fal.ai callouts. | ✅ Technical depth shown |
| 1:24–2:09 | E | **Real `/pipeline-demo` page**: nodes lighting up live — "User Input" → "Papa Bois" → "Anansi" (orange active) → "Ogma" (approved, 9/10) → "ElevenLabs" → "fal.ai FLUX" → "Supabase" → "PowerSync Sync" → "Story Published". Stack column lists all sponsors. Right panel shows live Ogma review. | ✅ **THE best scene** |
| 2:09–2:21 | F | Real app: Story reader with full text ("The Fisherman's Bargain"). "Offline" nav indicator. Story complete with pipeline shown. | ✅ Good |
| 2:21–2:28 | G | **Desktop capture**: Pipeline editor (left), browser (center), iOS Simulator with story list (right). Real Xcode Simulator visible with iPhone bezel and real story cards. Kokoro robotic voice delivering Nissan's critical line. | ⚠️ **Visual = good. Voice = placeholder** |
| 2:28–2:43 | H | Illustrated phone mockup (not simulator): two frames showing "Stories synced. Online" (green badge) and "Still works. Offline" (red badge). Custom badges, no airplane mode icon. | ⚠️ **Illustrated mockup, not real simulator** |
| 2:43–2:54 | OUTRO | Sponsor logos + closing narration + "Caribbean folklore. AI-written. Narrated. Illustrated. Offline." Links to GitHub and live site. Hackathon credit. | ✅ Professional |

### What Story Does It Tell?

The v4 draft tells this arc:
1. **Problem**: Oral traditions need offline-first preservation
2. **Stack intro**: PowerSync + Mastra + Supabase + TanStack + fal.ai + ElevenLabs
3. **Proof of life**: 8 real stories in the showcase, offline badge active
4. **Offline-first**: Browser reads story with no connection
5. **How it works**: Mastra's 5-agent pipeline explained via slides
6. **Live pipeline**: `/pipeline-demo` shows agents running in real time
7. **Sync climax**: iOS simulator shows story list (but only 6.6 seconds, robotic voice)
8. **Offline on device**: Illustrated phone mockup shows offline concept
9. **Outro**: All sponsors named, links, credits

### Gaps and Issues

| Issue | Severity | Location |
|-------|----------|----------|
| Scene G voice = Kokoro TTS (robotic) | 🔴 CRITICAL | 2:21–2:28 |
| Scene H = illustrated mockup, not real simulator | 🟡 SIGNIFICANT | 2:28–2:43 |
| Scene G is only 6.6s — too short for the climax moment | 🟡 SIGNIFICANT | 2:21–2:28 |
| No URL bar visible in pipeline-demo scene | 🟢 MINOR | 1:24–2:09 |
| Background hum: audio mean -21.3 dB, max -3.8 dB — healthy levels, no obvious hum issue | 🟢 NONE | Whole video |
| Offline badge shows "offline – local SQLite" but no actual network disconnection demo in browser (no DevTools) | 🟡 MINOR | Scene C |
| "Press ESC to exit" visible in some slide frames (Slidev capture artifact) | 🟡 MINOR | Scene D |

### Audio Assessment

- Mean volume: -21.3 dB (good — not too quiet)
- Max volume: -3.8 dB (not clipping)
- No obvious background hum detected at these levels
- ElevenLabs Sarah voice is consistent and natural across Scenes A, B, D, F, H
- ElevenLabs Papa Bois voice is used for INTRO and OUTRO
- **Scene G has the Kokoro placeholder** — noticeably robotic compared to everything else

---

## 3. Gap Analysis — 4 Mandatory Demo Requirements

| Requirement | Status | Evidence | Quality |
|------------|--------|----------|---------|
| **1. pipeline-demo page — nodes lighting up** | ✅ **CAPTURED** | Scene E (1:24–2:09, 45s) — real `/pipeline-demo` page, nodes progress gray→orange→green | **Excellent** — 45 seconds of live pipeline footage, all stages visible |
| **2. Completed story displayed on web app** | ✅ **CAPTURED** | Scene C (0:34–1:01) + Scene F (2:09–2:21) — "The Parrot's Message" and "The Fisherman's Bargain" both shown with full text | **Good** — real app footage, story text readable |
| **3. iOS simulator showing story appearing (sync moment)** | ⚠️ **PARTIAL** | Scene G (2:21–2:28, 6.6s) — real Xcode Simulator visible with story list, but: (a) only 6.6s, (b) robotic voice kills the moment, (c) unclear if sync is live or pre-loaded | **Weak** — real simulator exists but scene too short and voice ruins it |
| **4. Offline playback — airplane mode, story still plays** | ❌ **NOT CAPTURED** | Scene H shows an illustrated phone mockup with custom "Offline" badge — NOT real simulator, NO airplane mode icon | **Missing** — needs real recording |

### Critical Finding on Scene G

Frame analysis confirms: the Scene G desktop capture shows a **real macOS desktop** with:
- Left: `/pipeline-demo` UI with agent cards
- Center: Browser window (SandSync homepage)  
- Right: **Real Xcode iOS Simulator** (iPhone bezel, Dynamic Island, native simulator chrome) with a story list showing "The Child of the Silk Cotton Tree" and "Anansi and the Stolen Thunder"

This IS a real sync moment — the simulator is genuine. But it's only 6.6 seconds and the Kokoro voice completely undercuts it.

---

## 4. Sponsor Callout Assessment

| Sponsor | Required | In Draft | Where | Quality |
|---------|----------|----------|-------|---------|
| **PowerSync** | ✅ Core | ✅ Yes | Slide A (stack box), Pipeline E (node "PowerSync Sync"), Scene H ("PowerSync" button), Outro | **Strong** — mentioned by name in stack, pipeline, and outro |
| **Mastra** | ✅ Core | ✅ Yes | Slide D ("Mastra: Real Orchestration"), Pipeline E (node "Mastra Orchestrator"), stack list in E | **Strong** — dedicated slide + live pipeline node |
| **Supabase** | ✅ Core | ✅ Yes | Slide A (stack box: "Postgres + Storage"), Pipeline E (node "Supabase"), Scene F VO mentions it | **Good** — stack slide + pipeline node |
| **ElevenLabs** | ✅ Core | ✅ Yes | Slide D (Devi agent: "ElevenLabs — Denzel's Jamaican voice"), Pipeline E (node "ElevenLabs"), fal.ai slide | **Good** — named in pipeline |
| **TanStack** | ✅ Bonus | ✅ Yes | Scene A — dedicated `slide_tanstack.png` showing TanStack as one of 4 main stack boxes with "Type-safe routing" caption | **Excellent** — explicit callout slide |
| **fal.ai** | ✅ Bonus | ✅ Yes | Slide at 1:20 — "fal.ai FLUX Paints the World" full slide. Also: Pipeline E node "fal.ai FLUX". stack_tanstack slide also lists it | **Strong** — dedicated slide + pipeline node |

### Sponsor Callout Summary

All 6 sponsors are named. The `slide_tanstack.png` (Scene A) is the hero callout — it has PowerSync, Mastra, Supabase, and TanStack as the four primary boxes, with fal.ai, ElevenLabs, and Claude below. This is excellent prize alignment.

**What's missing:** ElevenLabs voice narration could be more explicitly HEARD. The current ElevenLabs TTS is Sarah's voice throughout — but there's no scene where a story PLAYS with audio (the story audio button is visible but not clicked in the footage). Judges won't necessarily hear what ElevenLabs contributes.

---

## 5. Recommended Action Plan

### Priority 1 — CRITICAL (blocks 9/10 score) — Est. 15 minutes

**Nissan records Scene G voice take**

Record one line (8–10 seconds):
> "It was offline the whole time. The moment I reconnect — PowerSync pushes everything live. Just like that."

- Setup: phone Voice Memo, quiet room, one natural take
- File: drop as `demo-video/takes/nissan/scene_g_nissan_voice.m4a`
- Agent handles: Finn recomposes Scene G, rebuilds final in ~5 minutes

This one change elevates the video from "technically good" to "emotionally compelling." The robotic Kokoro voice at the climax moment currently undermines weeks of otherwise strong production.

---

### Priority 2 — SIGNIFICANT (adds offline proof) — Est. 30–45 minutes

**Nissan records real offline/airplane mode scene**

What to record (QuickTime screen recording, ~30s):
1. Open iOS Simulator with SandSync app showing a story
2. Enable Airplane Mode (Settings > Airplane Mode ON, or use the Simulator's Hardware menu)
3. Show red "No Network" / airplane mode indicator in simulator status bar
4. Navigate to a story in the app — it loads from local SQLite
5. Hit play (ElevenLabs audio plays from local storage)
6. Show the simulator clearly with the system status bar showing airplane icon

This replaces the illustrated mockup in Scene H and proves requirement #4 (offline playback).

- File: drop as `demo-video/takes/nissan/scene_h_simulator.mp4`
- Finn handles: crop to best 15s, compose with existing VO, rebuild

---

### Priority 3 — IMPROVEMENT (nice-to-have) — Est. 10 minutes

**Record ElevenLabs audio playing in the iOS app**

Current gap: we never HEAR ElevenLabs narration in the video. The story reader page has a "Play" button but it's never clicked.

Quick fix: in the Scene F recording or a new take, click Play on a story and let the ElevenLabs audio play for 5–10 seconds while the story reader shows. This makes the ElevenLabs callout tangible — judges hear the voice, not just read the name.

---

### Priority 4 — POLISH (agents can handle) — Est. 5 minutes agent time

**Extend Scene G to ~15–20 seconds** (Finn does this automatically when re-composing with new voice)

The current 6.6s Scene G is too short. With Nissan's voice at ~8–10s, the scene will naturally extend. Finn should also:
- Slow-zoom into the iOS Simulator portion of the split-screen for the last 5 seconds
- Add a subtle on-screen text label: "PowerSync sync — story appears live"

---

### Recommended Action Order

```
Day 1 (Today, March 18):
  1. Nissan records scene_g_nissan_voice.m4a (15 min)
  2. Nissan records scene_h_simulator.mp4 (45 min)
  3. Finn recomposes Scene G + H + rebuilds v4 draft (10 min automated)
  4. Nissan reviews sandsync-demo-DRAFT-v5.mp4

Day 2 (March 19):
  5. Minor polish pass if needed (captions, text overlays)
  6. Export final at 1920×1080 upscaled (optional — 1440×900 is acceptable)
  7. Submit

Day 3 (March 20 — deadline day):
  8. Buffer / contingency
```

### If Nissan Can Only Do ONE Thing

**Record the Scene G voice line.** 

The iOS simulator IS already captured in Scene G. The story list IS showing. The real sync moment IS there — it's just 6.6 seconds with a robotic voice. Nissan's real voice, delivered naturally, transforms this from a "technically accurate" demo to a "I want to use this" demo.

---

## 6. Files That Can Be Safely Deleted (Cleanup)

These are no longer needed:
- `sandsync-demo-DRAFT.mp4` (92s) — superseded
- `sandsync-demo-final.mp4` (61MB) — synthetic placeholder
- `scenario-agents-debug.mp4`, `scenario-offline-sync.mp4`, `scenario-pipeline-full.mp4` — synthetic
- `auto/scenes/scene_01_raw.*`, `scene_02_raw.*` etc (old pipeline raw WebM files)
- `takes/*.webm` duplicate files (mp4 versions already exist)

---

## 7. Submission Checklist

| Item | Status |
|------|--------|
| Video file exists and plays | ✅ |
| Duration 2–5 min | ✅ 2:54 |
| File size <50MB | ✅ 15MB |
| pipeline-demo page shown | ✅ Scene E |
| Completed story in web app | ✅ Scenes C + F |
| iOS simulator sync moment | ⚠️ Scene G (real but too short, robotic voice) |
| Offline playback demo | ❌ Scene H (illustrated mockup) |
| PowerSync named | ✅ |
| Mastra named | ✅ |
| Supabase named | ✅ |
| ElevenLabs named | ✅ |
| TanStack named | ✅ |
| fal.ai named | ✅ |
| ElevenLabs HEARD | ❌ Audio not played in footage |
| Nissan's real voice in climax | ❌ Kokoro placeholder |
| Audio levels acceptable | ✅ |
| No background hum | ✅ |

**Current score: 9/13 items ✅ — submittable but not optimal**  
**After Priority 1 + 2 fixes: 12/13 items ✅**

---

_Assessment by Finn — SandSync Video Pipeline Specialist_  
_Generated: 2026-03-18_
