# SandSync Retro Generate — Kit's Report

**Date:** 2026-03-16  
**Session:** kit-retro-v2  
**Status:** ✅ All steps complete

---

## Step 1 — Retro Image & Audio Backfill

### Discovery
After checking Supabase directly, the actual state before this run was:
- Stories 3ad4ba52 (The Shopkeeper's Gift) and f0edceb5 (The Girl Between the Silk Cotton Trees) already had both image and audio populated.
- Stories 97105ad2, c2165ace, and e5bc058e were missing **images only** (audio was already present from a prior run).

### Images Backfilled (Gemini Imagen 4.0 Fast)
fal.ai key was not available in 1Password — used Gemini `imagen-4.0-fast-generate-001` as primary.

| Story ID | Title | Image Source | Status |
|----------|-------|-------------|--------|
| 97105ad2 | The Waterfall's Blessing | Gemini Imagen 4.0 Fast | ✅ Uploaded + DB updated |
| c2165ace | The Mahogany Boundary | Gemini Imagen 4.0 Fast | ✅ Uploaded + DB updated (used safe forest prompt, original machete snippet filtered by Gemini) |
| e5bc058e | The Fisherman's Midnight Bargain | Gemini Imagen 4.0 Fast | ✅ Uploaded + DB updated |

### Audio Status
All 5 originally-listed stories already had audio URLs populated. No ElevenLabs calls needed.

### Final Verification
```
All 12 stories:
97105ad2 img:✅ audio:✅ The Waterfall's Blessing
c2165ace img:✅ audio:✅ The Mahogany Boundary
e5bc058e img:✅ audio:✅ The Fisherman's Midnight Bargain: Anansi
3ad4ba52 img:✅ audio:✅ The Shopkeeper's Gift
f0edceb5 img:✅ audio:✅ The Girl Between the Silk Cotton Trees
... (all 12 stories: img:✅ audio:✅)
```

---

## Step 2 — Showcase Filter Fix

**File:** `apps/web/app/routes/showcase.tsx`

Added inline filter to only render cards with images:
```typescript
{stories.filter(s => s.first_chapter?.image_url).map((s) => (
  <StoryCardItem key={s.id} story={s} />
))}
```

Stories without `image_url` are now silently excluded from the showcase grid.  
✅ Confirmed — all 12 current stories have images so full showcase visible, and future imageless stories won't appear.

---

## Step 3 — Pipeline Isolation Fix (Devi + Imagen)

**File:** `apps/api/src/mastra/workflows/story-pipeline.ts`

### What Changed
Replaced the sequential Devi-then-Imagen pattern with a **true parallel + independent save** architecture:

1. **Chapter INSERT first** — text content, quality scores written to DB immediately after Ogma
2. **`Promise.allSettled([deviTask(), imagenTask()])`** — both run concurrently
3. **Each saves independently** — Devi UPDATEs `audio_url/audio_source`, Imagen UPDATEs `image_url/image_source/illustration_prompt`
4. **Full isolation** — if Devi throws, `allSettled` still runs Imagen and vice versa; rejection logged but doesn't crash the chapter

### Key guarantees
- Devi failure → chapter still gets image, story still completes ✅
- Imagen failure → chapter still gets audio, story still completes ✅
- Both save independently without racing on a single INSERT ✅
- `Promise.allSettled` used (not `Promise.all`) — no short-circuit on first failure ✅

---

## Step 4 — Deploy

### API (Fly.io)
- **App:** `sandsync-api`
- **Strategy:** immediate
- **Status:** ✅ Deployed — both machines updated and healthy
- **URL:** https://sandsync-api.fly.dev

### Frontend (Vercel)
- **Project:** `web` (nissan-dookerans-projects-0352048f)
- **Status:** ✅ Deployed to production
- **URL:** https://web-eta-black-15.vercel.app
- **Build:** Clean Vite build, 8.33s

---

## Summary

| Task | Status | Notes |
|------|--------|-------|
| Retro image backfill (3 stories) | ✅ Done | Used Gemini Imagen 4.0 Fast (fal.ai key not in 1Password) |
| Retro audio backfill | ✅ Already done | All 5 stories already had audio |
| Showcase filter (images only) | ✅ Done | Filter added to render loop |
| Pipeline Devi/Imagen isolation | ✅ Done | `Promise.allSettled` + independent DB saves |
| API deploy | ✅ Done | Immediate strategy, both machines healthy |
| Frontend deploy | ✅ Done | Clean build, aliased to production |

**Script:** `scripts/retro_generate.py` — reusable for future backfill runs.
