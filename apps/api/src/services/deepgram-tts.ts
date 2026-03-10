/**
 * Deepgram TTS Fallback Service
 *
 * Used when ElevenLabs quota is exceeded or key is missing.
 * Deepgram Aura models: $0.015/1k chars (~$200 free credit available)
 *
 * Voice: aura-asteria-en (warm, storytelling-suitable)
 */

const DEEPGRAM_TTS_URL = "https://api.deepgram.com/v1/speak";
const DEEPGRAM_VOICE = "aura-asteria-en";
const DEEPGRAM_TIMEOUT_MS = 30_000;

export interface NarrationResult {
  audioBuffer: Buffer;
  durationSeconds: number;
  voiceId: string;
  modelId: string;
}

export async function generateNarrationDeepgram(
  text: string
): Promise<NarrationResult | null> {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    console.warn("[Deepgram-TTS] DEEPGRAM_API_KEY not set — skipping");
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEEPGRAM_TIMEOUT_MS);

  try {
    console.log(`[Deepgram-TTS] 🎙 Generating narration (${text.length} chars)...`);
    const response = await fetch(`${DEEPGRAM_TTS_URL}?model=${DEEPGRAM_VOICE}`, {
      method: "POST",
      headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Deepgram-TTS] API error (${response.status}): ${(await response.text()).slice(0, 200)}`);
      return null;
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    const durationSeconds = Math.round((text.length / 5 / 150) * 60);
    const cost = (text.length / 1000) * 0.015;
    console.log(`[Deepgram-TTS] ✅ ${audioBuffer.length} bytes (~${durationSeconds}s, ~$${cost.toFixed(4)})`);

    return { audioBuffer, durationSeconds, voiceId: DEEPGRAM_VOICE, modelId: "deepgram-aura" };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[Deepgram-TTS] ${(err as Error).name === "AbortError" ? "Timeout" : "Error"}: ${(err as Error).message}`);
    return null;
  }
}

export function estimateDeepgramTTSCost(textLength: number): number {
  return parseFloat(((textLength / 1000) * 0.015).toFixed(4));
}
