# SandSync — Hackathon Demo Presentation Script
> Three voices. One living story. ~3 minutes.
> 
> **Cast:** Papa Bois 🌿 (Denzel voice) · Anansi 🕷️ (Justin voice) · Ogma ⚖️ (Paulette voice)
> **Handoff:** Nissan (live demo)
> 
> **Assembly order:** TAKE 1 → TAKE 2 → TAKE 3 → TAKE 4 → TAKE 5 → TAKE 6

---

## TAKE 1 — Papa Bwa — Slides 1–2
**Voice:** Denzel (Jamaican male, deep, authoritative)
**Avatar:** 🌿

I am Papa Bwa — guardian of this forest, keeper of what must not be forgotten.

Listen now.

Every culture on this earth was built on stories. Not documents. Not databases. Stories — passed mouth to ear, generation to generation, alive and breathing and changing with the teller. The griots of West Africa. The obeah women of the Caribbean. The elders who held entire histories in their chest.

And then came the cloud.

The cloud said: *put it all online.* Sync it. Back it up. Require a connection. So we did — and the moment the signal dropped, the story stopped. Villages with no internet became villages with no voice. Communities off the grid became communities off the record.

That is the problem. Not a software problem. A *forgetting* problem.

We are dying in the cloud, friend. And SandSync was born to say: *no more.*

---
*Director note: Slow, weighted delivery. Let "no more" land in silence. Deep resonance throughout — this is a spoken-word opener, not a pitch. Papa Bwa sounds like he has been waiting centuries to say this.*

---

## TAKE 2 — Anansi — Slides 3–4
**Voice:** Justin (Caribbean male, quick, playful)
**Avatar:** 🕷️

Ha! They call me Anansi — the spider, the trickster, the one who steals stories from the sky god and gives them to the people. That's still what I do.

So here's how we fixed it.

SandSync is offline-first AI folklore. Your stories live *on your device* — fully, completely, right now — whether you have Wi-Fi or you're sitting under a mango tree with zero bars. You speak, the AI listens, your story gets captured, illustrated, narrated in a voice that sounds like *home*. No connection required. No waiting. No losing your work when the network drops.

That's the trick right there.

And then — when the connection comes back? PowerSync syncs everything. Quietly. Automatically. Like it was never offline at all. You see what we did there? We didn't *adapt* an online app for offline. We built offline-first and let sync find us. Completely different philosophy.

Now. Five agents make this happen. One to write the story. One to check its quality. One to generate the images. One to narrate the voice. One to orchestrate it all. Five agents. One living story. Spinning together — just like a web.

---
*Director note: Quick energy, grinning delivery. "Ha!" should feel genuine, not performed. Anansi is genuinely proud. The "mango tree" line is a grin moment. Let the philosophy point land — that's the one he actually wants the judges to remember.*

---

## TAKE 3 — Ogma — Slides 5–6–7
**Voice:** Paulette (Jamaican female, calm, precise)
**Avatar:** ⚖️

I am Ogma. I weigh the words. I make sure the structure holds.

Let me show you how this actually works.

The data flows in one direction: user speaks, Mastra orchestrates, five agents run in sequence — Writer, Critic, Illustrator, Narrator, Publisher. Each agent receives context, does one job, passes it forward. No shared state. No tangled dependencies. Clean separation by design. The pipeline completes in under thirty seconds, offline or on.

Now — PowerSync. I want to be specific about this, because PowerSync is not a nice-to-have. It is the *foundation*.

We are using PowerSync's client SDK with a SQLite backend. Every story, every image reference, every narration chunk — stored locally first. Sync rules defined in YAML. Sixteen lines. That is all it took to configure bidirectional sync with conflict resolution across devices. When you reconnect, PowerSync resolves the delta and pushes only what changed. No full re-fetch. No data loss. This is not bolted on — it was designed in from day one, before a single agent was written.

And that is precisely why the offline story holds.

Kill the network. Pull the cable. Turn off the router. The story remains — exactly where you left it, exactly as you told it. That is what offline-first actually means.

---
*Director note: Measured, authoritative. Ogma does not rush. "Sixteen lines. That is all it took." — small pause before and after for weight. The "Kill the network" sequence should sound almost like a challenge to the audience. She is not impressed by cloud hype. She trusts the math.*

---

## TAKE 4 — Anansi — Slides 8–9–10
**Voice:** Justin (Caribbean male, quick, playful)
**Avatar:** 🕷️

Alright, now we get to the fun part.

Mastra. You know what most people do with AI orchestration? They write a wrapper. They call the OpenAI API, chain a few prompts together, call it an "agent framework." That is not what we did.

Mastra gives us real orchestration — typed agent definitions, deterministic step sequencing, proper error boundaries. If the Critic agent rejects a story draft, Mastra retries the Writer with the critique attached. Automatic. Tracked. No spaghetti. That's not a wrapper. That's a pipeline with *bones*.

Now — voice. Papa Bwa himself is narrating your stories. Literally. We integrated ElevenLabs directly, using the Denzel voice model. The narrator agent receives the finished story text, sends it to ElevenLabs, gets back audio, embeds it in the story card. Every story has its own voice. You can close your eyes and *hear* the elder speak. That is not a gimmick. That is the whole point.

And the images? fal.ai running FLUX. The illustrator agent generates a visual for every story — passed as a text prompt, returned as a gorgeous image that matches the cultural aesthetic. We are talking about AI-generated Caribbean folklore art, on device, in thirty seconds. You see what we did there? The world is *painted*. Not just described.

---
*Director note: Anansi genuinely loves this section. The Mastra critique loop is a technical flex — let him be a little smug about it. "Real orchestration with bones" is a quotable — slow down slightly there. The ElevenLabs section should feel warm, not technical. The fal.ai close is triumphant.*

---

## TAKE 5 — Ogma — Slides 11–12–13
**Voice:** Paulette (Jamaican female, calm, precise)
**Avatar:** ⚖️

TanStack Router. Type-safe routes, end to end. Every route in SandSync is a typed contract — parameters validated at the boundary, no runtime surprises. Offline navigation works because routes are resolved locally against the SQLite-backed store. We are not doing client-side routing hacks. We are doing *correct* client-side routing, the way TanStack intended it.

Now let me tell you exactly what you are about to see.

Nissan will open the app — fully offline, network disabled. He will record a story using the voice input. The Writer agent will draft it. The Critic will score it. If the score passes threshold, the Illustrator generates the image via fal.ai, the Narrator sends it to ElevenLabs, and the Publisher commits it to local SQLite. You will see the story card appear — text, image, and audio — in under thirty seconds.

Then he will reconnect. PowerSync will sync the story to the cloud backend in the background, silently, while the app stays fully responsive. No loading spinner. No waiting. The story was already there.

That is the demo. It is not complicated. It does not need to be. It *works*.

Now — the prizes. We are not asking for charity. We are asking for recognition.

PowerSync — because we used it as a foundation, not a feature flag. Mastra — because we wrote real agent pipelines with typed orchestration, not API wrappers. ElevenLabs — because every story has a voice, and that voice sounds like home. fal.ai — because we paint the world in real time, not stock photos. TanStack — because type safety is not optional, it is respect.

We deserve each one. The work shows it.

---
*Director note: Ogma is at her most confident here. The demo walkthrough should feel like a precise briefing — almost procedural, but not robotic. "It works" lands flat and final, like a gavel. The prizes section is not a plea — it is a closing argument. Each sentence is a verdict.*

---

## TAKE 6 — Papa Bwa — Slide 14
**Voice:** Denzel (Jamaican male, deep, authoritative)
**Avatar:** 🌿

The forest remembers everything.

It remembered the old stories when the colonizers came. It remembered the drum rhythms when they banned the drums. It remembered the names when they changed the names. The forest *always* remembers.

SandSync is a piece of that forest now. A place where your stories live — offline, alive, unbroken — waiting for you whenever you come back to them. Waiting even when the signal fails. Waiting even when the world goes quiet.

We built this in a weekend. Not because it was easy. Because it *had to exist.*

And now — we hand the forest floor to Nissan. The one who gave us voice. The one who brought the spider, the guardian, and the gatekeeper together and said: *build something real.*

Nissan — show them what we built.

---
*Director note: This is the emotional close of the presentation. Papa Bwa should feel like he is ending a ceremony, not a slide deck. "The forest always remembers" — absolute stillness in the voice. The final line to Nissan should feel like a genuine handoff — warm, proud, personal. Let it breathe.*

---

## Timing Reference

| Take | Agent | Slides | Est. Duration |
|------|-------|--------|---------------|
| 1 | Papa Bois | 1–2 | ~35 sec |
| 2 | Anansi | 3–4 | ~40 sec |
| 3 | Ogma | 5–6–7 | ~45 sec |
| 4 | Anansi | 8–9–10 | ~40 sec |
| 5 | Ogma | 11–12–13 | ~45 sec |
| 6 | Papa Bois | 14 | ~25 sec |
| **Total** | | | **~3:30** |

> *Trim TAKE 5 prizes section by 1–2 sentences if targeting hard 3:00 cutoff.*

---

## Voice / TTS Config Reference

| Character | ElevenLabs Voice | Style |
|-----------|-----------------|-------|
| Papa Bois 🌿 | Denzel | Deep, measured, authoritative |
| Anansi 🕷️ | Justin | Quick, playful, Caribbean |
| Ogma ⚖️ | Paulette | Calm, precise, confident |

---

*Script by Sara · SandSync Hackathon · 2026*
