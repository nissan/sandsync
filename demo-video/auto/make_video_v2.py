#!/usr/bin/env python3
"""
make_video_v2.py — Master orchestrator for the SandSync demo v3 pipeline.

Usage:
    python make_video_v2.py                         # Full pipeline (VO → slides → record → compose)
    python make_video_v2.py --vo-only               # Just VO generation
    python make_video_v2.py --slides-only           # Just screenshot slides
    python make_video_v2.py --record-only           # Just record browser scenes
    python make_video_v2.py --compose               # Just compose (assumes recorded)
    python make_video_v2.py --scene b c             # Full pipeline for only these browser scenes
    python make_video_v2.py --scene e --compose     # Re-compose only scene E
    python make_video_v2.py --skip-vo --skip-slides # Skip VO and slides, re-record + compose
"""

import os
import sys
import argparse
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PYTHON = sys.executable


def run_script(script: str, extra_args: list = None):
    cmd = [PYTHON, os.path.join(BASE_DIR, script)]
    if extra_args:
        cmd.extend(extra_args)
    print(f"\n{'='*60}")
    print(f"▶  Running: {' '.join(cmd)}")
    print(f"{'='*60}")
    result = subprocess.run(cmd, cwd=BASE_DIR)
    if result.returncode != 0:
        print(f"❌ {script} failed with exit code {result.returncode}")
        sys.exit(1)
    return result


def main():
    parser = argparse.ArgumentParser(
        description="SandSync Demo v3 Video Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument("--scene", nargs="+", metavar="S",
                        help="Browser scene(s) to process: b c e f (or 'slides' for slide screenshots)")
    parser.add_argument("--vo-only", action="store_true", help="Only generate VO audio")
    parser.add_argument("--slides-only", action="store_true", help="Only screenshot slides")
    parser.add_argument("--record-only", action="store_true", help="Only record browser scenes")
    parser.add_argument("--compose", action="store_true", help="Only compose (assumes recorded)")
    parser.add_argument("--skip-vo", action="store_true", help="Skip VO generation step")
    parser.add_argument("--skip-slides", action="store_true", help="Skip slide screenshots step")
    parser.add_argument("--skip-record", action="store_true", help="Skip recording step")

    args = parser.parse_args()

    print("🎬 SandSync Demo v3 Pipeline")
    print("=" * 60)

    # ── Single-mode shortcuts ──────────────────────────────
    if args.vo_only:
        print("Mode: VO generation only")
        run_script("generate_vo_v2.py")
        return

    if args.slides_only:
        print("Mode: Slide screenshots only")
        record_args = ["--scene", "slides"]
        run_script("record_scenes_v2.py", record_args)
        return

    if args.record_only:
        print("Mode: Recording only")
        record_args = (["--scene"] + args.scene) if args.scene else []
        run_script("record_scenes_v2.py", record_args if record_args else None)
        return

    if args.compose:
        print("Mode: Compositing only")
        compose_args = (["--scene"] + args.scene) if args.scene else []
        run_script("compose_v2.py", compose_args if compose_args else None)
        return

    # ── Full pipeline ──────────────────────────────────────
    if args.scene:
        print(f"Mode: Full pipeline for scene(s): {args.scene}")
    else:
        print("Mode: Full pipeline (all scenes)")

    # Step 1: VO generation
    if not args.skip_vo:
        print("\n📣 Step 1/4: Generating voiceover audio...")
        run_script("generate_vo_v2.py")
    else:
        print("\n⏭  Step 1/4: Skipping VO generation")

    # Step 2: Slide screenshots
    if not args.skip_slides:
        print("\n📸 Step 2/4: Screenshotting slides...")
        run_script("record_scenes_v2.py", ["--scene", "slides"])
    else:
        print("\n⏭  Step 2/4: Skipping slide screenshots")

    # Step 3: Scene recording
    if not args.skip_record:
        print("\n📹 Step 3/4: Recording browser scenes...")
        # Record browser scenes (not slides — already done)
        browser_scenes = args.scene if args.scene else ["b", "c", "e", "f"]
        # Filter out 'slides' if user passed it
        browser_scenes = [s for s in browser_scenes if s != "slides"]
        if browser_scenes:
            run_script("record_scenes_v2.py", ["--scene"] + browser_scenes)
    else:
        print("\n⏭  Step 3/4: Skipping scene recording")

    # Step 4: Compose + stitch
    print("\n🎞  Step 4/4: Compositing and stitching...")
    compose_args = (["--scene"] + args.scene) if args.scene else []
    # Filter 'slides' from compose args
    compose_args = [a for a in compose_args if a != "slides"]
    run_script("compose_v2.py", compose_args if compose_args else None)

    print("\n" + "=" * 60)
    print("✅ Pipeline complete!")
    final = os.path.join(BASE_DIR, "demo-final-v3.mp4")
    if os.path.exists(final):
        size_mb = os.path.getsize(final) / 1024 / 1024
        print(f"📦 Output: {final} ({size_mb:.1f} MB)")
    else:
        print("⚠️  demo-final-v3.mp4 not found — check logs above for errors")


if __name__ == "__main__":
    main()
