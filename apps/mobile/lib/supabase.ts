import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://houtondlrbwaosdwqyiu.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdXRvbmRscmJ3YW9zZHdxeWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTE1OTIsImV4cCI6MjA4ODU4NzU5Mn0.W9TPInETfmcBv4jXsAZarVCjqTlT_Trdl91WyTME6tk";

export const POWERSYNC_URL =
  "https://69ae074bd42a43395100b01b.powersync.journeyapps.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dev token for hackathon use — name "openclaw", stored in 1Password: OpenClaw-Agents/PowerSync Dev Token - SandSync
// For production: replace with Supabase session JWT (fetchCredentials should call supabase.auth.getSession())
const POWERSYNC_DEV_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiJvcGVuY2xhdyIsImlhdCI6MTc3MzcwNzEzMywiaXNzIjoiaHR0cHM6Ly9wb3dlcnN5bmMtYXBpLmpvdXJuZXlhcHBzLmNvbSIsImF1ZCI6Imh0dHBzOi8vNjlhZTA3NGJkNDJhNDMzOTUxMDBiMDFiLnBvd2Vyc3luYy5qb3VybmV5YXBwcy5jb20iLCJleHAiOjE3NzM3NTAzMzN9.i0A6GiF7a2IIbuvJTTR44_8VHnwLPy-lKaFLtHmZMJMEajIizXHqkBA4GY0nKNCHZDv9ru8vSd1WwaHOaC-l87zdgPe5vJ89_WOXgj232Uv3c1DXCGYgwaXrpDwMqbSWmg4kffOnUOD5XQQYmd_SAsPve3-LlLoBu2BCOwUtsuiYpnkMbAc2FLNvee_BR0t__v93Bn4VoUq_l52aGrGc3QzGPipR5Nb1ulVa-XRrlBOgRWDbqqZBxIBevaEVUHXqI-k5irridsax7or9yZ_Lzti65uIyXDBmic_0dnnXwXQOxgnbnqA5pA-boyXt_XzMZfFyQjgPrCRnzXFecffJqQ";

export class SupabaseConnector {
  client = supabase;

  async fetchCredentials() {
    return {
      endpoint: POWERSYNC_URL,
      token: POWERSYNC_DEV_TOKEN,
    };
  }

  async uploadData(_database: unknown) {
    // Read-only app — no uploads needed
  }
}
