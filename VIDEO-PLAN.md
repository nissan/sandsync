# SandSync Demo Video — Submission Plan
_Created: 2026-03-18 by Loki_
_Deadline: March 20, 2026 @ 11:59 PM PT (HARD)_

---

## Context

The current draft `sandsync-demo-DRAFT-v4.mp4` is 2:54 (174s) and was composed by Finn overnight (2026-03-17). It has 5 new ElevenLabs VO segments and a complete scene structure — but the core PowerSync sync demo (Scene G) and offline demo (Scene H) are PLACEHOLDERS.

The demo MUST show:
1. **pipeline-demo page** — nodes lighting up as a story generates
2. **Completed story** on the web app
3. **iOS simulator** — the story appearing after sync (the "it just appeared" moment)
4. **Offline playback** — airplane mode on the simulator, story still plays

Without 3 and 4, the submission does not demonstrate PowerSync's value proposition and will not score well on the core judging criteria.

---

## Blocker Status

### 🔴 PowerSync Sync Rules — NOT DEPLOYED
- `supabase/powersync.yaml` exists locally but has never been uploaded to the PowerSync dashboard
- Sync stream returns `{"checkpoint":{"buckets":[]}}` — zero data flows to mobile
- **Nissan must:** Log in to powersync.journeyapps.com → instance `69ae074bd42a43395100b01b` → Sync Rules → paste + deploy `supabase/powersync.yaml`
- Without this: no sync, no Scene G

### 🔴 PowerSync Dev Token — EXPIRED
- Token generated 2026-03-17 expires within ~24h
- Generate fresh token:
```bash
PS_ADMIN_TOKEN=$(op read "op://OpenClaw/PowerSync Personal Access Token/credential") \
npx powersync generate token --subject openclaw \
  --project-id 69ae074a80997e00088a7f70 \
  --instance-id 69ae074bd42a43395100b01b
```
- Store result in `POWERSYNC_TOKEN` env var in `.env.local`

---

## What Nissan Must Record

### CRITICAL — Recording 1: Pipeline → Sync (Scene G replacement, ~60–90s)
1. Open `sandsync.reddi.tech/pipeline-demo` in browser LEFT half of screen
2. Open Xcode Simulator (iPhone 17 Pro) on RIGHT half — Metro must be running (`bun run start` in mobile dir)
3. Start QuickTime screen recording (whole screen)
4. Trigger a new story on the pipeline page — watch nodes light up
5. Wait for "Story Published" node to go green — the story card should appear in the simulator
6. Show the card in the simulator — tap it, show it loading the story
7. Stop recording
- **Deliver as:** `demo-video/takes/nissan/scene_g_screen.mp4`
- **Target:** 60–90 seconds (Finn will cut the best 25–30s)

### CRITICAL — Recording 2: Offline Playback (Scene H replacement, ~30s)
1. In the iOS simulator, open the story that just synced
2. Let the audio play for a few seconds
3. Toggle airplane mode: Hardware menu → Network → Disable Connection (or Shift+Cmd+H then Settings → Airplane mode)
4. Show the story still playing — audio, text, everything working offline
5. Show the PowerSync offline badge in the app (top of app should show "Offline" or similar)
6. Stop recording
- **Deliver as:** `demo-video/takes/nissan/scene_h_offline.mp4`
- **Target:** 30–40 seconds

### CRITICAL — Recording 3: Scene G Voice (~8s)
Say, naturally:
> "It was offline the whole time. The moment I reconnect — PowerSync pushes everything live. Just like that."

- **Deliver as:** `demo-video/takes/nissan/scene_g_nissan_voice.m4a` or `.mp3`
- Phone voice memo or MacBook mic is fine
- Find a quiet room — no HVAC, no keyboard clicks

---

## Sponsor Callouts — Must Be Explicit in Video

The video MUST verbally or visually call out each sponsor while showing their product in use. Judges score on this.

| Sponsor | What to Show | Current Status |
|---|---|---|
| **PowerSync** | The sync moment + offline badge | ❌ Not captured — Scene G is placeholder |
| **Mastra** | Pipeline viz showing Mastra workflow card | ✅ Scene E has pipeline with Mastra callout |
| **Supabase** | Pipeline viz showing Supabase card + story persistence | ✅ Scene E covers this |
| **ElevenLabs** | Audio playing in the story reader | ✅ Scene C has audio |
| **TanStack** | TanStack slide + VO callout | ✅ Scene A has TanStack slide |
| **fal.ai** | Chapter illustration loading | ✅ Scene C shows illustrations |

PowerSync is the ONLY critical gap. Everything else is covered.

---

## Agent Actions (after Nissan records)

Once recordings are dropped in `demo-video/takes/nissan/`, Finn should:

1. **Inspect recordings** — extract frames, confirm sync moment is visible and offline demo is clear
2. **Recompose Scene G** — replace desktop capture with Nissan's screen recording, swap in Nissan's voice
3. **Recompose Scene H** — replace illustrated frames with real airplane mode recording
4. **Rebuild final** — run `compose_v4.py` with new scenes, output `sandsync-demo-FINAL.mp4`
5. **QA** — check audio levels, hum detection, scene transitions, total length

---

## Submission Platform & Requirements (Archie research — 2026-03-18)

**NOT Devpost** — submission is via Typeform:
- **Submit here:** https://form.typeform.com/to/YR9U17Sn
- **Rules page:** https://www.powersync.com/blog/powersync-ai-hackathon-8k-in-prizes
- **Deadline confirmed:** March 20, 2026 @ 11:59 PM PT ✅

### Required submission fields
| Field | Status |
|---|---|
| Project name | Ready |
| Short description | Ready (SUBMISSION_WRITEUP.md) |
| Team member names | Nissan |
| Contact email | Nissan |
| Public source repo | ✅ github.com/reddinft/sandsync |
| Prize categories selected | Must tick in form — confirm all that apply |
| Demo video and/or live demo URL | "Highly recommended" — treat as required |
| Architecture summary (for bonus prizes) | Must be written — each sponsor must be named explicitly |

### Judging Criteria (weights)
| Criterion | Weight | Our status |
|---|---|---|
| **Originality** | **30%** | ✅ Strong — Caribbean folklore AI is genuinely novel |
| **Technical implementation** | **25%** | ✅ Strong — Mastra workflow, multi-agent, LLM-as-judge |
| **Impact and usefulness** | **20%** | ✅ Good — offline-first storytelling for low-connectivity regions |
| **PowerSync usage** | **15%** | 🔴 Weak until sync actually works — also the #1 tiebreaker |
| **Product and UX quality** | **10%** | ✅ Good — polished pipeline-demo page |

**Tie-breaker:** PowerSync usage score → Impact score → Judge panel vote

### Video guidance
- No explicit length limit — 2–5 min is standard hackathon practice
- Show PowerSync Sync Streams functionality explicitly (scored + tiebreaker)
- Judges will spot fake/non-functional demos — disqualification risk
- PowerSync + partner judges will use the demo clip for promotion

### Bonus prize categories to select in form
| Category | Prize | Sponsor callout required in architecture summary |
|---|---|---|
| Best Local-First | $500 cash | Local-first principles (Ink & Switch) |
| Best Submission Using Supabase | $1,000 credits | How Supabase is used architecturally |
| Best Submission Using Mastra | $500 Amazon gift card | How Mastra agents/workflows are used |
| Best Submission Using TanStack | Office hour with Tanner Linsley | TanStack Router usage |

**Note:** Neon and Cactus bonus tracks not applicable (we're using Supabase, not Neon; no Cactus integration).

### Architecture Summary — required sponsor callouts
Must explicitly describe each sponsor in submission form:
- **PowerSync** — Sync Streams powering cross-device sync + offline reads via local SQLite
- **Mastra** — `createWorkflow` + `createStep` orchestrating 5-agent pipeline (Papa Bois → Anansi ↔ Ogma → Devi → publish), LLM-as-judge revision loop
- **Supabase** — story/chapter persistence, realtime events broadcast, Storage buckets for audio/images
- **TanStack Router** — `createFileRoute` on every page, `createRootRoute`, type-safe routing throughout web app
- **ElevenLabs** — Devi agent TTS narration for every story chapter
- **fal.ai** — FLUX image generation for chapter illustrations

---

## Submission Checklist

- [ ] PowerSync sync rules deployed to dashboard (Nissan)
- [ ] Fresh dev token generated (Loki can do this)
- [ ] Scene G screen recording captured (Nissan)
- [ ] Scene H offline recording captured (Nissan)
- [ ] Scene G voice recorded (Nissan)
- [ ] Finn composes final video
- [ ] Finn QA pass — audio hum, levels, length
- [ ] Archie's judging criteria incorporated into VO/script if needed
- [ ] Submission writeup written (Loki)
- [ ] GitHub repo confirmed public with good README
- [ ] Video uploaded (YouTube / Vimeo?)
- [ ] Devpost submission form filled (Nissan)
- [ ] Submit before March 20 11:59 PM PT

---

## File Locations

| File | Location |
|---|---|
| Current draft | `~/projects/sandsync/demo-video/sandsync-demo-DRAFT-v4.mp4` |
| Composer script | `~/projects/sandsync/demo-video/auto/compose_v4.py` |
| Nissan recordings drop zone | `~/projects/sandsync/demo-video/takes/nissan/` |
| PowerSync sync rules | `~/projects/sandsync/supabase/powersync.yaml` |
| Video script | `~/projects/sandsync/demo-video/SCRIPT_V4.md` |
| Nissan recording queue | `~/projects/sandsync/demo-video/NISSAN-RECORDING-QUEUE.md` |
| Video assessment | `~/projects/sandsync/VIDEO-ASSESSMENT.md` (Finn generating now) |
| Submission writeup | `~/projects/sandsync/SUBMISSION_WRITEUP.md` |

---

_Updated by Loki: 2026-03-18 08:15 AEST_
