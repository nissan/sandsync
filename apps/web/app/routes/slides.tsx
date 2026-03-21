import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";

export const Route = createFileRoute("/slides")({
  component: SlidesComponent,
});

// ─── Slide data ──────────────────────────────────────────────────────────────

type Slide =
  | { kind: "title"; id: number }
  | { kind: "problem"; id: number }
  | { kind: "solution"; id: number }
  | { kind: "pipeline"; id: number }
  | { kind: "architecture"; id: number }
  | { kind: "powersync"; id: number }
  | { kind: "offline"; id: number }
  | { kind: "mastra"; id: number }
  | { kind: "voice"; id: number }
  | { kind: "falai"; id: number }
  | { kind: "tanstack"; id: number }
  | { kind: "demo"; id: number }
  | { kind: "prizes"; id: number }
  | { kind: "close"; id: number };

const SLIDES: Slide[] = [
  { kind: "title", id: 1 },
  { kind: "problem", id: 2 },
  { kind: "solution", id: 3 },
  { kind: "pipeline", id: 4 },
  { kind: "architecture", id: 5 },
  { kind: "powersync", id: 6 },
  { kind: "offline", id: 7 },
  { kind: "mastra", id: 8 },
  { kind: "voice", id: 9 },
  { kind: "falai", id: 10 },
  { kind: "tanstack", id: 11 },
  { kind: "demo", id: 12 },
  { kind: "prizes", id: 13 },
  { kind: "close", id: 14 },
];

// ─── Individual Slide Components ─────────────────────────────────────────────

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12">
      <div className="mb-4 text-amber-400/40 text-sm font-mono tracking-widest uppercase">PowerSync AI Hackathon 2026</div>
      <h1 className="text-7xl md:text-9xl font-black tracking-tight text-amber-100 mb-6 drop-shadow-2xl">
        SandSync 🌴
      </h1>
      <p className="text-2xl md:text-3xl text-amber-300 font-light mb-12 max-w-3xl">
        Where Stories Live Offline and Breathe Online
      </p>
      <ul className="flex flex-col gap-3 text-amber-200/80 text-lg mb-16 max-w-2xl">
        {[
          "Offline-first AI storytelling — stories survive without internet",
          "Multi-agent Caribbean folklore pipeline (Mastra + Claude + Groq)",
          "PowerSync Sync Streams push stories to every device in real time",
          "Built by Nissan Dookeran · Redditech Pty Ltd · Sydney, Australia",
        ].map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="text-amber-500 mt-1">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>The Problem</SlideLabel>
      <h2 className="text-4xl md:text-6xl font-black text-amber-100 mb-10 leading-tight">
        Oral Traditions Are Dying in the Cloud
      </h2>
      <ul className="flex flex-col gap-4 text-amber-200/80 text-xl mb-12">
        {[
          "Caribbean & West African folklore lives in fragmented archives — not in communities",
          "Every AI storytelling tool needs a live internet connection to show you anything",
          "No platform lets a story begin offline, survive offline, and sync on reconnect",
          "AI-generated folklore ignores cultural authenticity — generic stories, no roots",
        ].map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="text-rose-400 mt-1.5 text-sm">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <blockquote className="border-l-4 border-amber-500 pl-6 text-2xl md:text-3xl text-amber-300 font-light italic">
        "What if a story could follow you offline — and find you again when you reconnect?"
      </blockquote>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-16 max-w-6xl mx-auto w-full">
      <SlideLabel>The Solution</SlideLabel>
      <h2 className="text-4xl md:text-6xl font-black text-amber-100 mb-12 leading-tight">
        SandSync: Offline-First AI Folklore
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "🌴",
            label: "Caribbean Soul",
            desc: "AI agents named after folklore spirits — Papa Bois, Anansi, Ogma, Devi, Imagen. Culture-first, not generic.",
          },
          {
            icon: "⚡",
            label: "Offline-First",
            desc: "PowerSync Sync Streams push stories from Supabase → local SQLite. Stories load with zero network.",
          },
          {
            icon: "🎙️",
            label: "Living Stories",
            desc: "Illustrated by fal.ai FLUX, narrated by Denzel (ElevenLabs Jamaican voice). Readable, listenable, offline.",
          },
        ].map((col) => (
          <div
            key={col.label}
            className="bg-slate-800/60 border border-amber-500/20 rounded-2xl p-8 flex flex-col gap-4 hover:border-amber-500/50 transition-colors"
          >
            <div className="text-5xl">{col.icon}</div>
            <div className="text-amber-300 font-bold text-xl">{col.label}</div>
            <div className="text-amber-100/70 text-base leading-relaxed">{col.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineSlide() {
  const agents = [
    { name: "Papa Bois", role: "Briefs the story — sets folklore context, character, moral", color: "emerald", icon: "🌿" },
    { name: "Anansi", role: "Claude Sonnet 4.5 — writes the full chapter", color: "amber", icon: "🕷️" },
    { name: "Ogma", role: "Groq Llama — quality gate, 7.5/10 min, max 3 revision loops", color: "violet", icon: "⚖️" },
    { name: "Devi", role: "ElevenLabs — Denzel's Jamaican voice, narrates every chapter", color: "rose", icon: "🎙️" },
    { name: "Imagen", role: "fal.ai FLUX Schnell — Studio Ghibli watercolour illustration", color: "sky", icon: "🎨" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-900/40 border-emerald-500/40 text-emerald-300",
    amber: "bg-amber-900/40 border-amber-500/40 text-amber-300",
    violet: "bg-violet-900/40 border-violet-500/40 text-violet-300",
    rose: "bg-rose-900/40 border-rose-500/40 text-rose-300",
    sky: "bg-sky-900/40 border-sky-500/40 text-sky-300",
  };

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-4xl mx-auto w-full">
      <SlideLabel>The Agent Pipeline</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-8">
        Five Agents. One Living Story.
      </h2>
      <div className="flex flex-col gap-2">
        {agents.map((agent, i) => (
          <div key={agent.name}>
            <div
              className={`border rounded-xl px-6 py-3 flex items-center gap-4 ${colorMap[agent.color]}`}
            >
              <span className="text-2xl">{agent.icon}</span>
              <div>
                <span className="font-bold text-lg">{agent.name}</span>
                <span className="text-sm ml-3 opacity-80">{agent.role}</span>
              </div>
            </div>
            {i < agents.length - 1 && (
              <div className="flex justify-center text-amber-500/50 text-2xl leading-none my-0.5">↓</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-amber-400/50 font-mono text-xs mt-4 italic">Orchestrated via Mastra createWorkflow — typed steps, Zod schemas, retry logic built in</p>
    </div>
  );
}

function ArchitectureSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-10 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Architecture</SlideLabel>
      <h2 className="text-3xl md:text-4xl font-black text-amber-100 mb-8 leading-tight">
        How PowerSync Fits the System
      </h2>

      {/* Top: Agent Pipeline */}
      <div className="bg-slate-800/70 border border-violet-500/30 rounded-2xl p-5 mb-3">
        <div className="text-violet-400/70 text-xs font-mono mb-3 uppercase tracking-widest">AI Agent Pipeline (Mastra Workflow)</div>
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {[
            { label: "Papa Bois 🌿", color: "text-emerald-300" },
            { label: "→" , color: "text-amber-500/50"},
            { label: "Anansi 🕷️", color: "text-amber-300" },
            { label: "↔", color: "text-amber-500/50" },
            { label: "Ogma ⚖️", color: "text-violet-300" },
            { label: "→", color: "text-amber-500/50" },
            { label: "Devi 🎙️", color: "text-rose-300" },
            { label: "+", color: "text-amber-500/50" },
            { label: "Imagen 🎨", color: "text-sky-300" },
          ].map((item, i) => (
            <span key={i} className={`font-mono text-sm font-semibold ${item.color}`}>{item.label}</span>
          ))}
        </div>
      </div>

      <div className="flex justify-center text-amber-500/50 text-2xl leading-none mb-2">↓</div>

      {/* Supabase */}
      <div className="bg-slate-800/70 border border-emerald-500/30 rounded-xl px-6 py-3 mb-3 flex items-center gap-4">
        <span className="text-emerald-400 font-mono text-sm font-bold">Supabase</span>
        <span className="text-emerald-300/60 text-sm">Postgres (stories + chapters) · Storage (audio + images) · RLS (user isolation)</span>
      </div>

      <div className="flex justify-center text-amber-500/50 text-2xl leading-none mb-2">↓</div>

      {/* PowerSync */}
      <div className="bg-amber-900/30 border-2 border-amber-500/50 rounded-xl px-6 py-4 mb-3">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-amber-400 font-mono text-sm font-bold">PowerSync Service</span>
          <span className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-0.5 text-amber-300 text-xs font-mono">Sync Streams edition: 3</span>
          <span className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-0.5 text-amber-300 text-xs font-mono">auto_subscribe: true</span>
          <span className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-0.5 text-amber-300 text-xs font-mono">auth.user_id()</span>
        </div>
        <div className="text-amber-200/50 text-xs font-mono">Replicates from Supabase Postgres → streams diffs to each connected client</div>
      </div>

      <div className="flex justify-center text-amber-500/50 text-2xl leading-none mb-2">↓</div>

      {/* Clients */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/70 border border-sky-500/30 rounded-xl px-5 py-3 text-center">
          <div className="text-sky-400 font-mono text-sm font-bold mb-1">Web SDK (WASM SQLite)</div>
          <div className="text-sky-300/60 text-xs">React SPA · PowerSync Web SDK · in-browser SQLite</div>
        </div>
        <div className="bg-slate-800/70 border border-teal-500/30 rounded-xl px-5 py-3 text-center">
          <div className="text-teal-400 font-mono text-sm font-bold mb-1">React Native SDK (SQLite)</div>
          <div className="text-teal-300/60 text-xs">iOS app · native SQLite · offline-first</div>
        </div>
      </div>

      <div className="mt-3 text-center text-amber-300/60 text-xs font-mono italic">
        Stories readable with NO internet on both platforms ↓
      </div>
    </div>
  );
}

function PowerSyncSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>PowerSync — Why It Was Necessary</SlideLabel>
      <h2 className="text-3xl md:text-5xl font-black text-amber-100 mb-6 leading-tight">
        PowerSync Is the Foundation —<br />Not an Afterthought
      </h2>

      {/* Why necessary callout */}
      <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl px-6 py-4 mb-6">
        <div className="text-rose-400/70 text-xs font-mono mb-2 uppercase tracking-widest">Without PowerSync, we'd need to build:</div>
        <div className="flex flex-wrap gap-2">
          {["Custom WebSocket sync layer", "Cache invalidation logic", "Offline write queue", "Conflict resolution"].map((item) => (
            <span key={item} className="bg-rose-900/30 border border-rose-500/20 rounded-full px-3 py-1 text-rose-300 text-xs font-mono line-through opacity-60">{item}</span>
          ))}
        </div>
        <div className="text-amber-300 text-sm mt-3 font-medium">
          PowerSync's Sync Streams replaced all of that with 15 lines of YAML and one SDK call. ✓
        </div>
      </div>

      {/* Sync Streams config callout */}
      <div className="bg-slate-900/70 border border-amber-500/20 rounded-xl px-6 py-4 mb-6 font-mono text-amber-300 text-sm leading-relaxed">
        <div className="text-amber-500/60 mb-2 text-xs">// sync-rules.yaml — Sync Streams config</div>
        <div className="text-amber-400">bucket_definitions:</div>
        <div className="pl-4 text-amber-300/80">  stories_by_user:</div>
        <div className="pl-8 text-amber-200/70">    <span className="text-sky-400">edition</span>: 3</div>
        <div className="pl-8 text-amber-200/70">    <span className="text-sky-400">auto_subscribe</span>: true</div>
        <div className="pl-8 text-amber-200/70">    parameters: <span className="text-emerald-400">select auth.user_id()</span></div>
        <div className="pl-8 text-amber-200/70">    data: <span className="text-violet-400">select * from stories where user_id = bucket.user_id</span></div>
      </div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "📖", text: "Stories readable offline — local SQLite is primary" },
          { icon: "🔄", text: "Edits queue locally, sync on reconnect" },
          { icon: "⚡", text: "auth.user_id() ensures per-user data isolation" },
        ].map((c) => (
          <div key={c.text} className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center gap-3">
            <span className="text-2xl">{c.icon}</span>
            <span className="text-amber-200/80 text-sm">{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OfflineSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-4xl mx-auto w-full">
      <SlideLabel>Offline Demo</SlideLabel>
      <h2 className="text-4xl md:text-6xl font-black text-amber-100 mb-10 leading-tight">
        Kill the Network.<br />The Story Remains.
      </h2>
      {/* Visual */}
      <div className="bg-slate-800/80 border border-slate-600/50 rounded-2xl p-8 mb-8 flex items-center gap-6">
        <div className="flex-shrink-0 flex items-center gap-3">
          <span className="text-4xl">🔌</span>
          <span className="text-slate-400 text-2xl">→</span>
          <span className="text-4xl">📖</span>
        </div>
        <div>
          <div className="text-rose-400 font-mono text-sm mb-1">⚠ You are offline</div>
          <div className="text-amber-100/60 text-sm">…story content still loads from local SQLite ✓</div>
          <div className="text-amber-100/40 text-xs mt-1">Audio plays from cached URL · illustrations rendered from local data</div>
        </div>
      </div>
      <p className="text-xl text-amber-200/80 mb-8 leading-relaxed">
        Local SQLite is the <span className="text-amber-300 font-semibold">primary data layer</span>. Supabase is the sync target. Not the other way around.
      </p>
      <div className="bg-slate-900/60 border border-amber-500/20 rounded-xl px-6 py-4 font-mono text-amber-400 text-sm">
        Try it: DevTools → Network → Offline → Reload → Stories still there ✓
      </div>
    </div>
  );
}

function MastraSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>Mastra — Why It Was Necessary</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-6 leading-tight">
        Mastra: Real Orchestration,<br />Not a Chain of Raw LLM Calls
      </h2>

      {/* Why necessary */}
      <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl px-5 py-3 mb-6 text-violet-200/80 text-sm leading-relaxed">
        <span className="text-violet-400 font-semibold">Why Mastra?</span> — The <code className="text-violet-300 font-mono">createWorkflow</code> + <code className="text-violet-300 font-mono">createStep</code> pattern with Zod schemas gave us structured handoffs, retry logic, typed rejection feedback, and agent event telemetry — for free. A chain of raw LLM calls would have given us none of that.
      </div>

      <ul className="flex flex-col gap-4 text-amber-200/80 text-lg mb-8">
        {[
          { icon: "🔷", text: "createWorkflow() with fully typed Zod steps — no untyped JSON between agents" },
          { icon: "🔁", text: "LLM-as-judge loop: Ogma rejects → rejection_reason[] fed back to Anansi → retry (max 3)" },
          { icon: "📋", text: "Structured rejection reasons force the writer agent to improve on the right axis" },
          { icon: "🗄️", text: "Agent events persisted to Supabase agent_events table — live debug panel in the app" },
        ].map((b) => (
          <li key={b.text} className="flex items-start gap-4">
            <span className="text-xl mt-0.5">{b.icon}</span>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
      <div className="text-amber-400/60 font-mono text-sm italic border-t border-slate-700 pt-4">
        Not "call GPT in a loop". Real agent-to-agent coordination with observable state.
      </div>
    </div>
  );
}

function VoiceSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-4xl mx-auto w-full">
      <SlideLabel>ElevenLabs — Why It Was Necessary</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-8">
        Denzel Narrates. ElevenLabs Delivers.
      </h2>
      <blockquote className="border-l-4 border-amber-500 pl-6 text-3xl md:text-4xl text-amber-300 font-bold italic mb-8">
        "Listen good, nah. This is how it go..."
      </blockquote>

      {/* Why necessary */}
      <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl px-5 py-3 mb-8 text-rose-200/80 text-sm leading-relaxed">
        <span className="text-rose-400 font-semibold">Why ElevenLabs?</span> — Caribbean folklore demands a Caribbean voice. Denzel's Jamaican accent gives these stories the oral tradition weight they need. Text-to-speech isn't an add-on; it's the delivery mechanism. A generic voice would undermine everything the agents built.
      </div>

      <p className="text-xl text-amber-200/80 mb-8 leading-relaxed">
        Anansi's chapters are narrated by <span className="text-amber-300 font-semibold">Denzel</span> — ElevenLabs voice ID <code className="font-mono text-amber-400/80 text-sm">dhwafD61uVd8h85wAZSE</code>, middle-aged Jamaican male, narrative_story use case.
      </p>
      <div className="flex flex-wrap gap-4">
        {["~30s audio per chapter", "Uploaded to Supabase Storage", "Streamed from persistent URL", "Playable offline (cached)"].map((s) => (
          <span key={s} className="bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 text-amber-300 text-sm font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function FalAiSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>fal.ai — Why It Was Necessary</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-6">
        fal.ai FLUX Paints the World
      </h2>

      {/* Why necessary */}
      <div className="bg-sky-900/20 border border-sky-500/30 rounded-xl px-5 py-3 mb-6 text-sky-200/80 text-sm leading-relaxed">
        <span className="text-sky-400 font-semibold">Why fal.ai?</span> — FLUX generates a Studio Ghibli-inspired watercolour illustration per chapter in ~3 seconds for $0.008. We prompt it with the story excerpt + folklore elements — the images give the stories a visual identity that no stock photo library could match.
      </div>

      <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-5 mb-6 font-mono text-sky-300 text-sm leading-relaxed">
        <div className="text-sky-500/60 mb-2 text-xs">// fal.ai FLUX prompt (Imagen agent)</div>
        "Lush Caribbean watercolor illustration of '[chapter excerpt]' featuring [folklore elements]. Studio Ghibli-inspired, warm golden dusk light, vibrant tropical colors, folklore magic."
      </div>
      <div className="flex flex-wrap gap-4">
        {["$0.008/MP", "~3s per image", "Uploaded to Supabase Storage", "Displayed in story reader", "Visual identity per story"].map((s) => (
          <span key={s} className="bg-sky-500/10 border border-sky-500/30 rounded-full px-4 py-2 text-sky-300 text-sm font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function TanStackSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>TanStack Router — Why It Was Necessary</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-6 leading-tight">
        TanStack Router: Type-Safe<br />Routes All the Way Down
      </h2>

      {/* Why necessary */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl px-5 py-3 mb-6 text-amber-200/80 text-sm leading-relaxed">
        <span className="text-amber-400 font-semibold">Why TanStack Router?</span> — Type-safe routing throughout the web app — file-based, fully typed route params, TanStack Router powers every navigation in the SPA. Tanner's router let us build fast with confidence: storyId is inferred, not cast. Wrong IDs are a compile error, not a runtime crash.
      </div>

      <ul className="flex flex-col gap-4 text-amber-200/80 text-lg mb-8">
        {[
          "@tanstack/react-router v1.166.3 — full SPA routing",
          "Type-safe route definitions: pipeline-demo, /stories/$id, /showcase, /slides",
          "File-based routing via Vite plugin — zero manual route registration",
          "Route params fully typed — storyId inferred from the route tree, not cast",
        ].map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="text-amber-500 mt-1">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="text-amber-400/60 font-mono text-sm italic border-t border-slate-700 pt-4">
        This is what Tanner Linsley cares about — and we use it properly. ✓
      </div>
    </div>
  );
}

function DemoSlide() {
  const screens = [
    {
      num: "01",
      label: "Pipeline Demo",
      url: "/pipeline-demo",
      desc: "Watch all five agents fire live — Papa Bois briefs, Anansi writes, Ogma scores, Devi narrates, Imagen illustrates. One click, real pipeline.",
      color: "border-violet-500/40 bg-violet-900/20",
      numColor: "text-violet-400",
    },
    {
      num: "02",
      label: "Story Showcase",
      url: "/showcase",
      desc: "Browse every AI-generated story. Read chapters, play Denzel's audio narration, view the watercolour illustration.",
      color: "border-amber-500/40 bg-amber-900/20",
      numColor: "text-amber-400",
    },
    {
      num: "03",
      label: "iOS App Syncing",
      url: "React Native",
      desc: "Open the iOS app. Stories sync via PowerSync Sync Streams — no manual fetch, no polling. They just appear.",
      color: "border-sky-500/40 bg-sky-900/20",
      numColor: "text-sky-400",
    },
    {
      num: "04",
      label: "Offline Mode",
      url: "DevTools → Offline",
      desc: "Kill the network. Reload. Stories still load from local SQLite. Audio and images still render. This is the point.",
      color: "border-rose-500/40 bg-rose-900/20",
      numColor: "text-rose-400",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Demo Flow</SlideLabel>
      <h2 className="text-3xl md:text-4xl font-black text-amber-100 mb-8 leading-tight">
        Here's What You're About to See
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {screens.map((s) => (
          <div key={s.num} className={`border rounded-xl p-5 ${s.color}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className={`font-mono text-2xl font-black ${s.numColor}`}>{s.num}</span>
              <span className="text-amber-100 font-bold text-base">{s.label}</span>
            </div>
            <div className="text-amber-200/50 text-xs font-mono mb-2">{s.url}</div>
            <div className="text-amber-200/70 text-sm leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-amber-300/50 text-xs font-mono italic">
        All four screens are live at sandsync.reddi.tech — judges can try them now
      </div>
    </div>
  );
}

function PrizesSlide() {
  const prizes = [
    {
      sponsor: "PowerSync",
      prize: "Main prize",
      evidence: "SQLite is the primary data layer — not a cache. Sync Streams edition 3, auto_subscribe, auth.user_id() filtering. Offline story reading on both web and iOS. This is what PowerSync was built for.",
      color: "border-amber-500/40 bg-amber-900/20",
    },
    {
      sponsor: "Local-First",
      prize: "$500",
      evidence: "We don't fall back to the network when offline — we fall back to local SQLite as truth. Edits queue locally and push on reconnect. The app works before the network connects.",
      color: "border-sky-500/30 bg-sky-900/10",
    },
    {
      sponsor: "Supabase",
      prize: "$1,000 credits",
      evidence: "Postgres for story/chapter data, Storage for audio and images, RLS for user isolation, and it's the replication source for PowerSync. The whole system flows through Supabase.",
      color: "border-emerald-500/30 bg-emerald-900/10",
    },
    {
      sponsor: "Mastra",
      prize: "$500",
      evidence: "createWorkflow with Zod-typed steps, LLM-as-judge revision loop, structured rejection_reason[] feedback, and agent events persisted to Supabase. Not a wrapper — real orchestration.",
      color: "border-violet-500/30 bg-violet-900/10",
    },
    {
      sponsor: "TanStack",
      prize: "1:1 with Tanner",
      evidence: "TanStack Router v1.166.3, file-based routing via Vite plugin, fully typed route params across every page. storyId is inferred from the route tree — wrong IDs fail at compile time.",
      color: "border-rose-500/30 bg-rose-900/10",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 max-w-5xl mx-auto w-full">
      <SlideLabel>Why We Deserve Each Prize</SlideLabel>
      <h2 className="text-3xl md:text-4xl font-black text-amber-100 mb-6">
        Prize Targets 🏆
      </h2>
      <div className="flex flex-col gap-3">
        {prizes.map((p) => (
          <div
            key={p.sponsor}
            className={`border rounded-xl px-5 py-3 flex items-start gap-4 ${p.color}`}
          >
            <div className="min-w-[110px]">
              <div className="font-bold text-amber-300 text-sm">{p.sponsor}</div>
              <div className="text-amber-100/50 font-mono text-xs">{p.prize}</div>
            </div>
            <div className="text-amber-200/70 text-sm leading-relaxed border-l border-amber-500/10 pl-4 flex-1">
              {p.evidence}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CloseSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12 max-w-4xl mx-auto w-full">
      <h1 className="text-7xl md:text-9xl font-black tracking-tight text-amber-100 mb-8 drop-shadow-2xl">
        SandSync 🌴
      </h1>
      <p className="text-2xl md:text-3xl text-amber-300 font-light mb-12 max-w-3xl leading-relaxed">
        Caribbean folklore. AI-written. Narrated by Denzel. Illustrated. Yours — offline.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <a
          href="https://sandsync.reddi.tech/pipeline-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          🌴 Live Demo
        </a>
        <a
          href="https://github.com/reddinft/sandsync"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-700 hover:bg-slate-600 text-amber-100 font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-slate-500"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub ↗
        </a>
      </div>
      <div className="text-amber-200/50 text-sm font-mono">
        Nissan Dookeran · Redditech Pty Ltd · Sydney, Australia · PowerSync AI Hackathon 2026
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-amber-500/60 text-xs font-mono tracking-widest uppercase mb-4">
      {children}
    </div>
  );
}

function renderSlide(slide: Slide) {
  switch (slide.kind) {
    case "title":        return <TitleSlide />;
    case "problem":      return <ProblemSlide />;
    case "solution":     return <SolutionSlide />;
    case "pipeline":     return <PipelineSlide />;
    case "architecture": return <ArchitectureSlide />;
    case "powersync":    return <PowerSyncSlide />;
    case "offline":      return <OfflineSlide />;
    case "mastra":       return <MastraSlide />;
    case "voice":        return <VoiceSlide />;
    case "falai":        return <FalAiSlide />;
    case "tanstack":     return <TanStackSlide />;
    case "demo":         return <DemoSlide />;
    case "prizes":       return <PrizesSlide />;
    case "close":        return <CloseSlide />;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

function SlidesComponent() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index < 0 || index >= total) return;
      setDirection(index > current ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 200);
    },
    [animating, current, total]
  );

  const prev = useCallback(() => goTo(current - 1), [goTo, current]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "Escape") navigate({ to: "/" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, navigate]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) return;
      const x = e.clientX;
      const w = window.innerWidth;
      if (x < w / 2) prev();
      else next();
    },
    [prev, next]
  );

  const slide = SLIDES[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900 text-amber-50 flex flex-col cursor-pointer select-none"
      onClick={handleClick}
      style={{ userSelect: "none" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      {/* Slide content */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center overflow-hidden"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? direction === "next"
              ? "translateX(20px)"
              : "translateX(-20px)"
            : "translateX(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {renderSlide(slide)}
      </div>

      {/* Navigation hints */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-3 z-20 pointer-events-none">
        {current > 0 && (
          <span className="text-amber-500/30 text-3xl">‹</span>
        )}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-3 z-20 pointer-events-none">
        {current < total - 1 && (
          <span className="text-amber-500/30 text-3xl">›</span>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-20 flex items-center justify-between px-8 py-4 pointer-events-none">
        <div className="text-amber-500/40 text-xs font-mono">
          Press <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-amber-300/60">ESC</kbd> to exit
        </div>
        <div className="text-amber-400/60 font-mono text-sm">
          {current + 1} / {total}
        </div>
      </div>
    </div>
  );
}
