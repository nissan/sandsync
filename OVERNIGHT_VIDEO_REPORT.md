# SandSync Overnight Video Fix Report

**Started:** 2026-03-16 ~00:48 AEST  
**Agent:** overnight-video-fix subagent  
**Goal:** Fix showcase images, clean up stories, fix code, re-record broken scenes, evaluate with LLM-as-judge

---

## Summary

### Phase 1 — Data Fix

**Finding:** All 12 stories already had images and audio URLs. The original diagnostic script was checking `chapters` (array) instead of `first_chapter` (API field name). No backfill was needed.

**Showcase cleanup:** Removed 4 stories to keep best 8:
- Deleted `40548f3d` — Duplicate "Fisherman's Bargain" (older version, worse excerpt)
- Deleted `a870513f` — "Anansi and the Lion's Pride" (duplicate concept, worse than Stolen Thunder)
- Deleted `e5bc058e` — "Fisherman's Midnight Bargain" — confusing mashup title
- Deleted `3ad4ba52` — "The Shopkeeper's Gift" — weaker story

**Kept 8 stories:**
1. The Mahogany Boundary
2. The Waterfall's Blessing
3. The Girl Between the Silk Cotton Trees
4. The Parrot's Message (888b6736 — used in Scene C)
5. Anansi and the Lion's Stolen Thunder
6. The Voice of Mama Dlo
7. The Last Fare
8. The Fisherman's Bargain: What Mama Dlo Takes (45efd1b9 — newer, better)

### Phase 2 — Code Fixes

**Fix 1 — Showcase filter:** Already in place (`filter((s) => s.first_chapter?.image_url)`). Confirmed working.

**Fix 2 — Pipeline isolation:** Already done. Devi and Imagen already wrapped in independent try/catch blocks and run with `Promise.allSettled`. No changes needed.

**Fix 3 — Date display bug:** Fixed `formatDate()` in showcase.tsx to handle edge case where PowerSync stores timestamps in unexpected format. Added guard: if year > 2100 and value is a numeric string, try parsing as epoch ms or seconds.

**Fix 4 — Scene F wait for completion:** Added `poll_story_complete()` function to `record_scenes_v2.py`. Scene F now polls `https://sandsync-api.fly.dev/stories/{id}/status` every 5 seconds until `status == "complete"` before opening the browser and recording.

**Deployed:**
- Frontend to Vercel: https://web-eta-black-15.vercel.app ✅
- API: No code changes needed (pipeline isolation was already done)

### Phase 3 — Video Re-recording

**Scenes targeted:** B (showcase), C (story reader + offline), F (result with pipeline complete)

---

## Judge Evaluation

*(filled in during phase 4)*

---

## Issues & Blockers

*(filled in as they occur)*

---

## Final State

*(filled in at end)*

---

## Recommended Next Steps for Nissan

1. Upload final video to Loom and update SUBMISSION.md with new URL
2. The Loom URL in SUBMISSION.md is still the old one: https://www.loom.com/share/eb76f75441034cf6b6468ecac2bc84f2
3. Verify showcase loads correctly in browser before submission
4. Double-check all 8 remaining stories look good in the showcase

---

## Decision Log

| Time | Decision | Reason |
|------|----------|--------|
| 01:00 | Skip retro_generate — all stories had images | API field is `first_chapter` not `chapters` |
| 01:00 | Delete 4 stories | Duplicates and lower quality |
| 01:05 | Fix formatDate defensively | PowerSync may store timestamps differently |
| 01:05 | Add poll_story_complete() to scene_f | Scene F was showing 0% because recording started before pipeline finished |
| 01:10 | Deploy frontend to Vercel | Push date fix and ensure showcase filter visible |
| 01:10 | Keep Devi/Imagen isolation unchanged | Already implemented with Promise.allSettled |
