# SandSync — PowerSync AI Hackathon 2026 · Submission Draft

> **Prepared by Sara (OpenClaw docs agent) · 2026-03-19**
> **Deadline: Friday, March 20, 2026 · 11:59 PM PT (Saturday, March 21 · 6:59 PM AEDT)**

---

## ✅ SUBMIT CHECKLIST

### What to copy-paste from this file
- [ ] **Project Name** → Section 1
- [ ] **Short Description** (~150 words) → Section 2
- [ ] **Long Description** (~500 words) → Section 3
- [ ] **Team / Builder info** → Section 4
- [ ] **GitHub URL** → Section 5
- [ ] **Live Demo URL** → Section 6
- [ ] **Demo Video URL** → Section 7 *(add after upload — see note below)*
- [ ] **Prize categories** → Section 8
- [ ] **Architecture / Tech Stack** → Section 9
- [ ] **Sponsor integrations** → Section 10

### What Nissan must do manually
1. **Upload demo video** — `apps/web/demo-video/presentation/sandsync-presentation-v2.mp4` (3:18 min)
   - Upload to YouTube (unlisted) **or** Loom
   - Paste the public URL into the form's video field (and update Section 7 below)
2. **Confirm GitHub repo is public** — https://github.com/reddinft/sandsync
3. **Submit the form** at https://form.typeform.com/to/YR9U17Sn before the deadline
4. **Screenshot the confirmation email** (arrives at nissan@reddi.tech)

---

## FORM FIELDS — READY TO COPY-PASTE

---

## 1. Project Name

```
SandSync
```

---

## 2. Tagline / Short Description (≤150 words)

```
SandSync is an offline-first AI storytelling platform powered by Caribbean folklore.

Five mythological spirits — implemented as real AI agents — collaborate to write, narrate, and illustrate living stories. Papa Bois orchestrates the pipeline. Anansi (Claude Sonnet 4.5) writes chapters in authentic Caribbean dialect. Ogma (Groq Llama) quality-judges every draft and rejects below 7.5/10 — Anansi revises until it passes. Devi (ElevenLabs) narrates with a Trinidad voice. Imagen (fal.ai FLUX Schnell) paints each chapter as a watercolour illustration.

Every story is synced from Supabase Postgres → PowerSync Service → local SQLite in the browser. Stories are readable, listenable, and fully navigable — offline — without a network connection.

PowerSync is the foundation, not an afterthought. Local SQLite is the primary data layer.
```

---

## 3. Long Description / Project Overview (~500 words)

```
SandSync: Caribbean Folklore, Told by AI, Synced Everywhere

The offline-first constraint is not a feature. It is the architecture.

SandSync exists because every AI storytelling tool on the market breaks the moment connectivity drops — and Caribbean, West African, and Indigenous oral traditions are disproportionately affected. The communities these stories belong to often have the worst connectivity. SandSync is built for them. Offline-first by design. Powered by PowerSync.

HOW POWERSYNC MAKES IT WORK

When a story is generated, the Mastra pipeline writes completed chapters to Supabase Postgres. PowerSync Sync Streams immediately replicate those rows to every connected client's local SQLite database — in real time, without polling. The browser reads from local SQLite first. There is no network round-trip for story reads.

When the user loses connectivity:
- All previously synced stories remain fully readable, with illustrations and audio playback intact
- The real-time sync indicator (⚡ synced / ○ offline) in the nav reflects the true connection state
- On reconnect, PowerSync reconciles and delivers any missed updates automatically

Both platforms are fully covered: @powersync/web (WebAssembly SQLite in the browser) and @powersync/react-native (mobile, via Expo). The PowerSync sync schema maps stories, chapters, audio URLs, and image URLs — everything a story needs to live offline.

THE FIVE AGENTS

SandSync's AI pipeline is not a single model call. It is a five-agent system orchestrated by Mastra, with a feedback loop that enforces cultural quality before any chapter reaches the reader:

1. Papa Bois (orchestrator) — Trinidad's forest guardian. Receives the user's prompt, produces a structured story brief: title, genre, mood, protagonist, folklore elements, chapter count. Routes to Anansi.

2. Anansi (storyteller, Claude Sonnet 4.5) — West African/Caribbean spider deity, keeper of all stories. Writes each chapter in authentic Caribbean dialect, incorporating folklore archetypes and Creole idiom.

3. Ogma (quality judge, Groq Llama) — Celtic god of eloquent speech. Acts as LLM-as-judge. Scores drafts 0–10 across narrative quality, cultural authenticity, dialect consistency, and folklore accuracy. Rejects below 7.5 with structured feedback bullets fed back to Anansi for targeted revision. Maximum 3 attempts.

4. Devi (narrator, ElevenLabs TTS) — Generates audio narration per chapter, uploaded to Supabase Storage, synced to clients via PowerSync.

5. Imagen (illustrator, fal.ai FLUX Schnell) — Generates Caribbean watercolour scenes per chapter, uploaded to Supabase Storage, synced alongside audio.

Devi and Imagen run in parallel after Ogma approves — the full story is ready to read, hear, and see.

THE CULTURAL CASE

The agents are not themed. They are the culture. Papa Bois protects and routes because that is what the forest guardian does. Anansi weaves stories because that is his mythological function. This is not decoration — the mythology informed the technical architecture.

Nissan Dookeran is Trinidad-heritage. This is not appropriation. It is preservation by the community it belongs to.

TECH STACK AT A GLANCE

PowerSync · Supabase (Postgres + Storage + RLS) · Mastra (workflow orchestration) · Claude Sonnet 4.5 · Groq Llama · ElevenLabs TTS · fal.ai FLUX Schnell · React 19 + TanStack Router · Expo React Native · Fly.io
```

---

## 4. Team / Builder

**Name:**
```
Nissan Dookeran
```

**Email:**
```
nissan@reddi.tech
```

**Organisation (if asked):**
```
Redditech Pty Ltd · Sydney, Australia
```

**Solo or team:**
```
Solo project
```

---

## 5. GitHub / Source Repository

```
https://github.com/reddinft/sandsync
```

The repository is public and contains:
- Full source for the frontend (`apps/web/`) and API (`apps/api/`)
- `README.md` with architecture overview, agent descriptions, tech stack, and local setup instructions
- `ARCHITECTURE.md` with full data flow diagram, offline scenario walkthrough, and RLS policy documentation
- Mastra workflow definitions in `apps/api/src/mastra/`
- PowerSync schema configuration in `packages/powersync/`

---

## 6. Live Demo URL

**Primary:**
```
https://sandsync.reddi.tech
```

**Key pages:**
```
Pipeline Demo: https://sandsync.reddi.tech/pipeline-demo
Story Showcase: https://sandsync.reddi.tech/showcase
Slide Deck: https://sandsync.reddi.tech/slides
API health: https://sandsync-api.fly.dev/health
```

*Pipeline Demo is the fastest path to judging: type a prompt, watch all five agents work live, see PowerSync sync indicator, hear audio narration, view generated illustrations.*

---

## 7. Demo Video URL

> ⚠️ **NISSAN: Upload `sandsync-presentation-v2.mp4` (3:18 min) to YouTube (unlisted) or Loom, then paste the URL here and into the form.**
> File location: `apps/web/demo-video/presentation/sandsync-presentation-v2.mp4`

**Video URL (add after upload):**
```
[PASTE URL HERE AFTER UPLOAD]
```

**What the video covers (3:18):**
- Cultural mission and the offline-first problem
- Story showcase and reader (with audio + illustrations)
- Offline demo — Chrome DevTools → network offline → story still loads and plays
- Live pipeline generation — all 5 agents visible in real time
- PowerSync sync indicator showing live sync state
- Sponsor tech stack callout

---

## 8. Prize Categories (check all that apply)

```
[x] Main prize — Best Use of PowerSync AI
[x] Best Local-First Submission ($500 cash)
[x] Best Submission Using Supabase ($1,000 credits)
[x] Best Submission Using Mastra ($500 Amazon gift card)
[x] Best Submission Using TanStack (1:1 with Tanner Linsley + swag)
```

---

## 9. Architecture Description

```
SandSync Sync Architecture

[Client — React 19 + TanStack Router]
    │
    ▼
[PowerSync Web SDK — WebAssembly SQLite]
    │  reads from local SQLite first (no network hop)
    │  writes queue locally
    ▲
    │  PowerSync Sync Streams (real-time replication)
    │
[PowerSync Service]
    │
    ▼
[Supabase Postgres — source of truth]
    │ stories · story_chapters · agent_events
    │ Supabase Storage → audio URLs + image URLs synced as columns

Data flow on story generation:
1. User submits prompt → POST /stories to Mastra API (Fly.io)
2. Papa Bois creates story brief → writes stories row (status=queued) to Supabase
3. Anansi writes chapter → Ogma reviews/rejects/approves → chapter row written to Supabase
4. Devi generates audio → uploads to Supabase Storage → audio_url column updated
5. Imagen generates illustration → uploads to Supabase Storage → image_url column updated
6. PowerSync Sync Streams deliver all rows to every client's local SQLite in real time
7. Client reads from local SQLite → instant render, no network dependency

Offline scenario:
- User goes offline → PowerSync SDK continues serving reads from local SQLite
- Stories (text, audio, images) fully available from local cache
- Sync indicator changes to ○ offline state
- On reconnect → PowerSync reconciles, delivers any missed updates automatically
```

---

## 10. Sponsor Integrations (if asked separately)

### PowerSync
```
SandSync uses @powersync/web (WebAssembly SQLite in the browser) and @powersync/react-native (Expo mobile). The PowerSync schema syncs stories, story_chapters, audio URLs, and image URLs from Supabase Postgres to local SQLite on every connected device. PowerSync Sync Streams deliver completed chapters to clients in real time as the Mastra pipeline writes them to Supabase. The local SQLite database is the primary read layer — not a cache. Removing PowerSync would make SandSync a standard web app that breaks offline. It is architectural.
```

### Supabase
```
Supabase serves as the cloud source of truth for all story data. Postgres stores stories, chapters, and agent events. Supabase Storage hosts generated audio files (ElevenLabs .mp3) and illustrations (fal.ai .png), with CDN URLs synced back into the chapters table. Row-Level Security policies enforce per-user story access. Supabase Auth provides user sessions. The promo code POWERSYNC-DEW6-3JUM-16A8-JA2G has been applied.
```

### Mastra
```
SandSync uses Mastra's createWorkflow() with typed Zod steps to orchestrate the five-agent pipeline. The Papa Bois → Anansi ↔ Ogma (revision loop) → Devi + Imagen (parallel) flow is a genuine Mastra workflow — not a sequential call chain. Ogma's rejection triggers structured feedback that is fed back into Anansi's next step input. Agent events (start, complete, ogma_review, fal_images, failed) are persisted to Supabase and streamed to the real-time debug panel in the frontend.
```

### TanStack
```
SandSync uses @tanstack/react-router v1.166 with the Vite file-based plugin. All routes are type-safe: /stories/$id uses a typed $id param with no casting. The pipeline demo page, showcase, story reader, and slide deck are all TanStack Router routes. Route-level data loading is handled via TanStack's loader pattern.
```

---

## 11. Anything Else / Additional Context (if form has an open field)

```
SandSync was built solo in approximately three weeks — from architecture to live deployment — by Nissan Dookeran (Redditech Pty Ltd, Sydney). The project is named for the sync-first philosophy: SandSync = sandman (the storyteller's companion) + sync.

The cultural framing is not a theme. Trinidad and Tobago has a living Papa Bois tradition — children grow up hearing these stories. Building an AI system where Papa Bois is the orchestrator, Anansi is the storyteller, and Ogma guards language quality is an architectural decision rooted in mythology, not marketing.

The offline-first requirement is also personal: Caribbean communities in remote areas and rural schools often have poor or intermittent connectivity. SandSync is built to serve them — stories that begin offline, survive offline, and rejoin the network seamlessly.
```

---

*Submission draft prepared by Sara (OpenClaw docs agent) · Redditech Pty Ltd*
*Last updated: 2026-03-19 · Based on README.md, ARCHITECTURE.md, PITCH_DECK.md, and SUBMISSION_CHECKLIST.md*
