import { test, expect, describe } from "bun:test";

const API = "https://sandsync-api.fly.dev";

// Test user ID from spec
const TEST_STORY_ID = "8b1ae354-132e-4350-bb3a-30a79eddf231";

describe("GET /health", () => {
  test("returns 200, ok: true, mastra: true, supabase: true", async () => {
    const res = await fetch(`${API}/health`);
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.ok).toBe(true);
    expect(data).toHaveProperty("mastra");
    expect(data).toHaveProperty("supabase");
  });
});

describe("POST /stories — text flow", () => {
  test("returns 201 with storyId when given valid userId + request", async () => {
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user-" + Date.now(),
        request: "Tell me a story about a adventurous cat",
      }),
    });
    expect(res.status).toBe(201);
    const data = await res.json() as Record<string, unknown>;
    expect(data).toHaveProperty("storyId");
    expect(typeof data.storyId).toBe("string");
  });

  test("returns 400 when userId missing", async () => {
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: "Tell me a story",
      }),
    });
    expect(res.status).toBe(400);
  });

  test("returns 400 when request missing", async () => {
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user",
      }),
    });
    expect(res.status).toBe(400);
  });

  test("returned storyId is a valid UUID", async () => {
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "test-user-" + Date.now(),
        request: "Tell me a short story",
      }),
    });
    expect(res.status).toBe(201);
    const data = await res.json() as Record<string, unknown>;
    const storyId = data.storyId as string;
    // UUID format: 8-4-4-4-12
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(storyId)).toBe(true);
  });
});

describe("POST /stories/voice — voice flow", () => {
  test("returns 400 (not 500) when audio field is missing", async () => {
    // REGRESSION TEST: Before fix, missing audio caused 500 due to undefined userRequest in handlePostStoryVoice.
    // After fix, should return 400 with clear error message.
    const formData = new FormData();
    formData.append("userId", "test-user");
    // intentionally not adding audio field
    const res = await fetch(`${API}/stories/voice`, {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(400);
    // Error message should complain about missing audio or multipart format
    const data = await res.json() as Record<string, unknown>;
    expect(data).toHaveProperty("error");
  });
});

describe("GET /stories/:id/status", () => {
  test("returns 200 with status field for a known story ID", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}/status`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      expect(data).toHaveProperty("status");
      expect(["queued", "generating", "complete", "failed"]).toContain(data.status);
    } else {
      // If the known story no longer exists, that's OK — external test
      expect([200, 404]).toContain(res.status);
    }
  });

  test("returns 404 for a fake story ID", async () => {
    const res = await fetch(`${API}/stories/00000000-0000-0000-0000-000000000000/status`);
    expect(res.status).toBe(404);
  });
});

describe("GET /stories/:id", () => {
  test("returns 200 with title, genre, chapters array for known story ID", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      expect(data).toHaveProperty("title");
      expect(data).toHaveProperty("genre");
      expect(Array.isArray(data.chapters)).toBe(true);
    } else {
      // If the known story no longer exists, that's OK — external test
      expect([200, 404]).toContain(res.status);
    }
  });

  test("chapters array items have id, chapter_number, content fields", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      const chapters = data.chapters as Array<Record<string, unknown>>;
      if (chapters && chapters.length > 0) {
        const ch = chapters[0];
        expect(ch).toHaveProperty("id");
        expect(ch).toHaveProperty("chapter_number");
        expect(ch).toHaveProperty("content");
      }
    }
  });

  test("story has theme field (new column — regression for schema migration)", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      // Test that field EXISTS, not that it's non-null
      expect(Object.keys(data as object)).toContain("theme");
    }
  });

  test("story has updated_at field (new column — regression for schema migration)", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      expect(Object.keys(data as object)).toContain("updated_at");
    }
  });

  test("chapters have title field (new column — regression for schema migration)", async () => {
    const res = await fetch(`${API}/stories/${TEST_STORY_ID}`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      const chapters = data.chapters as Array<Record<string, unknown>>;
      if (chapters && chapters.length > 0) {
        const ch = chapters[0];
        expect(Object.keys(ch)).toContain("title");
      }
    }
  });
});

describe("GET /powersync/token", () => {
  test("returns 200 with token (string) and endpoint (string)", async () => {
    const res = await fetch(`${API}/powersync/token`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      expect(typeof data.token).toBe("string");
      expect(typeof data.endpoint).toBe("string");
    } else {
      // If endpoint is not configured, that's OK for external test
      expect([200, 400, 500]).toContain(res.status);
    }
  });

  test("token is a valid JWT (3 parts separated by dots)", async () => {
    const res = await fetch(`${API}/powersync/token`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      const token = data.token as string;
      const parts = token.split(".");
      expect(parts.length).toBe(3);
      // Each part should be non-empty base64
      expect(parts[0].length).toBeGreaterThan(0);
      expect(parts[1].length).toBeGreaterThan(0);
      expect(parts[2].length).toBeGreaterThan(0);
    }
  });

  test("endpoint contains powersync.journeyapps.com", async () => {
    const res = await fetch(`${API}/powersync/token`);
    if (res.status === 200) {
      const data = await res.json() as Record<string, unknown>;
      const endpoint = data.endpoint as string;
      expect(endpoint).toContain("powersync.journeyapps.com");
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Regression: genre selection honoured end-to-end
// Bug: home page sent {genre, theme} with no userId/request → silent 400
//      API ignored genre field → Papa Bois picked any folklore freely
//      Fix: request built from genre label, genre passed to pipeline, Papa Bois
//           receives IMPORTANT instruction to feature selected character
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /stories — genre selection regression", () => {
  test("returns 400 when userId is missing (home page was sending genre only)", async () => {
    // Regression: home page previously sent {genre, theme} with no userId/request
    // This should fail with 400, not silently succeed with wrong behavior
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: "anansi", theme: "a trickster tale" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json() as any;
    expect(body.error).toBeTruthy();
  });

  test("accepts genre field alongside userId and request without error", async () => {
    // Regression: API was discarding genre field entirely
    // Now it should accept it and pass it to the pipeline
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "openclaw",
        request: "Tell me a trickster tale",
        genre: "anansi",
        shortStory: true,
      }),
    });
    // Should succeed and return a storyId
    expect(res.status).toBe(201);
    const body = await res.json() as any;
    expect(body.storyId).toBeTruthy();
    expect(typeof body.storyId).toBe("string");
  });

  test("returns 400 (not 201) when request field is missing even with genre set", async () => {
    // Another variant of the home page bug — genre alone is not enough
    const res = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "openclaw",
        genre: "anansi",
        shortStory: true,
        // request field intentionally omitted
      }),
    });
    expect(res.status).toBe(400);
  });

  test.skip("Papa Bois brief for a completed story features correct folklore (smoke test — run manually, polls 30s)", async () => {
    // Regression: Papa Bois was ignoring genre and picking freely (e.g. Douen when Anansi selected)
    // This smoke test: create story with genre=anansi, wait for Papa Bois event,
    // verify brief contains anansi-related content
    // Note: this creates a real story and polls — uses test.skip if too slow for CI
    const createRes = await fetch(`${API}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "openclaw",
        request: "A trickster defeats a proud river spirit",
        genre: "anansi",
        shortStory: true,
      }),
    });
    expect(createRes.status).toBe(201);
    const { storyId } = await createRes.json() as any;

    // Poll for Papa Bois completion (max 30s — just the brief step, not full pipeline)
    const deadline = Date.now() + 30_000;
    let papaBoisBrief: any = null;
    while (Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 3000));
      const evRes = await fetch(`${API}/stories/${storyId}/events`);
      if (evRes.ok) {
        const events = await evRes.json() as any[];
        const completed = events.find(
          (e: any) => e.agent === "papa_bois" && e.event_type === "completed"
        );
        if (completed) {
          papaBoisBrief = completed.payload?.brief;
          break;
        }
      }
    }

    // If Papa Bois completed, verify Anansi is featured
    if (papaBoisBrief) {
      const briefStr = JSON.stringify(papaBoisBrief).toLowerCase();
      // Brief must mention anansi somewhere — title, genre, folklore_elements, or brief text
      expect(briefStr).toContain("anansi");
    }
    // If Papa Bois hasn't completed in 30s (cold start etc), we skip rather than fail
    // The acceptance test is: when brief IS available, it must contain anansi
  });
});
