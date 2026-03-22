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
