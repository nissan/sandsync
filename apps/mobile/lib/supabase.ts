import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://houtondlrbwaosdwqyiu.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdXRvbmRscmJ3YW9zZHdxeWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTE1OTIsImV4cCI6MjA4ODU4NzU5Mn0.W9TPInETfmcBv4jXsAZarVCjqTlT_Trdl91WyTME6tk";

export const POWERSYNC_URL =
  "https://69ae074bd42a43395100b01b.powersync.journeyapps.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dev token for hackathon use — name "openclaw", stored in 1Password: OpenClaw-Agents/PowerSync Dev Token - SandSync
// For production: replace with Supabase session JWT (fetchCredentials should call supabase.auth.getSession())
// Token generated: 2026-03-21 10:15 AEST, expires 2026-03-22 10:15 AEST. Regenerate with: npx powersync generate token --subject openclaw --project-id 69ae074a80997e00088a7f70 --instance-id 69ae074bd42a43395100b01b --expires-in-seconds 86400
const POWERSYNC_DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiJvcGVuY2xhdyIsImlhdCI6MTc3NDA0ODUyMywiaXNzIjoiaHR0cHM6Ly9wb3dlcnN5bmMtYXBpLmpvdXJuZXlhcHBzLmNvbSIsImF1ZCI6Imh0dHBzOi8vNjlhZTA3NGJkNDJhNDMzOTUxMDBiMDFiLnBvd2Vyc3luYy5qb3VybmV5YXBwcy5jb20iLCJleHAiOjE3NzQxMzQ5MjN9.o_yTh5qLWYEGnvW0iKPPmBGpnBr1ItaFKitJRfp4txac9xDOlgZWHWbQ6_vZaU8mqODp6L_oxtdxnezThvm2aMAY_IjP7ujVZXByDZV1XMeeRsa-nanecmJCNR1t8Oiyl4DKzf2Y-6gDQegzYl7_6HfiKyTkQJ_-YSBzLt4POzIpMUp79qzLXFj6gKvU6rWdbo7AHBHOxOR4GZA66qN7Tt3X5KMDafqZBppZJiGnnGIswPB4TCkqn7sBUlJYZwzjhuDMDWlrUEkTHTDDuZ8Z9IAzr0320PA1khzIpE25U93mWxy0NFiFXuKTNd1CGhfSmYKj2H7hTZC_XJ5QhL4DhA";

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
