import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Primitive types ────────────────────────────────────────────────────────────

export type Story = {
  id: string;
  user_id: string;
  title: string | null;
  genre: string | null;
  status: "queued" | "generating" | "complete" | "failed";
  created_at: string;
};

export type RevisionAttempt = {
  attempt: number;
  latency_ms: number;
  tokens: number;
  ogma_score: number;
  approved: boolean;
  rejection_reason?: string[];
};

export type AgentTrace = {
  papa_bois?: {
    latency_ms: number;
    model: string;
    tokens: number;
  };
  anansi?: {
    revisions: number;
    revision_history: RevisionAttempt[];
    final_content_length: number;
  };
  ogma?: {
    model: string;
    cost_usd: number;
    quality_score: number;
    cultural_notes: string;
    changes_made: string[];
    force_approved: boolean;
  };
  devi?: {
    latency_ms: number;
    voice_id: string;
    audio_duration_s: number;
    cost_usd: number;
  } | null;
};

export type StoryChapter = {
  id: string;
  story_id: string;
  chapter_number: number;
  content: string | null;
  reviewed_content: string | null;
  audio_url: string | null;
  revision_count?: number;
  quality_score?: number;
  agent_trace: AgentTrace;
  created_at: string;
};

export type AgentEvent = {
  id: string;
  story_id: string;
  agent: "papa_bois" | "anansi" | "ogma" | "devi" | "pipeline";
  event_type: "started" | "completed" | "failed";
  payload: Record<string, unknown>;
  created_at: string;
};

// ── Database schema types (for typed client) ───────────────────────────────────

export type Database = {
  public: {
    Tables: {
      stories: {
        Row: Story;
        Insert: Omit<Story, "id" | "created_at"> &
          Partial<Pick<Story, "id" | "created_at">>;
        Update: Partial<Omit<Story, "id">>;
      };
      story_chapters: {
        Row: StoryChapter;
        Insert: Omit<StoryChapter, "id" | "created_at"> &
          Partial<Pick<StoryChapter, "id" | "created_at">>;
        Update: Partial<Omit<StoryChapter, "id">>;
      };
      agent_events: {
        Row: AgentEvent;
        Insert: Omit<AgentEvent, "id" | "created_at"> &
          Partial<Pick<AgentEvent, "id" | "created_at">>;
        Update: Partial<Omit<AgentEvent, "id">>;
      };
    };
  };
};
