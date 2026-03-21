# Presentation Cut Plan — Target 2:00–2:30
_Cut by Loki · 2026-03-18_

## Summary
**Before:** 6 takes, ~658s (11:00)
**After:** 6 takes trimmed, ~140s (2:20)
**Approach:** Every take survives but is cut to its essential spine. PowerSync and offline story stay prominent. Papa Bwa open + close sacred. Handoff line kept.

---

## Take-by-Take

### TAKE 1 — Papa Bwa (61s → 22s)
**Decision:** TRIM heavily — keep the hook and the problem statement, cut the examples

**Keep:**
> I am Papa Bwa — guardian of this forest, keeper of what must not be forgotten.
> Listen now.
> Every culture on this earth was built on stories. Not documents. Not databases. Stories — passed mouth to ear, generation to generation, alive and breathing and changing with the teller.
> And then came the cloud. The moment the signal dropped, the story stopped.
> That is the problem. Not a software problem. A forgetting problem.
> We are dying in the cloud, friend. And SandSync was born to say: no more.

**Cut:** The griots/obeah paragraph, the villages/communities paragraph.

---

### TAKE 2 — Anansi (96s → 28s)
**Decision:** TRIM — keep the solution pitch and the philosophy, cut the five-agent detail (covered in Take 4)

**Keep:**
> Ha! They call me Anansi — the spider, the trickster, the one who steals stories from the sky god and gives them to the people. That's still what I do.
> SandSync is offline-first AI folklore. Your stories live on your device — whether you have Wi-Fi or you're sitting under a mango tree with zero bars. No connection required. No waiting.
> That's the trick right there.
> We didn't adapt an online app for offline. We built offline-first and let sync find us. Completely different philosophy.

**Cut:** The full five-agents paragraph (save for Take 4).

---

### TAKE 3 — Ogma (163s → 35s)
**Decision:** TRIM to architecture + PowerSync core, cut the pipeline description (already in Take 2) and the offline elaboration

**Keep:**
> I am Ogma. I weigh the words. I make sure the structure holds.
> PowerSync is not a nice-to-have. It is the foundation.
> We are using PowerSync's Sync Streams with a SQLite backend. Edition three. Auto-subscribe enabled. Sixteen lines of YAML. That is all it took to configure bidirectional sync with conflict resolution across devices. No full re-fetch. No data loss. Designed in from day one.
> Kill the network. The story remains. That is what offline-first actually means.

**Cut:** The full data-flow paragraph, the "No shared state" pipeline description.

---

### TAKE 4 — Anansi (113s → 28s)
**Decision:** TRIM to Mastra + ElevenLabs, cut fal.ai detail (mentioned in prizes)

**Keep:**
> Mastra gives us real orchestration — typed agent definitions, deterministic step sequencing. If the Critic rejects a story, Mastra retries the Writer with the critique attached. Automatic. Tracked. That's not a wrapper. That's a pipeline with bones.
> We integrated ElevenLabs directly, using the Denzel voice model. Every story has its own voice. You can close your eyes and hear the elder speak. That is not a gimmick. That is the whole point.

**Cut:** The "Alright, now we get to the fun part" opener, the fal.ai paragraph.

---

### TAKE 5 — Ogma (170s → 22s)
**Decision:** TRIM heavily — keep prizes only, cut TanStack and demo walkthrough (judges can see demo themselves)

**Keep:**
> We are not asking for charity. We are asking for recognition.
> PowerSync — because we used it as a foundation, not a feature flag. Mastra — because we wrote real agent pipelines, not API wrappers. ElevenLabs — because every story has a voice, and that voice sounds like home. fal.ai — because we paint the world in real time. TanStack — because type safety is not optional, it is respect.
> We deserve each one. The work shows it.

**Cut:** TanStack technical description, entire demo walkthrough briefing.

---

### TAKE 6 — Papa Bwa (55s → 22s)
**Decision:** TRIM — keep the forest memory closer + handoff, cut the colonizers/drums/names list

**Keep:**
> The forest remembers everything.
> SandSync is a piece of that forest now. A place where your stories live — offline, alive, unbroken — waiting for you whenever you come back to them. Waiting even when the signal fails.
> We built this in a weekend. Not because it was easy. Because it had to exist.
> And now — we hand the forest floor to Nissan. The one who gave us voice. The one who brought the spider, the guardian, and the gatekeeper together and said: build something real.
> Nissan — show them what we built.

**Cut:** The colonizers/drums/names paragraph.

---

## Reassembly Order
| Take | Agent | Est. Duration |
|------|-------|--------------|
| 1 | Papa Bwa | ~22s |
| 2 | Anansi | ~28s |
| 3 | Ogma | ~35s |
| 4 | Anansi | ~28s |
| 5 | Ogma | ~22s |
| 6 | Papa Bwa | ~22s |
| **Total** | | **~157s (2:37)** |

_Trim Take 3 or 4 by a sentence each if hard 2:30 needed._

## What Was Cut and Why
- **Five-agent list (Take 2)** — redundant with Take 4's Mastra detail
- **Pipeline data-flow description (Take 3)** — architectural, better shown in slides than spoken
- **fal.ai detail (Take 4)** — mentioned in prizes, not worth 20s of talk time
- **TanStack technical (Take 5)** — Tanner judges this himself; let the code speak
- **Demo walkthrough (Take 5)** — judges are about to watch the demo; don't describe it first
- **Colonizers/drums/names list (Take 6)** — beautiful writing but too long for a 2min edit; the forest opener alone sets the tone
