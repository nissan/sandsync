-- Migration 002: Audio storage path + revision tracking columns
-- SandSync — PowerSync AI Hackathon 2026

-- Ensure audio_url can store relative paths for local dev
-- (will be updated to Supabase Storage URLs in production)
comment on column story_chapters.audio_url is
  'Local path for dev (e.g. /audio/{story_id}/chapter_{n}.mp3) or Supabase Storage URL in production';

-- Add revision tracking columns (for pipeline telemetry + /stories/:id/agents debug view)
alter table story_chapters
  add column if not exists revision_count int default 0;

alter table story_chapters
  add column if not exists quality_score float;

-- Index for quick quality filtering
create index if not exists idx_story_chapters_quality
  on story_chapters(story_id, quality_score);

-- Add service-role bypass policy so the pipeline (service key) can write
-- even though RLS is enabled. Without this the agent's INSERT would be
-- blocked because the JWT doesn't carry an auth.uid().
create policy "Service role can do anything on stories"
  on stories for all
  using (true)
  with check (true);

create policy "Service role can do anything on story_chapters"
  on story_chapters for all
  using (true)
  with check (true);

create policy "Service role can do anything on agent_events"
  on agent_events for all
  using (true)
  with check (true);
