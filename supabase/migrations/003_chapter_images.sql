-- Migration 003: Chapter images for Gemini Imagen integration
-- SandSync — PowerSync AI Hackathon 2026

-- Add image_url column to story_chapters for Imagen-generated illustrations
alter table story_chapters
  add column if not exists image_url text comment 'URL to chapter illustration (Gemini Imagen generated)';

alter table story_chapters
  add column if not exists illustration_prompt text comment 'Prompt used to generate the chapter image';

-- Index for quick image availability filtering
create index if not exists idx_story_chapters_image
  on story_chapters(story_id, image_url);
