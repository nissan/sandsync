import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://houtondlrbwaosdwqyiu.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdXRvbmRscmJ3YW9zZHdxeWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTE1OTIsImV4cCI6MjA4ODU4NzU5Mn0.W9TPInETfmcBv4jXsAZarVCjqTlT_Trdl91WyTME6tk";

export const POWERSYNC_URL =
  "https://69ae074bd42a43395100b01b.powersync.journeyapps.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export class SupabaseConnector {
  client = supabase;

  async fetchCredentials() {
    // Use anon key directly for public/read-only access
    return {
      endpoint: POWERSYNC_URL,
      token: SUPABASE_ANON_KEY,
    };
  }

  async uploadData(_database: unknown) {
    // Read-only app — no uploads needed
  }
}
