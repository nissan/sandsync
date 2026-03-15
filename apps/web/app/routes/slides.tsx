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
  | { kind: "powersync"; id: number }
  | { kind: "offline"; id: number }
  | { kind: "mastra"; id: number }
  | { kind: "voice"; id: number }
  | { kind: "falai"; id: number }
  | { kind: "tanstack"; id: number }
  | { kind: "prizes"; id: number }
  | { kind: "close"; id: number };

const SLIDES: Slide[] = [
  { kind: "title", id: 1 },
  { kind: "problem", id: 2 },
  { kind: "solution", id: 3 },
  { kind: "pipeline", id: 4 },
  { kind: "powersync", id: 5 },
  { kind: "offline", id: 6 },
  { kind: "mastra", id: 7 },
  { kind: "voice", id: 8 },
  { kind: "falai", id: 9 },
  { kind: "tanstack", id: 10 },
  { kind: "prizes", id: 11 },
  { kind: "close", id: 12 },
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
          "Offline-first AI storytelling",
          "Multi-agent Caribbean folklore pipeline",
          "Synced to every device via PowerSync — even without internet",
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
          "Every AI storytelling tool needs a live internet connection",
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
            desc: "AI agents with cultural names — Papa Bois, Anansi, Ogma, Devi, Imagen",
          },
          {
            icon: "⚡",
            label: "Offline-First",
            desc: "PowerSync syncs Supabase → local SQLite → every device",
          },
          {
            icon: "🎙️",
            label: "Living Stories",
            desc: "Illustrated, narrated in authentic Jamaican voice, readable offline",
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
    { name: "Papa Bois", role: "Brief", color: "emerald", icon: "🌿" },
    { name: "Anansi", role: "Claude Sonnet 4.5 — Writes", color: "amber", icon: "🕷️" },
    { name: "Ogma", role: "Groq Llama — Quality Gate 7.5/10, max 3 revisions", color: "violet", icon: "⚖️" },
    { name: "Devi", role: "ElevenLabs — Denzel's Jamaican voice", color: "rose", icon: "🎙️" },
    { name: "Imagen", role: "fal.ai FLUX Schnell — Caribbean watercolour", color: "sky", icon: "🎨" },
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
      <SlideLabel>The Pipeline</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10">
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
    </div>
  );
}

function PowerSyncSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>Architecture</SlideLabel>
      <h2 className="text-3xl md:text-5xl font-black text-amber-100 mb-10 leading-tight">
        PowerSync Is the Foundation —<br />Not an Afterthought
      </h2>
      {/* Flow */}
      <div className="flex items-center gap-2 mb-10 flex-wrap justify-center md:justify-start">
        {[
          "Supabase Postgres",
          "PowerSync Service",
          "PowerSync SDK\n(WebAssembly SQLite)",
          "Local SQLite",
        ].map((node, i, arr) => (
          <div key={node} className="flex items-center gap-2">
            <div className="bg-slate-800/80 border border-amber-500/30 rounded-xl px-4 py-3 text-amber-200 text-sm font-mono text-center whitespace-pre-line">
              {node}
            </div>
            {i < arr.length - 1 && <span className="text-amber-500 text-xl">→</span>}
          </div>
        ))}
      </div>
      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "📖", text: "Stories readable offline" },
          { icon: "🔄", text: "Edits queue locally, sync on reconnect" },
          { icon: "⚡", text: "Real-time updates via Sync Streams" },
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
        </div>
      </div>
      <p className="text-xl text-amber-200/80 mb-8 leading-relaxed">
        Local SQLite is the <span className="text-amber-300 font-semibold">primary data layer</span>. Supabase is the sync target. Not the other way around.
      </p>
      <div className="bg-slate-900/60 border border-amber-500/20 rounded-xl px-6 py-4 font-mono text-amber-400 text-sm">
        Try it: DevTools → Network → Offline → Reload
      </div>
    </div>
  );
}

function MastraSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>Mastra Deep Dive</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10 leading-tight">
        Mastra: Real Orchestration,<br />Not a Wrapper
      </h2>
      <ul className="flex flex-col gap-5 text-amber-200/80 text-xl mb-10">
        {[
          { icon: "🔷", text: "createWorkflow() with typed Zod steps" },
          { icon: "🔁", text: "LLM-as-judge revision loop (Ogma rejects → Anansi revises → retry)" },
          { icon: "📋", text: "Structured rejection_reason[] fed back to writer" },
          { icon: "🗄️", text: "Agent events persisted to Supabase agent_events table — live debug panel" },
        ].map((b) => (
          <li key={b.text} className="flex items-start gap-4">
            <span className="text-xl mt-0.5">{b.icon}</span>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
      <div className="text-amber-400/60 font-mono text-sm italic border-t border-slate-700 pt-4">
        Not just "call GPT". Real agent-to-agent coordination.
      </div>
    </div>
  );
}

function VoiceSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-4xl mx-auto w-full">
      <SlideLabel>The Voice</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10">
        Denzel Narrates. ElevenLabs Delivers.
      </h2>
      <blockquote className="border-l-4 border-amber-500 pl-6 text-3xl md:text-4xl text-amber-300 font-bold italic mb-10">
        "Listen good, nah. This is how it go..."
      </blockquote>
      <p className="text-xl text-amber-200/80 mb-10 leading-relaxed">
        Anansi's stories are narrated by <span className="text-amber-300 font-semibold">Denzel</span> — a Jamaican-accented ElevenLabs voice. Caribbean folklore demands a Caribbean voice.
      </p>
      <div className="flex flex-wrap gap-4">
        {["~30s per chapter", "Uploaded to Supabase Storage", "Streamed from persistent URL"].map((s) => (
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
      <SlideLabel>fal.ai Visuals</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10">
        fal.ai FLUX Paints the World
      </h2>
      <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-6 mb-8 font-mono text-sky-300 text-sm leading-relaxed">
        <div className="text-sky-500/60 mb-2 text-xs">// fal.ai prompt format</div>
        "Lush Caribbean watercolor illustration of '...' featuring [folklore elements]. Studio Ghibli-inspired, warm golden dusk light, vibrant tropical colors, folklore magic."
      </div>
      <div className="flex flex-wrap gap-4">
        {["$0.008/MP", "~3s per image", "Uploaded to Supabase Storage", "Displayed in story reader"].map((s) => (
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
      <SlideLabel>TanStack</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10 leading-tight">
        TanStack Router: Type-Safe<br />Routes All the Way
      </h2>
      <ul className="flex flex-col gap-5 text-amber-200/80 text-xl mb-10">
        {[
          "Full SPA routing with @tanstack/react-router v1.166.3",
          "Type-safe route definitions — pipeline-demo, /stories/$id, /showcase, /slides",
          "File-based routing via Vite plugin",
          "Route params fully typed — storyId inferred, not cast",
        ].map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="text-amber-500 mt-1">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="text-amber-400/60 font-mono text-sm italic border-t border-slate-700 pt-4">
        This is what Tanner Linsley cares about.
      </div>
    </div>
  );
}

function PrizesSlide() {
  const prizes = [
    { sponsor: "PowerSync", prize: "Main prize", evidence: "Real offline-first — SQLite primary layer, not cache" },
    { sponsor: "Local-First", prize: "$500", evidence: "PowerSync SDK + offline demo + reconnect sync" },
    { sponsor: "Supabase", prize: "$1,000 credits", evidence: "Postgres + Storage + RLS — all three" },
    { sponsor: "Mastra", prize: "$500", evidence: "createWorkflow, LLM-as-judge, Zod steps, agent events" },
    { sponsor: "TanStack", prize: "1:1 with Tanner", evidence: "TanStack Router v1.166, type-safe routes, file-based" },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-24 max-w-5xl mx-auto w-full">
      <SlideLabel>Prize Targets</SlideLabel>
      <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-10">
        Prize Targets 🏆
      </h2>
      <div className="flex flex-col gap-3">
        {prizes.map((p) => (
          <div
            key={p.sponsor}
            className="flex items-center gap-0 bg-slate-800/50 border border-amber-500/10 rounded-xl overflow-hidden hover:border-amber-500/30 transition-colors"
          >
            <div className="bg-amber-500/20 px-5 py-4 min-w-[130px] font-bold text-amber-300 text-sm">
              {p.sponsor}
            </div>
            <div className="px-5 py-4 min-w-[140px] text-amber-100 font-mono text-sm border-l border-amber-500/10">
              {p.prize}
            </div>
            <div className="px-5 py-4 text-amber-200/60 text-sm border-l border-amber-500/10 flex-1">
              "{p.evidence}"
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
        Caribbean folklore. AI-written. Narrated. Illustrated. Yours — offline.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <a
          href="https://web-eta-black-15.vercel.app/pipeline-demo"
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
    case "title":     return <TitleSlide />;
    case "problem":   return <ProblemSlide />;
    case "solution":  return <SolutionSlide />;
    case "pipeline":  return <PipelineSlide />;
    case "powersync": return <PowerSyncSlide />;
    case "offline":   return <OfflineSlide />;
    case "mastra":    return <MastraSlide />;
    case "voice":     return <VoiceSlide />;
    case "falai":     return <FalAiSlide />;
    case "tanstack":  return <TanStackSlide />;
    case "prizes":    return <PrizesSlide />;
    case "close":     return <CloseSlide />;
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
      // Don't navigate slide on link clicks
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

      {/* Navigation hints (left/right click zones) */}
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

      {/* Footer: slide counter + ESC hint */}
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
