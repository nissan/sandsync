# SandSync Demo Video — SCRIPT V4
**Production:** SandSync · PowerSync AI Hackathon 2026
**Author:** Sara (docs) · Planning lens: Archie (research synthesis)
**Version:** V4 — Reimagined for maximum prize alignment
**Target length:** 2:35–3:00 minutes
**Last updated:** 2026-03-17

---

## OVERVIEW — What Changed From V3

V3 was a browser-only video that treated PowerSync as a footnote and buried the cultural hook. V4 fixes all of it:

1. **Cultural mission opens AND closes** — Papa Bois owns first and last word
2. **PowerSync is the emotional climax** — the cross-device sync moment is Scene G, the wow moment
3. **Mobile is present** — iPhone simulator in Scenes G + H are new recordings
4. **TanStack gets an explicit callout** — new slide added (Scene A)
5. **"Kids in the Car" story** drives the whole second half
6. **Three-voice structure preserved** — Papa Bois opens, Anansi weaves the pipeline, Nissan is the human witness
7. **All 4 bonus prize sponsors** named explicitly by Scene C

---

## 1. PRIZE ALIGNMENT MAP

| Scene | Timestamp | What's Shown | Criterion Served | Bonus Prize |
|-------|-----------|--------------|-----------------|-------------|
| **INTRO** | 0:00–0:11 | Title card + Papa Bois: "Some stories cannot wait for a signal" | Originality (30%) — culturally grounded hook | — |
| **A** | 0:11–0:26 | Architecture slides + sponsor logos: PowerSync · Mastra · Supabase · TanStack | PowerSync usage (15%) — stack clarity | TanStack (explicit callout on slide) |
| **B** | 0:26–0:42 | Live showcase gallery — stories with FLUX illustrations | Impact & usefulness (20%) — real user output | — |
| **C** | 0:42–0:57 | Story reader + browser DevTools offline toggle | PowerSync usage (15%) — local SQLite proof | Best Local-First (offline moment) |
| **C2** | 0:57–1:02 | Offline badge in browser, story loads cold | PowerSync usage (15%) — "Still here." line | Best Local-First |
| **D** | 1:02–1:11 | Pipeline intro slides (Mastra diagram) | Technical quality (25%) — architecture framing | Best Submission Using Mastra |
| **E** | 1:11–1:51 | Live pipeline viz (`/pipeline-demo`) — 5 nodes lighting up | Technical quality (25%) — agents running real-time | Best Submission Using Mastra |
| **F** | 1:51–2:01 | Completed story: text + FLUX image + ElevenLabs audio | Impact & usefulness (20%) — full output proof | Best Submission Using Supabase (Storage) |
| **G** | 2:01–2:22 | **NEW: Split screen web + iOS simulator** — story appears on phone live | PowerSync usage (15%) — THE wow moment | Best Local-First + Best Supabase |
| **H** | 2:22–2:38 | **NEW: iOS simulator airplane mode** → 🔴 Offline → story reads fine | PowerSync usage (15%) — local SQLite on device | Best Local-First |
| **OUTRO** | 2:38–3:00 | Sponsor logos slide + Papa Bois close + "Built on PowerSync" card | Product & UX (10%) — professional finish | All four sponsors named |

### Bonus Prize Coverage Checklist

| Bonus Prize | Coverage | Scene | Named explicitly |
|-------------|----------|-------|-----------------|
| Best Local-First ($500) | ✅ Strong | C + C2 + G + H | "Local SQLite" (C1), "no signal needed" (E), "Kids in the Car" narrative (G/H) |
| Best Supabase ($1,000 credits) | ✅ Strong | A + F + G | Supabase callout slide (A), Storage (F), Postgres sync origin (G VO) |
| Best Mastra ($500 Amazon) | ✅ Strong | D + E | Mastra diagram (D), live 5-agent pipeline (E), Anansi VO |
| Best TanStack (office hour) | ✅ New | A | "TanStack Router — type-safe web routing" on architecture slide |

---

## 2. REIMAGINED SCRIPT — Scene by Scene

---

### SCENE INTRO — The Forest Speaks
**Timestamp:** 0:00 – 0:11 (11 seconds)
**What's on screen:** Fade in from black. SandSync title card (slide_01.png). Tagline: *"Stories that outlive the signal."* PowerSync AI Hackathon 2026 credit at bottom.
**Narration (Papa Bois):**
> Some stories cannot wait for a signal.
> They live in the deep places.
> This is SandSync.

**Recording source:** REUSE — `v3_intro_composed.mp4` (slide_01 + slide_02 are already composed)
**VO source:** REUSE — `takes/vo-scene-01-papa-bois.mp3` (10.4s — slight trim) OR NEW VO if takes/01 is the wrong script version (check playback)
**Why this scene:** Cultural mission hook + Originality (30%) — judges remember their first 10 seconds

---

### SCENE A — What We Built (Stack + Sponsors)
**Timestamp:** 0:11 – 0:26 (15 seconds)
**What's on screen:**
- `slide_03.png` (3s) — "SandSync: Offline-first AI storytelling for Caribbean folklore"
- `slide_05.png` (4s) — Architecture diagram: Supabase → PowerSync → SQLite (browser + mobile)
- **NEW slide** (5s) — Tech stack logos row: PowerSync · Mastra · Supabase · TanStack Router + "fal.ai · ElevenLabs · Claude Sonnet"
- `slide_04.png` (3s) — "Built for: PowerSync AI Hackathon 2026"

**Narration (Sarah ElevenLabs):**
> SandSync is an offline-first AI storytelling platform — built for Caribbean folklore and the communities who carry it.
> Powered by PowerSync and Mastra, backed by Supabase, routed by TanStack.

**Recording source:** REUSE `v3_scene_a_composed.mp4` for first 2 slides. NEW RECORDING NEEDED: TanStack stack slide (new slide asset needed — Finn creates slide)
**VO source:** REUSE — `auto/vo/v3_scene_a_vo.mp3` (11.7s) covers the existing text; NEW VO NEEDED for replacement line that includes TanStack callout explicitly. See Section 4.
**Why this scene:** Clears all 4 bonus prize sponsor boxes + PowerSync usage framing upfront

---

### SCENE B — Stories Already Alive
**Timestamp:** 0:26 – 0:42 (16 seconds)
**What's on screen:** Live browser `sandsync.reddi.tech/showcase` — gallery of generated stories with FLUX-painted illustrations. Scrolls slowly to show multiple story cards (Anansi, Papa Bois, Soucouyant themes).
**Narration (Sarah ElevenLabs):**
> These stories already live here. Generated by our agents. Written in Caribbean dialect. Illustrated by fal.ai. Narrated in Jamaican English by ElevenLabs.
> Every one of them stored in local SQLite — not the cloud.

**Recording source:** REUSE — `auto/scenes/scene_b_raw.webm` (showcase gallery)
**VO source:** REUSE — `auto/vo/v3_scene_b_vo.mp3` (8.4s) is close; NEW VO NEEDED for new exact text with "local SQLite" callout at end. See Section 4.
**Why this scene:** Impact & usefulness (20%) — shows real output quality + local-first principle stated early

---

### SCENE C1 — It Lives in Your Browser
**Timestamp:** 0:42 – 0:52 (10 seconds)
**What's on screen:** Browser showing a story in the reader. URL: `sandsync.reddi.tech/stories/[id]`. Browser DevTools network panel visible but still online. Story text + illustration visible.
**Narration (Sarah ElevenLabs):**
> This story is in your browser's local SQLite right now. Not fetched from a server — it was synced here by PowerSync the moment it was created.

**Recording source:** REUSE — `auto/scenes/scene_c_raw.webm` (story reader) — use first 10s before offline toggle
**VO source:** REUSE — `auto/vo/v3_scene_c1_vo.mp3` (9.9s) ✅ exact match
**Why this scene:** PowerSync usage (15%) + Best Local-First — technical proof of local SQLite

---

### SCENE C2 — Gone Offline. Still Here.
**Timestamp:** 0:52 – 0:57 (5 seconds)
**What's on screen:** DevTools Network panel throttled to Offline. Story content stays fully visible — no spinner, no error. Battery icon drops from network bars to airplane icon briefly.
**Narration (Sarah ElevenLabs):**
> Still here. Network's gone — stories aren't. That's what PowerSync actually does.

**Recording source:** REUSE — `auto/scenes/scene_c_raw.webm` — use the offline toggle moment (~22s mark)
**VO source:** REUSE — `auto/vo/v3_scene_c2_vo.mp3` (5.2s) ✅ KEEP AS-IS — this line is perfect
**Why this scene:** Best Local-First ($500) — the core local-first principle in 5 seconds

---

### SCENE D — Five Agents. One Pipeline.
**Timestamp:** 0:57 – 1:07 (10 seconds)
**What's on screen:**
- `slide_04.png` (4s) — "The Pipeline: 5 Agents · Mastra Orchestration"
- `slide_07.png` (4s) — Mastra agent workflow diagram: Papa Bois → Anansi → Ogma → [Devi ‖ Imagen]
- 2s hold on diagram before cut to live pipeline

**Narration (Papa Bois / Takes voice):**
> Five agents. One living story.
> Papa Bois writes the brief. Anansi weaves the chapter. Ogma — the guardian — judges every word. Only a score of 7.5 or higher passes.
> Then Devi narrates, and Imagen paints — running in parallel.

**Recording source:** REUSE — `v3_scene_d_composed.mp4` (slides 4+7 already composed)
**VO source:** REUSE — `auto/vo/v3_scene_d_vo.mp3` (8.9s) covers "Five agents. One living story" — NEW VO NEEDED for extended version with the "7.5 or higher passes" detail. See Section 4.
**Why this scene:** Technical quality (25%) + Best Mastra — explains the 5-agent architecture with LLM-as-judge detail

---

### SCENE E — Watch It Run (Live Pipeline)
**Timestamp:** 1:07 – 1:51 (44 seconds)
**What's on screen:** Live browser `sandsync.reddi.tech/pipeline-demo`. Pipeline visualization: 5 nodes (Papa Bois, Anansi, Ogma, Devi, Imagen). "Run Pipeline" button pressed. Nodes light up in sequence. Progress bars, JSON output streaming. Real-time Mastra workflow.
> ⚠️ This is the live run — not a replay. Speed-up the 8–50s middle section at 2x per existing compose_v2.py logic.

**Narration (Anansi — multiple timed segments, using takes/03 and takes/04 voices):**

*At 0s (scene start):*
> Every thread I spin becomes a story. Watch.

*At 8s (Papa Bois node lit):*
> Mastra calls me forward. I reach into the folklore — Papa Bois, Soucouyant, La Diablesse — and I begin to weave.

*At 16s (Anansi writing, Ogma reviewing):*
> See the pipeline light up — node by node — each agent, alive. Ogma holds the thread tight. No weak word passes his eye.

*At 24s (Devi + Imagen fire in parallel):*
> fal.ai paints what I describe. Forest. Dark. Ancient.
> Devi speaks the words I spin. Running together — in parallel — because good stories don't wait for the last stroke.

*At 35s (pipeline completing):*
> Supabase holds the cloth. PowerSync keeps the loom running.
> And the trick? All of this — no signal needed.

**Recording source:** REUSE — `auto/scenes/scene_e_raw.webm` (89s pipeline footage — trimmed + 2x speed applied per compose_v2.py)
**VO source:** REUSE — existing `v3_scene_e_vo_0s/8s/16s/24s/35s.mp3` series + REUSE `takes/vo-scene-03-anansi.mp3` and `takes/vo-scene-04-anansi.mp3` for richer takes.
> **Finn's choice:** The `takes/` Anansi voices are more expressive (23s + 21s). If they fit the timing slots better than the auto-generated v3 clips, use those. Check playback timing against the composed pipeline visual.
**Why this scene:** Technical quality (25%) + Best Mastra — proves real-time agent orchestration with live footage

---

### SCENE F — The Finished Story
**Timestamp:** 1:51 – 2:01 (10 seconds)
**What's on screen:** Browser showing completed story — full chapter text (Caribbean dialect), FLUX-generated illustration, ElevenLabs audio waveform playing. The complete cultural artifact.
**Narration (Sarah ElevenLabs):**
> Complete story — written, judged, narrated, illustrated. Stored in Supabase Storage. Synced to every device through PowerSync.

**Recording source:** REUSE — `auto/scenes/scene_f_raw.webm` (completed story result)
**VO source:** REUSE — `auto/vo/v3_scene_f_vo.mp3` (5.9s) — "Complete story — written, judged, narrated, illustrated, synced..." — close enough; NEW VO NEEDED with "Supabase Storage" explicit callout. See Section 4.
**Why this scene:** Impact & usefulness (20%) + Best Supabase — Supabase Storage explicit, complete output quality proof

---

### SCENE G — THE WOW MOMENT: Cross-Device Sync
**Timestamp:** 2:01 – 2:22 (21 seconds)
**What's on screen:**
- **Split screen** (or side-by-side crop): Left = web browser `sandsync.reddi.tech`. Right = iPhone 17 Pro simulator showing SandSync mobile app.
- Left: "Generate Story" initiated for a NEW story. Pipeline running.
- Right: Mobile library shows **🟢 Live** badge. Story list updates in real-time — new card appears WITHOUT any tap or refresh.
- Hold on mobile screen showing the story card that just appeared.

**Narration (Nissan — HUMAN VOICE):**
> It was offline the whole time.
> The moment I reconnect —
> PowerSync pushes everything live.
> Just like that.

> ⚠️ **Timing note:** Nissan's voice overlaps the reconnect moment (mobile badge flips to 🟢, story appears). The "Just like that" line lands ON the moment the story card materialises on the phone.

> **Alternate framing if Nissan hasn't re-recorded:** Use this Sarah VO instead:
> "A story generated on the web. A phone that never asked. PowerSync synced it the moment it was created — no push notification, no refresh, no server call. It was always already there."

**Recording source:** **NEW RECORDING NEEDED** — split screen: web generation + iOS simulator live sync (see Section 3, Recording G)
**VO source:** REUSE — `takes/vo-scene-05-nissan-PLACEHOLDER.mp3` if Nissan has recorded Take 5; NEW VO NEEDED (Sarah) if not. See Section 4.
**Why this scene:** PowerSync usage (15%) — THIS IS THE HERO MOMENT. Cross-device real-time sync is the core PowerSync value proposition. Judges see it happening.

---

### SCENE H — Dead Zone Mode
**Timestamp:** 2:22 – 2:38 (16 seconds)
**What's on screen:**
- iPhone 17 Pro simulator. SandSync app open with story library.
- **Simulator > Hardware > Network > Airplane Mode** — badge flips 🟢 → 🔴 Offline
- Open a story — chapter text loads. Images load. Badge stays 🔴.
- Scroll through chapters. Everything works. No error states.

**Narration (Sarah ElevenLabs — NEW VO):**
> Imagine a parent who generated this story before the family road trip. Now they're in the dead zone. No signal. Kids want their story.
> Local SQLite has it all. PowerSync already synced it. The network can stay offline.

**Recording source:** **NEW RECORDING NEEDED** — iOS simulator, airplane mode toggle, story reader (see Section 3, Recording H)
**VO source:** NEW VO NEEDED — Sarah (ElevenLabs). See Section 4.
**Why this scene:** Best Local-First ($500) — "Kids in the Car" narrative makes offline-first tangible and human. Local-first isn't a technical detail, it's a promise to families.

---

### SCENE OUTRO — The Forest Remembers
**Timestamp:** 2:38 – 3:00 (22 seconds)
**What's on screen:**
- `slide_11.png` (4s) — "Built with: PowerSync · Mastra · Supabase · TanStack Router · fal.ai · ElevenLabs · Claude Sonnet"
- `slide_12.png` (4s) — Cultural mission: "Caribbean folklore belongs to the community. SandSync keeps it there."
- `outro_card.png` (5s) — "SandSync · Built on PowerSync · github.com/[repo] · sandsync.reddi.tech"
- Fade to black (1s)

**Narration (Papa Bois):**
> The forest always knew.
> Story told. Culture kept.
> With or without the world's permission.
> SandSync.

**Recording source:** REUSE — `v3_outro_composed.mp4` (slides 11+12 + outro card already composed)
**VO source:** REUSE — `takes/vo-scene-06-papa-bois.mp3` (11.6s) ✅ exact match for this script
**Why this scene:** Cultural mission close + Originality (30%) — opens and closes with Caribbean identity, memorable to judges

---

## 3. NEW RECORDINGS NEEDED

### Recording G — Cross-Device Sync (THE HERO SHOT)
**Device/surface:** Two windows simultaneously
- Left: Web browser at `https://sandsync.reddi.tech` (or localhost) — full width then cropped left half
- Right: iPhone 17 Pro simulator — SandSync mobile app, story library screen

**Exact actions to perform:**
1. Boot simulator (`xcrun simctl boot F5F6B51C-5F75-470C-9320-F267D8234144`)
2. Build + install mobile app (`expo run:ios` — budget 10-15 min build time)
3. Start Metro (`npx expo start --dev-client --port 8082`)
4. Open SandSync mobile app in simulator → confirm **🟢 Live** badge
5. Arrange windows: Browser left side of screen, Simulator right side
6. On web app: Navigate to story generation, click "Generate Story", select a Caribbean folklore theme
7. Let pipeline run (~60-90 seconds in real time — we'll use the Scene E footage for the pipeline itself)
8. **RECORD THIS SPECIFIC MOMENT:** The instant the new story card appears on the mobile screen without any user interaction
9. Hold on mobile screen for 5 seconds showing the appeared card
10. Total recording: ~25 seconds of the sync moment itself (not the full pipeline run)

**Duration target:** 20–25 seconds of usable footage
**What it proves:** Real-time bidirectional PowerSync sync — web generates, mobile receives instantly. This is the core PowerSync value proposition made visual.
**Output file:** `auto/scenes/scene_g_sync_raw.webm` (or .mp4)

> **Recording tip:** Position QuickTime or ffmpeg screen capture to show both windows in one frame. Alternatively record separately and composite side-by-side in Finn's compositor.

---

### Recording H — Dead Zone / Airplane Mode
**Device/surface:** iPhone 17 Pro simulator (UUID: F5F6B51C)
**Prerequisite:** Mobile app installed and running from Recording G. Stories already synced.

**Exact actions to perform:**
1. Open SandSync mobile app — story library visible, **🟢 Live** badge showing
2. Open one of the synced stories (tap story card)
3. **Enable Airplane Mode:** Simulator > Hardware > Network > Enable Airplane Mode  
   (Or: Hardware menu > Network > Airplane Mode checkbox)
4. Watch the **🟢 Live → 🔴 Offline** badge transition — hold on it for 2 seconds
5. Scroll through the story chapters — text loads, images load (cached via expo-image)
6. Return to story library — tap another story — it also loads
7. Back to story library showing multiple stories, all accessible, badge still 🔴
8. Hold on 🔴 Offline badge + loaded story content for final 3 seconds

**Duration target:** 15–18 seconds of usable footage
**What it proves:** Local-first offline capability. SQLite cache is the primary data source, not the network. This is the local-first essay (inkandswitch.com) made tangible.
**Output file:** `auto/scenes/scene_h_offline_raw.webm`

---

### Recording A_new — TanStack Slide (Slide Asset)
**Device/surface:** Not a screen recording — a NEW SLIDE IMAGE needed
**What Finn needs to create:** A slide_XX.png showing the tech stack with TanStack Router explicitly named
**Design:**
```
SandSync — Tech Stack

PowerSync    Mastra    Supabase    TanStack Router
fal.ai FLUX  ElevenLabs  Claude Sonnet  Fly.io
```
**Note:** TanStack Router is the differentiator for the TanStack bonus prize. It must be on screen, not just in narration, to count as "explicit" for judging. The existing architecture slides (slide_03, slide_05) don't mention TanStack at all.
**Output file:** `auto/slides/slide_tanstack.png`

---

## 4. NEW VO NEEDED

### VO-G1 — Scene A: Stack callout with TanStack
**Script (word for word):**
> SandSync is an offline-first AI storytelling platform for Caribbean folklore. Built on PowerSync and Mastra, backed by Supabase, routed by TanStack Router.

**Duration estimate:** ~8 seconds
**Scene:** A (0:11–0:26)
**Voice:** Sarah (ElevenLabs, ID: `EXAVITQu4vr4xnSDxMaL`, model: `eleven_turbo_v2_5`)
**Why Sarah not Nissan:** This is the factual setup narration — Sarah's neutral authority tone works here. Nissan's voice is reserved for the authentic human-witness moments (Scenes G/H).
**Output file:** `auto/vo/v4_scene_a_vo.mp3`
**Replaces:** `v3_scene_a_vo.mp3`

---

### VO-G2 — Scene B: Gallery with local SQLite callout
**Script (word for word):**
> These stories already live here. Generated by our agents, written in Caribbean dialect, illustrated by fal.ai, narrated in Jamaican English by ElevenLabs. Every one stored in local SQLite — not the cloud.

**Duration estimate:** ~10 seconds
**Scene:** B (0:26–0:42)
**Voice:** Sarah (ElevenLabs)
**Output file:** `auto/vo/v4_scene_b_vo.mp3`
**Replaces:** `v3_scene_b_vo.mp3`

---

### VO-G3 — Scene D: Five agents with LLM-as-judge detail
**Script (word for word):**
> Five agents. One living story. Papa Bois writes the creative brief. Anansi weaves the chapter in Caribbean dialect. Ogma — the language guardian — judges every word. Only a score of seven-point-five or higher passes. Then Devi narrates, and Imagen paints — running in parallel. Orchestrated entirely by Mastra.

**Duration estimate:** ~14 seconds
**Scene:** D (0:57–1:07)
**Voice:** Sarah (ElevenLabs)
**Output file:** `auto/vo/v4_scene_d_vo.mp3`
**Replaces:** `v3_scene_d_vo.mp3`

---

### VO-G4 — Scene F: Result with Supabase Storage callout
**Script (word for word):**
> Complete story — written, judged, narrated, illustrated. The audio lives in Supabase Storage. The text and metadata synced through PowerSync to every device.

**Duration estimate:** ~8 seconds
**Scene:** F (1:51–2:01)
**Voice:** Sarah (ElevenLabs)
**Output file:** `auto/vo/v4_scene_f_vo.mp3`
**Replaces:** `v3_scene_f_vo.mp3`

---

### VO-G5 — Scene G: Cross-device sync (if Nissan can't record)
**Script (word for word):**
> A story generated on the web. A phone that never asked. PowerSync synced it the moment it was created. No push notification. No refresh. No server call. It was already there.

**Duration estimate:** ~12 seconds
**Scene:** G (2:01–2:22)
**Voice:** Sarah (ElevenLabs) — ONLY if Nissan's Take 5 recording is unavailable
**Output file:** `auto/vo/v4_scene_g_vo_fallback.mp3`
**Note:** Nissan's human voice is strongly preferred here. Use `takes/vo-scene-05-nissan-PLACEHOLDER.mp3` if it has been recorded. The authentic Caribbean human witness voice is a differentiator judges will notice.

---

### VO-G6 — Scene H: Dead Zone narrative (NEW)
**Script (word for word):**
> Imagine a parent who generated this story before the family road trip. Now they're in the dead zone. No signal. Kids want their story. Local SQLite has it all. PowerSync already synced it. The network can stay offline.

**Duration estimate:** ~13 seconds
**Scene:** H (2:22–2:38)
**Voice:** Sarah (ElevenLabs)
**Output file:** `auto/vo/v4_scene_h_vo.mp3`

---

## 5. REUSE MAP

| Existing Asset | New Scene ID | How Used | Trim Notes |
|---------------|-------------|----------|------------|
| `takes/vo-scene-01-papa-bois.mp3` (10.4s) | INTRO | Papa Bois: "Some stories cannot wait..." | Full use |
| `auto/scenes/scene_b_raw.webm` | B | Showcase gallery | Use 0–16s |
| `auto/scenes/scene_c_raw.webm` | C1 | Story reader (online state) | Use 0–10s |
| `auto/scenes/scene_c_raw.webm` | C2 | Offline toggle moment | Use ~22s mark, 5s |
| `auto/vo/v3_scene_c1_vo.mp3` (9.9s) | C1 | ✅ REUSE AS-IS | Full use |
| `auto/vo/v3_scene_c2_vo.mp3` (5.2s) | C2 | ✅ REUSE AS-IS — perfect line | Full use |
| `auto/scenes/scene_e_raw.webm` | E | Live pipeline footage | 0–89s with 2x speedup 8–50s per compose_v2.py |
| `auto/vo/v3_scene_e_vo_0s.mp3` | E @0s | Pipeline VO timing | Full use |
| `auto/vo/v3_scene_e_vo_8s.mp3` | E @8s | Pipeline VO timing | Full use |
| `auto/vo/v3_scene_e_vo_16s.mp3` | E @16s | Pipeline VO timing | Full use |
| `auto/vo/v3_scene_e_vo_24s.mp3` | E @24s | Pipeline VO timing | Full use |
| `auto/vo/v3_scene_e_vo_35s.mp3` | E @35s | Pipeline VO timing | Full use |
| `auto/scenes/scene_f_raw.webm` | F | Completed story | Use 0–10s |
| `auto/scenes/v3_outro_composed.mp4` | OUTRO | Slides 11+12 + outro card | Full use |
| `takes/vo-scene-06-papa-bois.mp3` (11.6s) | OUTRO | Papa Bois: "The forest always knew..." | Full use |
| `auto/slides/slide_01.png` | INTRO | Title card | As slide (3s) |
| `auto/slides/slide_02.png` | INTRO | Tagline | As slide (3s) |
| `auto/slides/slide_03.png` | A | App description | As slide (3s) |
| `auto/slides/slide_05.png` | A | Architecture diagram | As slide (4s) |
| `auto/slides/slide_04.png` | D | Pipeline title | As slide (4s) |
| `auto/slides/slide_07.png` | D | Mastra agent diagram | As slide (4s) |
| `auto/slides/slide_11.png` | OUTRO | Tech stack credits | As slide (4s) |
| `auto/slides/slide_12.png` | OUTRO | Cultural mission close | As slide (4s) |
| `auto/outro_card.png` | OUTRO | Final CTA card | As slide (5s) |

**Assets from `takes/` to consider using over `auto/vo/`:**
- `takes/vo-scene-03-anansi.mp3` (23s) — richer Anansi voice for Scene E (vs v3_scene_e VO clips)
- `takes/vo-scene-04-anansi.mp3` (21s) — Anansi scene 4 for Scene E later segments
- These are more expressive performances — Finn should A/B test against the timed v3 clips

---

## 6. PRODUCTION NOTES FOR FINN

### Timing Sheet (V4 cut)

| Scene | Duration | VO Duration | Source |
|-------|----------|-------------|--------|
| INTRO | 11s | 10.4s (Papa Bois) | REUSE |
| A | 15s | 8s (Sarah NEW) | PARTIAL NEW |
| B | 16s | 10s (Sarah NEW) | NEW VO |
| C1 | 10s | 9.9s (Sarah REUSE) | FULL REUSE |
| C2 | 5s | 5.2s (Sarah REUSE) | FULL REUSE |
| D | 10s | 14s (Sarah NEW) | NEW VO |
| E | 44s | timed multi-VO | REUSE existing timed clips |
| F | 10s | 8s (Sarah NEW) | NEW VO |
| G | 21s | ~12s (Nissan/Sarah) | NEW RECORDING + NEW VO |
| H | 16s | 13s (Sarah NEW) | NEW RECORDING + NEW VO |
| OUTRO | 22s | 11.6s (Papa Bois REUSE) | REUSE |
| **TOTAL** | **~180s (3:00)** | | |

---

### compose_v2.py Changes for V4

The V4 script adds two new scene functions to compose_v2.py. Finn needs to:

1. **Add `compose_scene_g()` function:**
   - Input: `auto/scenes/scene_g_sync_raw.webm` (new recording)
   - Add VO: `auto/vo/v4_scene_g_vo.mp3` (or Nissan's take if available)
   - Output: `auto/scenes/v4_scene_g_composed.mp4`

2. **Add `compose_scene_h()` function:**
   - Input: `auto/scenes/scene_h_offline_raw.webm` (new recording)
   - Add VO: `auto/vo/v4_scene_h_vo.mp3`
   - Output: `auto/scenes/v4_scene_h_composed.mp4`

3. **Update `scene_order` in `main()`:**
   ```python
   scene_order = ["intro", "a", "b", "c", "d", "e", "f", "g", "h", "outro"]
   ```

4. **Add `segment_paths` entries for g and h:**
   ```python
   "g": os.path.join(SCENES_DIR, "v4_scene_g_composed.mp4"),
   "h": os.path.join(SCENES_DIR, "v4_scene_h_composed.mp4"),
   ```

5. **Update `FINAL_OUTPUT`** to `demo-final-v5.mp4`

6. **Scene A — add TanStack slide:**
   - Add `slide_tanstack.png` between slide_05.png and slide_04.png in `compose_scene_a()`
   - New slide duration: 5 seconds
   - Replace `v3_scene_a_vo.mp3` with `v4_scene_a_vo.mp3`

---

### Side-by-Side Compositor for Scene G

Scene G needs a split-screen showing web browser (left) and iOS simulator (right). Two approaches:

**Option A — Two separate recordings, composited:**
```bash
# Left half: crop browser recording to left 50%
ffmpeg -i scene_g_web_raw.webm -vf "crop=iw/2:ih:0:0" scene_g_web_left.mp4

# Right half: crop simulator recording to right 50%  
ffmpeg -i scene_g_mobile_raw.webm -vf "scale=720:900,pad=720:900" scene_g_mobile_right.mp4

# Stack side by side
ffmpeg -i scene_g_web_left.mp4 -i scene_g_mobile_right.mp4 \
  -filter_complex "[0:v][1:v]hstack=inputs=2" \
  -c:v libx264 -crf 18 scene_g_split.mp4
```

**Option B — Single screen recording:** Record both windows on same screen using QuickTime screen capture with both visible, then crop the relevant region.

---

### VO Generation Commands

All new VO files use ElevenLabs Sarah voice:
- **Voice ID:** `EXAVITQu4vr4xnSDxMaL`
- **Model:** `eleven_turbo_v2_5`
- **Script:** Use `auto/gen_vo_v3_patch.py` or `auto/generate_vo_v2.py` — modify the text strings for V4

```bash
# Example — adapt the existing generate_vo_v2.py to generate V4 files
# Or call ElevenLabs API directly via the existing generate_vo.py pattern
cd /Users/loki/projects/sandsync/demo-video/auto
python3 generate_vo_v2.py  # Finn should adapt for V4 VO texts
```

> ⚠️ **ElevenLabs quota note** (from ASSET-INVENTORY.md): Primary key may be at quota. Use secondary key: `op://OpenClaw/ElevenLabs Secondary API Credentials/credential`

---

### Audio Mixing Notes

- **Scene E:** 5 timed VO clips are mixed in compose_v2.py's `compose_scene_e()` already. Do NOT regenerate these unless the timed slots shift.
- **Scene C:** `compose_scene_c()` already mixes c1 at 500ms and c2 at 22000ms. No change needed.
- **Scene G:** Single VO track, start at 500ms delay (matches existing pattern).
- **Scene H:** Single VO track, start at 800ms delay (brief visual pause before narration).

---

### Sync Badge Close-Up Tip (Scene G/H)

The SyncBadge component in the iOS simulator may appear small in full-screen recording. Consider asking Finn to add a short **zoom-in** on the badge using ffmpeg `zoompan` filter for the 🟢→🔴 transition moment:

```bash
# Zoom in on badge during transition (top-right quadrant of mobile screen)
ffmpeg -i scene_h_raw.mp4 \
  -vf "zoompan=z='if(between(t,2,4),1.8,1)':x='iw*0.6':y='0':d=1:s=720x900" \
  scene_h_badge_zoom.mp4
```

---

### What Judges Will Experience (Scene-by-Scene UX)

1. **INTRO:** They hear Papa Bois say "some stories cannot wait for a signal" — they're intrigued. Caribbean voice, unusual hook.
2. **A:** They see all the sponsor logos they're judging for. Instant recognition — this team did their homework.
3. **B:** Beautiful outputs. They see real quality from real AI agents. They believe this works.
4. **C1+C2:** They see the offline proof in browser. "Still here. Network's gone — stories aren't." Clear. Memorable.
5. **D+E:** They watch the pipeline light up in real time. Five agents. Mastra orchestration visualized. LLM-as-judge shown. Technical credibility.
6. **F:** Complete output. All pieces: text + image + audio. Clean result.
7. **G:** 🔑 PIVOT — suddenly a PHONE appears. The story they just saw generated on the web is now on the phone. Without any tap. They say "oh shit." This is PowerSync.
8. **H:** Airplane mode. 🔴 Offline. Story still reads. They understand local-first now. They feel it.
9. **OUTRO:** Papa Bois returns. "The forest always knew." Cultural gravity. Built on PowerSync.

**Total: ~3 minutes that earns all five scoring criteria and hits all four bonus prizes.**

---

*Script V4 — Sara · 2026-03-17 · Deep planning session for PowerSync AI Hackathon 2026*
*Three days to submission. Make every second earn its place.*
