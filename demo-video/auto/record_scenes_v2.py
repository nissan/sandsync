#!/usr/bin/env python3
"""
record_scenes_v2.py — Record all SandSync demo v3 scenes using Playwright.

New structure:
  slide_screenshots — Screenshot 12 slides from /slides
  scene_b — Showcase (live browser, image pre-warm)
  scene_c — Story Reader + Offline Demo
  scene_e_raw — Live Pipeline (recorded in full, speed-up applied in compose)
  scene_f — Result (live browser, image pre-warm)

Slide-based scenes (INTRO, A, D, OUTRO) are rendered from PNGs in compose_v2.py.
"""

import asyncio
import os
import sys
import glob
import json
import argparse
import time
import shutil

from playwright.async_api import async_playwright, Page, BrowserContext

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENES_DIR = os.path.join(BASE_DIR, "scenes")
SLIDES_DIR = os.path.join(BASE_DIR, "slides")
META_PATH = os.path.join(BASE_DIR, "scenes_meta_v2.json")

FRONTEND_URL = "https://web-eta-black-15.vercel.app"
VIEWPORT = {"width": 1440, "height": 900}

os.makedirs(SCENES_DIR, exist_ok=True)
os.makedirs(SLIDES_DIR, exist_ok=True)

# Known-good story for Scene C
STORY_C_URL = f"{FRONTEND_URL}/stories/888b6736-ce03-4d4c-941f-7ea3ee3e48f2"


def load_meta():
    if os.path.exists(META_PATH):
        with open(META_PATH) as f:
            return json.load(f)
    return {}


def save_meta(meta):
    with open(META_PATH, "w") as f:
        json.dump(meta, f, indent=2)


async def new_context(browser, scene_name: str):
    """Create a new browser context with video recording."""
    scene_dir = os.path.join(SCENES_DIR, f"raw_{scene_name}")
    os.makedirs(scene_dir, exist_ok=True)
    ctx = await browser.new_context(
        record_video_dir=scene_dir,
        record_video_size=VIEWPORT,
        viewport=VIEWPORT,
        color_scheme="dark",
    )
    return ctx


async def finalize_scene(ctx: BrowserContext, scene_name: str) -> str:
    """Close context (finalises webm) and rename to scene_NAME_raw.webm"""
    await ctx.close()
    scene_dir = os.path.join(SCENES_DIR, f"raw_{scene_name}")
    webms = glob.glob(os.path.join(scene_dir, "*.webm"))
    if not webms:
        print(f"   ⚠️  No webm found in {scene_dir}")
        return None
    src = sorted(webms)[-1]
    dest = os.path.join(SCENES_DIR, f"scene_{scene_name}_raw.webm")
    shutil.move(src, dest)
    print(f"   📹 Saved: {dest}")
    return dest


async def smooth_scroll(page: Page, delta: int, steps: int = 20, delay: float = 0.05):
    """Scroll smoothly in delta increments."""
    step = delta // steps
    for _ in range(steps):
        await page.mouse.wheel(0, step)
        await asyncio.sleep(delay)


async def wait_for_images(page: Page, timeout: int = 15000):
    """Wait for all images on page to fully load."""
    try:
        await page.wait_for_function(
            """
            () => {
                const imgs = document.querySelectorAll('img');
                if (imgs.length === 0) return true;
                return Array.from(imgs).every(img => img.complete && img.naturalHeight > 0);
            }
            """,
            timeout=timeout
        )
        print("   🖼  All images loaded")
    except Exception as e:
        print(f"   ⚠️  Image wait timeout: {e} — continuing anyway")


# ─────────────────────────────────────────────
# SLIDE SCREENSHOTS — Screenshot all 12 slides
# ─────────────────────────────────────────────
async def screenshot_slides(browser):
    """Screenshot each of the 12 slides and save as slide_01.png through slide_12.png."""
    print("\n📸 Screenshotting slides...")
    ctx = await browser.new_context(viewport=VIEWPORT, color_scheme="dark")
    page = await ctx.new_page()

    await page.goto(f"{FRONTEND_URL}/slides", wait_until="load", timeout=45000)
    await asyncio.sleep(5)  # let animations and JS settle (slides may have transitions)

    saved = []
    for i in range(1, 13):
        out_path = os.path.join(SLIDES_DIR, f"slide_{i:02d}.png")
        if os.path.exists(out_path):
            print(f"   ⏭  slide_{i:02d}.png already exists — skipping")
            saved.append(out_path)
            if i < 12:
                # Still advance slide for proper positioning
                await page.keyboard.press("ArrowRight")
                await asyncio.sleep(0.8)
            continue

        await page.screenshot(path=out_path, full_page=False)
        print(f"   📸 slide_{i:02d}.png")
        saved.append(out_path)

        if i < 12:
            await page.keyboard.press("ArrowRight")
            await asyncio.sleep(0.8)  # wait for slide transition

    await ctx.close()
    print(f"   ✅ {len(saved)} slides saved to {SLIDES_DIR}")
    return saved


# ─────────────────────────────────────────────
# SCENE B — Showcase (live browser, ~20s)
# ─────────────────────────────────────────────
async def scene_b(browser):
    print("\n🎬 Scene B — Showcase")
    ctx = await new_context(browser, "b")
    page = await ctx.new_page()

    # Navigate and wait for page load, then explicitly wait for images
    await page.goto(f"{FRONTEND_URL}/showcase", wait_until="load", timeout=45000)
    print("   ⏳ Pre-warming: waiting for images...")
    await asyncio.sleep(3)  # initial render time
    await wait_for_images(page, timeout=20000)
    await asyncio.sleep(3)  # extra buffer — recording starts NOW with images visible

    # Scroll slowly through showcase cards
    await smooth_scroll(page, 500, steps=40, delay=0.1)
    await asyncio.sleep(2)

    # Hover over first story card
    try:
        card = (
            await page.query_selector("[data-testid='story-card']") or
            await page.query_selector(".story-card") or
            await page.query_selector("article") or
            await page.query_selector(".card")
        )
        if card:
            await card.hover()
            await asyncio.sleep(2)
    except Exception as e:
        print(f"   ⚠️  Hover failed: {e}")

    await asyncio.sleep(2)
    return await finalize_scene(ctx, "b")


# ─────────────────────────────────────────────
# SCENE C — Story Reader + Offline Demo (~35s)
# ─────────────────────────────────────────────
async def scene_c(browser):
    print("\n🎬 Scene C — Story Reader + Offline Demo")
    ctx = await new_context(browser, "c")
    page = await ctx.new_page()

    # Navigate to known-good story
    print(f"   🔗 Loading: {STORY_C_URL}")
    await page.goto(STORY_C_URL, wait_until="load", timeout=45000)
    await asyncio.sleep(3)  # initial render time

    # Pre-warm: wait for image to render (CRITICAL for offline to work)
    print("   ⏳ Pre-warming: waiting for story image...")
    await wait_for_images(page, timeout=15000)
    await asyncio.sleep(5)  # 5s dwell to let PowerSync sync story to local SQLite

    # Show story title area first
    await asyncio.sleep(2)

    # Scroll to image
    await smooth_scroll(page, 400, steps=40, delay=0.1)
    await asyncio.sleep(2)

    # Scroll to audio player
    await smooth_scroll(page, 300, steps=30, delay=0.1)
    await asyncio.sleep(2)

    # Click play on audio
    try:
        audio_btn = (
            await page.query_selector("button[aria-label='Play']") or
            await page.query_selector("button:has-text('Play')") or
            await page.query_selector("[data-testid='audio-player'] button")
        )
        if audio_btn:
            await audio_btn.click()
            print("   ▶️  Audio playing")
            await asyncio.sleep(5)  # let 5s of audio play
        else:
            # Try clicking any button near audio element
            audio_el = await page.query_selector("audio")
            if audio_el:
                await page.evaluate("document.querySelector('audio').play()")
                print("   ▶️  Audio playing via JS")
                await asyncio.sleep(5)
            else:
                print("   ⚠️  No audio control found")
                await asyncio.sleep(5)
    except Exception as e:
        print(f"   ⚠️  Audio play: {e}")
        await asyncio.sleep(5)

    # ─── OFFLINE DEMO ───
    print("   📴 Going offline via CDP...")
    await ctx.set_offline(True)
    await asyncio.sleep(0.5)

    # Hard reload (bypass cache — forces PowerSync to serve from local SQLite)
    print("   🔄 Hard reloading offline...")
    await page.evaluate("window.location.reload()")
    await asyncio.sleep(5)  # wait for PowerSync to serve from local SQLite

    # Show page is still loaded (offline badge should be visible)
    print("   👁  Showing offline state...")
    await asyncio.sleep(3)

    # Scroll back to top to show nav offline badge
    await page.evaluate("window.scrollTo({top: 0, behavior: 'smooth'})")
    await asyncio.sleep(2)

    # Back online
    print("   📶 Back online...")
    await ctx.set_offline(False)
    await asyncio.sleep(2)

    return await finalize_scene(ctx, "c")


# ─────────────────────────────────────────────
# SCENE E — Live Pipeline (full recording, ~60s)
# ─────────────────────────────────────────────
async def scene_e(browser, meta: dict):
    print("\n🎬 Scene E — Live Pipeline Generation")
    ctx = await new_context(browser, "e")
    page = await ctx.new_page()

    story_id = None
    new_story_url = None

    async def handle_response(response):
        nonlocal story_id, new_story_url
        try:
            if response.status in (200, 201):
                url = response.url
                if any(k in url for k in ["/api/pipeline", "/api/stories", "pipeline"]):
                    try:
                        body = await response.json()
                        if isinstance(body, dict):
                            sid = (body.get("id") or body.get("storyId") or
                                   body.get("story_id") or
                                   (body.get("story") or {}).get("id"))
                            if sid:
                                story_id = sid
                                print(f"   🆔 Story ID captured: {story_id}")
                    except Exception:
                        pass
        except Exception:
            pass

    page.on("response", handle_response)

    await page.goto(f"{FRONTEND_URL}/pipeline-demo", wait_until="load", timeout=30000)
    await asyncio.sleep(3)

    PROMPT = (
        "A fisherman on the coast of Trinidad makes a deal with Mama Dlo, the river spirit, "
        "to find his missing daughter. She warns him: the price is always higher than you think."
    )

    # Type prompt slowly for visual effect
    try:
        textarea = (
            await page.query_selector("textarea") or
            await page.query_selector("[placeholder*='prompt']") or
            await page.query_selector("[placeholder*='story']") or
            await page.query_selector("input[type='text']")
        )
        if textarea:
            await textarea.click()
            await textarea.fill("")
            await asyncio.sleep(0.3)
            await textarea.type(PROMPT, delay=18)
            await asyncio.sleep(1)
        else:
            print("   ⚠️  No textarea found")
    except Exception as e:
        print(f"   ⚠️  Textarea: {e}")

    # Check Quick demo checkbox
    try:
        checkbox = (
            await page.query_selector("input[type='checkbox']") or
            await page.query_selector("[role='checkbox']")
        )
        if checkbox:
            aria_checked = await checkbox.get_attribute("aria-checked")
            is_checked_attr = await checkbox.get_attribute("checked")
            is_checked = is_checked_attr is not None or aria_checked == "true"
            if not is_checked:
                await checkbox.click()
                await asyncio.sleep(0.5)
                print("   ✅ Checked 'Quick demo'")
        else:
            print("   ⚠️  No checkbox found")
    except Exception as e:
        print(f"   ⚠️  Checkbox: {e}")

    # Click Run Pipeline
    try:
        run_btn = (
            await page.query_selector("button:has-text('Run Pipeline')") or
            await page.query_selector("button:has-text('Run')") or
            await page.query_selector("button:has-text('Generate')") or
            await page.query_selector("button[type='submit']")
        )
        if run_btn:
            await run_btn.click()
            print("   🚀 Pipeline started!")
        else:
            print("   ⚠️  No run button found")
    except Exception as e:
        print(f"   ⚠️  Run button: {e}")

    pipeline_start = time.time()

    # Poll for completion (up to 120s)
    print("   ⏳ Polling for completion...")
    COMPLETION_SELECTORS = [
        "text=Pipeline Complete",
        "text=Story complete",
        "text=Complete",
        "text=Done",
        "[data-status='complete']",
        "[data-state='done']",
        ".pipeline-complete",
        "a:has-text('Read Story')",
        "a:has-text('View Story')",
        "button:has-text('Read Story')",
    ]

    completed = False
    for _ in range(40):
        await asyncio.sleep(3)
        for sel in COMPLETION_SELECTORS:
            try:
                el = await page.query_selector(sel)
                if el:
                    elapsed = time.time() - pipeline_start
                    print(f"   ✅ Pipeline complete after {elapsed:.0f}s! (found: {sel})")
                    completed = True
                    break
            except Exception:
                pass
        if completed:
            break

    if not completed:
        print("   ⚠️  Pipeline did not complete in 120s — continuing anyway")

    # Capture story URL from read-story link
    try:
        read_link = (
            await page.query_selector("a:has-text('Read Story')") or
            await page.query_selector("a:has-text('View Story')") or
            await page.query_selector("a[href*='/stories/']")
        )
        if read_link:
            href = await read_link.get_attribute("href")
            if href:
                new_story_url = href if href.startswith("http") else f"{FRONTEND_URL}{href}"
                print(f"   🔗 New story URL: {new_story_url}")
    except Exception:
        pass

    await asyncio.sleep(3)

    if new_story_url:
        meta["new_story_url"] = new_story_url
    if story_id:
        meta["new_story_id"] = story_id
    save_meta(meta)

    return await finalize_scene(ctx, "e")


# ─────────────────────────────────────────────
# SCENE F — Result (~20s)
# ─────────────────────────────────────────────
async def poll_story_complete(story_id: str, timeout_s: int = 180) -> bool:
    """Poll /stories/:id/status until status == 'complete'. Returns True if complete."""
    import urllib.request
    api_url = "https://sandsync-api.fly.dev"
    status_url = f"{api_url}/stories/{story_id}/status"
    deadline = time.time() + timeout_s
    attempt = 0
    while time.time() < deadline:
        attempt += 1
        try:
            req = urllib.request.Request(status_url, headers={"Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=10) as r:
                import json as _json
                data = _json.loads(r.read())
            status = data.get("status", "")
            chapters_complete = data.get("chapters_complete", 0)
            total_chapters = data.get("total_chapters", 1)
            pct = int((chapters_complete / max(total_chapters, 1)) * 100)
            print(f"   ⏳ [{attempt}] Story status: {status} ({pct}% — {chapters_complete}/{total_chapters} chapters)")
            if status == "complete":
                print(f"   ✅ Story complete after {attempt} polls!")
                return True
            elif status in ("failed", "error"):
                print(f"   ❌ Story {status} — stopping poll")
                return False
        except Exception as e:
            print(f"   ⚠️  Poll error (attempt {attempt}): {e}")
        await asyncio.sleep(5)
    print(f"   ⚠️  Story did not complete within {timeout_s}s")
    return False


async def scene_f(browser, meta: dict):
    print("\n🎬 Scene F — Result")

    # Critical: poll API until story is complete before opening browser
    new_story_id = meta.get("new_story_id")
    new_story_url = meta.get("new_story_url")

    if new_story_id:
        print(f"   🔄 Waiting for story {new_story_id[:8]} to complete before recording...")
        is_complete = await poll_story_complete(new_story_id, timeout_s=180)
        if not is_complete:
            print("   ⚠️  Story not complete — will show partial result")
        else:
            print("   ✅ Story confirmed complete — now starting recording")
    else:
        print("   ⚠️  No story ID in meta — cannot poll status, proceeding directly")

    ctx = await new_context(browser, "f")
    page = await ctx.new_page()

    if new_story_url:
        print(f"   🔗 Opening: {new_story_url}")
        await page.goto(new_story_url, wait_until="load", timeout=45000)
        await asyncio.sleep(3)  # initial render time
    else:
        # Fall back to showcase
        print("   ⚠️  No new story URL — falling back to showcase")
        await page.goto(f"{FRONTEND_URL}/showcase", wait_until="load", timeout=30000)
        await asyncio.sleep(3)

    # Pre-warm: wait for images
    print("   ⏳ Pre-warming: waiting for images...")
    await wait_for_images(page, timeout=15000)
    await asyncio.sleep(3)  # extra buffer

    # Show title area
    await asyncio.sleep(2)

    # Scroll to image (pause 3s — image must be visible)
    await smooth_scroll(page, 400, steps=40, delay=0.1)
    await asyncio.sleep(3)

    # Scroll to audio player
    await smooth_scroll(page, 300, steps=30, delay=0.1)
    await asyncio.sleep(2)

    # Click play
    try:
        audio_btn = (
            await page.query_selector("button[aria-label='Play']") or
            await page.query_selector("button:has-text('Play')") or
            await page.query_selector("[data-testid='audio-player'] button")
        )
        if audio_btn:
            await audio_btn.click()
            print("   ▶️  Audio playing")
            await asyncio.sleep(5)
        else:
            audio_el = await page.query_selector("audio")
            if audio_el:
                await page.evaluate("document.querySelector('audio').play()")
                print("   ▶️  Audio via JS")
                await asyncio.sleep(5)
            else:
                print("   ⚠️  No audio control found")
                await asyncio.sleep(5)
    except Exception as e:
        print(f"   ⚠️  Audio play: {e}")
        await asyncio.sleep(5)

    await asyncio.sleep(3)
    return await finalize_scene(ctx, "f")


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
async def record_all(scenes_to_run: list = None):
    meta = load_meta()

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=[
                "--disable-notifications",
                "--disable-infobars",
                "--no-default-browser-check",
                "--hide-crash-restore-bubble",
                "--disable-session-crashed-bubble",
            ]
        )

        try:
            run_all = scenes_to_run is None

            if run_all or "slides" in scenes_to_run:
                slides = await screenshot_slides(browser)
                meta["slides"] = slides
                save_meta(meta)

            if run_all or "b" in scenes_to_run:
                path = await scene_b(browser)
                if path:
                    meta["scene_b_raw"] = path
                    save_meta(meta)

            if run_all or "c" in scenes_to_run:
                path = await scene_c(browser)
                if path:
                    meta["scene_c_raw"] = path
                    save_meta(meta)

            if run_all or "e" in scenes_to_run:
                path = await scene_e(browser, meta)
                if path:
                    meta["scene_e_raw"] = path
                    save_meta(meta)

            if run_all or "f" in scenes_to_run:
                path = await scene_f(browser, meta)
                if path:
                    meta["scene_f_raw"] = path
                    save_meta(meta)

        finally:
            await browser.close()

    save_meta(meta)
    print("\n✅ All scenes recorded. scenes_meta_v2.json updated.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--scene", nargs="+",
        help="Which scene(s) to record: slides b c e f (e.g. --scene c e)"
    )
    args = parser.parse_args()

    asyncio.run(record_all(scenes_to_run=args.scene))
