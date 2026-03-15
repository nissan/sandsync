# SandSync — Demo Recording Script & Storyboard

> **For:** Nissan Dookeran (recording manually)  
> **Purpose:** PowerSync AI Hackathon 2026 submission video  
> **Target length:** 2:30–3:00 minutes  
> **Tone:** Warm, casual, Caribbean-aware. Not a corporate pitch. You're showing a friend something cool.

---

## 1. OVERVIEW

### What This Video Must Accomplish

The judges need to see three things clearly:

1. **PowerSync is doing real work** — stories sync to local SQLite, they survive offline, they come back when you reconnect. This is not a normal web app with a spinner. This is local-first.
2. **The pipeline is real and runs live** — five agents collaborate to write, review, illustrate, and narrate a Caribbean folklore story from a single prompt.
3. **The cultural mission is genuine** — SandSync exists because oral traditions deserve better than cloud-only fragility.

### Why Each Scene Matters

| Scene | Why It's in the Video |
|---|---|
| Opening hook | Sets the mission. Judges remember feelings, not feature lists. |
| Showcase | Proves the product exists and has real content. |
| Story reader | Shows the full output: image + audio + sync indicator. |
| Go offline | This is the PowerSync money shot. Do not rush this. |
| Generate story | Shows the live pipeline — the whole technical argument. |
| Pipeline completes | Proof it works end-to-end. Show the output, play the audio. |
| Sponsor callout | Explicit credit to each sponsor. Required for bonus prizes. |
| Close | Sends judges to the live URL with a clear CTA. |

### Pacing Target

```
0:00 – 0:15   Scene 1 — Opening hook
0:15 – 0:30   Scene 2 — Showcase
0:30 – 0:50   Scene 3 — Story reader
0:50 – 1:10   Scene 4 — Go offline
1:10 – 1:55   Scene 5 — Generate new story (pipeline live)
1:55 – 2:20   Scene 6 — Pipeline completes
2:20 – 2:40   Scene 7 — Sponsor callout
2:40 – 3:00   Scene 8 — Close
```

---

## 2. STORYBOARD

---

### Scene 1 — Opening Hook
**Time:** 0:00–0:15 (15 seconds)

**BROWSER ACTION:**  
Navigate to: `https://web-eta-black-15.vercel.app`  
Let the homepage load fully. Do not click anything. Scroll down slowly just enough to show the hero section and tagline.

**NARRATION:**  
> "Caribbean folklore has survived for centuries — passed down through voices, not servers. SandSync is an AI storytelling platform that keeps it that way. Stories that live offline. Stories that travel with you."

**WHAT TO SHOW:**  
- Homepage hero: SandSync logo + tagline visible
- Any cultural imagery/illustration on the landing page
- The URL bar clearly showing the domain

**SHOT TIPS:**  
Pause for half a second before you start speaking. Let the page breathe. Don't scroll mid-sentence.

---

### Scene 2 — The Showcase
**Time:** 0:15–0:30 (15 seconds)

**BROWSER ACTION:**  
1. Click the **Showcase** link in the nav (or navigate to `/showcase`)
2. Let the page load — the story cards with watercolour illustrations should appear
3. Scroll down just enough to show 2–3 story cards with their images
4. Click into the **first story** that has a visible image (whichever looks most visually striking)

**NARRATION:**  
> "The showcase has stories already waiting. Each one written by AI agents, illustrated by fal.ai, and narrated in a Jamaican accent. Let's open one."

**WHAT TO SHOW:**  
- Grid/list of story cards with Caribbean watercolour illustrations
- Story titles visible (should be folklore-inspired)
- The click action — cursor clearly moving to and clicking a story

**SHOT TIPS:**  
If there are multiple stories, let them be visible briefly before clicking. The visual richness of the illustrations is a selling point. Don't rush past them.

---

### Scene 3 — Story Reader
**Time:** 0:30–0:50 (20 seconds)

**BROWSER ACTION:**  
1. You should now be in the story reader for the story you clicked
2. Let the story content load — text, image, audio player all visible
3. **Point cursor at the watercolour illustration** (hover or pause there)
4. **Point cursor at the audio player** — click Play if it doesn't auto-play
5. **Point cursor at the ⚡ sync indicator in the nav** — it should show "Synced" or similar
6. Let a few seconds of audio play

**NARRATION:**  
> "This is the reader. The illustration was painted by fal.ai FLUX Schnell. The narration — [*gesture at audio player*] — that's Devi, powered by ElevenLabs with a Jamaican voice. And that little lightning bolt up there? [*gesture at nav*] That's PowerSync telling you this story is sitting in local SQLite on your device right now. Not just streamed. Saved. Locally."

**WHAT TO SHOW:**  
- Story text is readable
- Caribbean watercolour illustration is prominent
- Audio player is visible and playing (waveform or progress bar moving)
- The ⚡ PowerSync sync indicator in the navigation bar
- The story title

**SHOT TIPS:**  
Use slow cursor movements to "point" at things — this helps viewers follow. If the audio is playing, keep it going for at least 3–4 seconds so judges can hear the Jamaican accent.

---

### Scene 4 — Go Offline
**Time:** 0:50–1:10 (20 seconds)

**BROWSER ACTION:**  
1. Open Chrome DevTools: `Cmd + Option + I` (Mac)
2. Click the **Network** tab
3. In the throttle dropdown (where it says "No throttling"), click it and select **Offline**
4. DevTools panel is visible on screen for a moment — that's fine, it shows authenticity
5. **Reload the page** with `Cmd + R`
6. Show the page loading successfully — story is still there, fully accessible
7. Pause for 2 seconds to let it sink in
8. Change network back to **No throttling** (online)
9. Close DevTools: `Cmd + Option + I`

**NARRATION:**  
> "Let me take us offline right now. [*switch to Offline*] Reload. [*reload page*] Still there. The story, the image, the audio — all of it. That's PowerSync. Your stories don't need the internet once they're synced to your local SQLite database. [*re-enable network*] Now we're back online."

**WHAT TO SHOW:**  
- DevTools Network tab clearly visible with Offline being selected
- Page reload happening
- Story content loading successfully while offline
- The ⚡ sync indicator (may show "offline" state — that's good)
- Network being re-enabled

**SHOT TIPS:**  
This is the most important scene for the PowerSync prize. Go slow. Let the judges see the reload working. Don't rush past the "it loaded" moment. A brief pause after the page loads offline — before you start speaking again — gives it weight.  
**Do NOT hide DevTools quickly** — judges need to see you actually switched to Offline, not faked it.

---

### Scene 5 — Generate a New Story
**Time:** 1:10–1:55 (45 seconds)

**BROWSER ACTION:**  
1. Navigate to: `https://web-eta-black-15.vercel.app/pipeline-demo`
2. In the story prompt input, type the prepared prompt (see Preparation Checklist below)
3. Make sure any "Quick demo" or "Demo mode" checkbox is **unchecked** — run the real pipeline
4. Click **Run Pipeline** (or equivalent button)
5. As nodes light up in the pipeline visualiser, keep the debug panel visible
6. Point cursor to each node as it activates:
   - **Papa Bois** — "Generating the creative brief..."
   - **Anansi** — "Writing the chapter in Caribbean dialect..."
   - **Ogma** — "Reviewing quality... scored X/10..."
   - **fal.ai / Imagen** — "Painting the illustration..."
   - **Devi / ElevenLabs** — "Narrating the chapter..."
   - **PowerSync** — "Syncing to your local SQLite..."

**NARRATION:**  
> "Now let's make a new story from scratch. I'll type a prompt — [*type prompt*] — and hit Run Pipeline. [*click button*]  
>
> Papa Bois is up first — he's the forest guardian, the orchestrator. He's building the creative brief right now: title, mood, folklore elements.  
>
> Now Anansi takes over — the spider, keeper of all stories — writing the chapter in authentic Caribbean dialect using Claude Sonnet.  
>
> Ogma is reviewing. He's the language guardian. If the score comes in below 7.5, he sends it back. [*if visible: 'Ogma scored it X/10, approved'*]  
>
> fal.ai FLUX Schnell is painting the illustration. And Devi — ElevenLabs — is narrating it. Both running in parallel.  
>
> The whole pipeline is orchestrated by Mastra."

**WHAT TO SHOW:**  
- The pipeline prompt input with the text being typed
- The Run Pipeline button being clicked
- Pipeline nodes lighting up in sequence (visual flow diagram)
- Debug panel showing agent activity, statuses, maybe token counts
- Agent names appearing on screen as they run

**SHOT TIPS:**  
Keep your narration tight with what's happening on screen. If there's a delay between nodes, fill it with context: "This is where Anansi is weaving the narrative..." — don't go silent for more than 2 seconds.  
If the pipeline shows an Ogma retry (score below 7.5), narrate it: "Ogma sent it back for a revision — that's the LLM-as-judge pattern in action. Quality over speed."

---

### Scene 6 — Pipeline Completes
**Time:** 1:55–2:20 (25 seconds)

**BROWSER ACTION:**  
1. Wait for pipeline completion — a preview or "Story ready" state appears
2. Show the **completion time** (in seconds) and **cost** if visible in the UI
3. Click **"Read Full Story"** or equivalent button
4. In the story reader: let the generated image load
5. Click Play on the audio player — let 4–5 seconds of Denzel's voice play
6. Show the story text briefly

**NARRATION:**  
> "Done. [*pause*] From prompt to full story — image, narration, text — in [X] seconds. This story is already in your local SQLite. PowerSync synced it before you clicked Read.  
>
> [*play audio*] That's Denzel — the ElevenLabs Jamaican voice. Every story gets this narration. It's not a demo feature. It's just how SandSync works."

**WHAT TO SHOW:**  
- Pipeline completion state — success indicator
- Completion time visible
- The generated story: watercolour illustration + text
- Audio playing with visible progress (waveform/progress bar)
- The PowerSync sync indicator showing the story is synced

**SHOT TIPS:**  
Let the audio play for a genuine 4–5 seconds. The Jamaican voice is a strong emotional hook. Don't cut it off early. If the image is visually striking, linger on it for a moment before scrolling to the text.

---

### Scene 7 — Sponsor Callout
**Time:** 2:20–2:40 (20 seconds)

**BROWSER ACTION:**  
1. Scroll down on the current page until you find the sponsor badges/logos strip
   - If no sponsor strip on this page, navigate back to the homepage and scroll to the sponsor section
2. Slowly scroll across or through the sponsor logos as you name each one

**NARRATION:**  
> "SandSync runs on some incredible tools. Mastra orchestrates the agents — the whole five-spirit pipeline runs on Mastra workflows. PowerSync syncs it to your device, local SQLite, offline-first. Supabase stores everything — Postgres, Storage, RLS. TanStack Router handles the routing, type-safe all the way. ElevenLabs gives it a voice — Denzel, that Jamaican accent you just heard. fal.ai paints every story. And Groq keeps the quality honest — Ogma runs on Llama."

**WHAT TO SHOW:**  
- Sponsor logos/badges visible as each is named
- Smooth scroll through them (not frantic)
- Each logo visible at the moment it's mentioned if possible

**SHOT TIPS:**  
If sponsor logos aren't visible or the scroll timing is hard to match, it's okay to name them while showing any page. The words matter more than perfect logo sync here. Speak at a slightly slower pace — you're giving judges time to mentally note each sponsor.

---

### Scene 8 — Close
**Time:** 2:40–3:00 (20 seconds)

**BROWSER ACTION:**  
1. Navigate back to the homepage: `https://web-eta-black-15.vercel.app`
2. Let it load cleanly
3. Stay on the homepage — don't click anything
4. Optional: do one final slow scroll down the page

**NARRATION:**  
> "Caribbean folklore survived centuries of colonisation, displacement, and silence because people kept telling the stories. SandSync is built so those stories survive the cloud too.  
>
> It's live right now at web-eta-black-15.vercel.app. Go find your story."

**WHAT TO SHOW:**  
- Clean homepage with branding
- The URL in the address bar (clearly readable)
- Cultural imagery if present on the homepage

**SHOT TIPS:**  
End on a still, confident frame. Don't fade out mid-scroll or mid-sentence. Let the final URL sit on screen for 2–3 seconds after you stop speaking. Judges will want to screenshot or note it.

---

## 3. PREPARATION CHECKLIST

Do everything on this list **before** you hit record. In order.

---

### Browser Setup

- [ ] **Browser:** Chrome (required — DevTools for offline demo, Scene 4)
- [ ] **Window size:** Full-screen or maximised. No floating windows. Use `Cmd + Ctrl + F` for full-screen on Mac.
- [ ] **Zoom level:** 90% is ideal (`Cmd + -` once from default). Makes more content visible, text still readable.
- [ ] **Open tabs in advance:**
  1. `https://web-eta-black-15.vercel.app` (homepage)
  2. `https://web-eta-black-15.vercel.app/showcase`
  3. `https://web-eta-black-15.vercel.app/pipeline-demo`
  - Keep them in this order. Tab through with `Cmd + Tab` or click directly.
- [ ] **Hide extensions/toolbar clutter:** Right-click extension icons → Hide, to keep the address bar clean
- [ ] **Close all other applications** except your screen recorder and Chrome
- [ ] **Disable notifications:** System Preferences → Notifications → Do Not Disturb ON
- [ ] **Hide Dock** if it might pop up: System Preferences → Dock → Automatically hide and show

---

### Story Prompt to Use (Scene 5 — Type This Exactly)

```
Papa Bois finds a child lost in the Trinidad rainforest at midnight. She carries a calabash 
filled with fireflies that whisper the names of the dead. Write the first chapter.
```

**Why this prompt:**
- "Papa Bois" is one of SandSync's own agents — meta-cool for the demo
- "Trinidad rainforest" grounds it in Caribbean geography
- "Fireflies that whisper" — rich imagery, fal.ai will generate something beautiful
- "Names of the dead" — folklore-appropriate stakes, emotional depth
- It's short enough to type quickly on camera without typos

**Backup prompt** (if something feels off):
```
Anansi the spider tricks the keeper of all songs into giving him the blues, 
the reggae, and the steelband, and hides them in a gourd for safekeeping.
```

---

### Which Story to Open in Scene 3

**Recommendation:** Open whichever story in the showcase has:
1. A **visible, high-quality watercolour illustration** (not a fallback/placeholder image)
2. An **audio player that's ready to play** (not loading/errored)
3. A title that sounds authentically Caribbean/folkloric

**Before recording:** Go to `/showcase`, click through each story, and note which one:
- Has the best illustration (brightest, most detailed)
- Plays audio immediately when you click Play
- Has readable story text (not truncated)

Mark that story's title or URL so you can navigate directly to it during the recording. **Do not rely on finding the right story during the take.**

---

### How to Trigger Offline Mode (Scene 4 — Practise This)

**Exact steps:**
1. `Cmd + Option + I` — opens DevTools
2. Click **Network** tab (may need to scroll right in the DevTools tabs)
3. Click the **throttle dropdown** — it shows "No throttling" by default
4. Select **Offline**
5. The icon/label changes to "Offline" — confirm this before reloading
6. `Cmd + R` — reload the page
7. Watch the page load from local SQLite
8. Switch back: throttle dropdown → **No throttling**
9. `Cmd + Option + I` — close DevTools

**Practise this sequence 3 times before recording.** Muscle memory matters.  
**Common mistake:** People select "Slow 3G" instead of "Offline" — double-check.  
**Note:** DevTools should be visible on screen when you switch to Offline. Don't hide it — it's proof.

---

### Audio / Mic Setup

- [ ] **Use a dedicated microphone** if you have one (USB or XLR). Built-in Mac mic is okay but external is better.
- [ ] **Quiet room.** No fans, no AC, no notifications.
- [ ] **Record a 10-second test** before your full take. Play it back. Check for:
  - Echo (sit away from hard walls, or hang a blanket behind you)
  - Clipping (if your voice distorts on loud words, lower mic gain)
  - Background hum (turn off AC, close windows)
- [ ] **Speak at a slightly slower pace than feels natural.** Demo narration is always faster than it sounds in your head.
- [ ] **Keep water nearby.** Dry mouth kills takes.
- [ ] **You do not need to narrate in real-time with the pipeline.** If something takes longer than expected, you can narrate what's happening ("and now Ogma is reviewing...") without perfectly matching visuals. That's fine.

---

### Final Pre-Record Checks

- [ ] Open `https://web-eta-black-15.vercel.app/pipeline-demo` and run a pipeline once (not on camera) to make sure it completes without errors. Time it.
- [ ] Check that the Showcase has at least 2 stories with images
- [ ] Check that the story reader loads audio (click play on at least one story)
- [ ] Check that the ⚡ PowerSync sync indicator is visible in the nav
- [ ] Check that DevTools offline mode works (quick test on a random page)
- [ ] Make sure your API credits are not exhausted: Claude, fal.ai, ElevenLabs, Groq
- [ ] Fly.io API is awake: open `https://sandsync-api.fly.dev` in a tab and wait for response (it may cold-start)

---

## 4. SHOT NOTES

### Screen Recording Settings

- **Resolution:** 1920×1080 (Full HD). Do not record in 4K — file will be too large for upload.
- **Frame rate:** 30fps is fine. 60fps not necessary.
- **Tool options:** QuickTime Player (free, good quality) or [Loom](https://loom.com) (automatic upload, shareable link).
  - QuickTime: File → New Screen Recording → Select screen → Record
  - Loom: Records + auto-uploads — easiest for getting a shareable URL fast
- **Record the entire screen**, not just the browser window. Keeps things clean and prevents accidental crop issues.
- **Cursor visibility:** Make sure your cursor is visible. In QuickTime, the cursor is always shown. In other tools, check the setting.

---

### Transitions

- **No fancy transitions needed.** Tab switches and URL navigation are fine cuts.
- **For Scene 4 (offline):** Do not cut away from DevTools while switching to Offline. The uncut sequence (open DevTools → switch → reload → loads) is the proof. Cutting would look faked.
- **Between scenes:** Navigate directly in the browser. No need for title cards unless you want them.
- **Pause briefly** (0.5–1 second) after navigating to a new page before you start speaking. Let the page settle.

---

### What NOT to Show

- ❌ **Do not show any API keys, environment variables, or .env files**
- ❌ **Do not show the Supabase dashboard** (has project URLs and secrets)
- ❌ **Do not show error states** — if the pipeline errors, stop the recording and fix before re-recording
- ❌ **Do not show other browser tabs** — keep tab bar clean, or hide it if possible
- ❌ **Do not show your desktop** or any non-SandSync content
- ❌ **Do not show the Fly.io or Vercel dashboards** (not needed, contains internal info)
- ❌ **Do not show the cost of API calls if the numbers are embarrassing** — if the pipeline cost display shows something like $2.50 per run, either explain it's a dev environment without optimisation, or don't linger on the cost number
- ❌ **Avoid showing a loading spinner that takes >5 seconds without narration** — fill dead air with context

---

### Number of Takes

- Aim to record **3 full takes minimum** before editing
- Take 1: Familiarise yourself. It will feel off. Keep it anyway.
- Take 2: Usually your best. Looser, more confident.
- Take 3: Safety take. Back it up.
- **Pick your best take.** No editing needed unless there's dead air or a long loading pause.

---

### If the Pipeline Takes Too Long

The pipeline can take 30–90 seconds depending on API response times. If it's taking longer than expected during a take:

- Keep narrating: *"Each agent is running sequentially — Papa Bois passes to Anansi, Anansi to Ogma..."*
- Point out the debug panel activity: *"You can see the steps completing in the debug panel here..."*
- Do not go silent for more than 3 seconds.
- If it errors: stop, close the take, reset, try again.

---

### Audio Sync Note

If you're doing voiceover in post (recording your screen first, then narrating over it):
- Record the screen first, no mic
- Then record voiceover separately while watching the video playback
- Use iMovie, DaVinci Resolve (free), or ScreenFlow to merge
- This gives you better audio quality and more control over timing

If recording screen + voice simultaneously (live), that's also totally fine and more natural-sounding.

---

*Script written by Sara (docs specialist) · OpenClaw Agent Team · Redditech Pty Ltd*  
*PowerSync AI Hackathon 2026 — Demo recording reference*  
*Version 1.0 · 2026-03-15*
