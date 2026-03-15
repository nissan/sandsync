import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadAudioToSupabase(
  buffer: Buffer,
  storyId: string,
  chapterNum: number
): Promise<string | null> {
  const path = `${storyId}/chapter_${chapterNum}.mp3`;
  const { error } = await supabase.storage
    .from("story-audio")
    .upload(path, buffer, { contentType: "audio/mpeg", upsert: true });
  if (error) {
    console.warn("[Storage] Audio upload failed:", error.message);
    return null;
  }
  const { data } = supabase.storage.from("story-audio").getPublicUrl(path);
  return data.publicUrl;
}
