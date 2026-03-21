#!/usr/bin/env python3
"""
compose_v4.py — SandSync Demo v4 Compositor

Builds the final ~3min video with:
  INTRO  — REUSE v3_intro_composed.mp4
  SCENE A — slides 03+05+TanStack_slide with NEW v4 VO
  SCENE B — live showcase browser with NEW v4 VO
  SCENE C1 — REUSE story reader + offline demo (v3_scene_c_composed.mp4)
  SCENE D — slides 04+07 with NEW v4 VO (longer: 22s agents description)
  SCENE E — REUSE v3_scene_e_composed.mp4
  SCENE F — result with NEW v4 VO
  SCENE G — NEW split screen (pipeline left + simulator right) + PLACEHOLDER VO
  SCENE H — NEW offline slideshow + NEW v4 VO
  OUTRO   — REUSE v3_outro_composed.mp4

Usage:
  python compose_v4.py                    # compose all
  python compose_v4.py --scene g h       # recompose specific scenes
"""

import os
import sys
import subprocess
import argparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENES_DIR = os.path.join(BASE_DIR, "scenes")
VO_DIR = os.path.join(BASE_DIR, "vo")
SLIDES_DIR = os.path.join(BASE_DIR, "slides")

FFMPEG = "/opt/homebrew/bin/ffmpeg"
FFPROBE = "/opt/homebrew/bin/ffprobe"

FINAL_OUTPUT = os.path.expanduser("~/projects/sandsync/demo-video/sandsync-demo-DRAFT-v4.mp4")


def run(cmd: list, check=True):
    print(f"  $ {' '.join(str(c) for c in cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"  STDERR: {result.stderr[-2000:]}")
        raise RuntimeError(f"Command failed: {cmd[0]}")
    return result


def get_duration(path: str) -> float:
    result = subprocess.run(
        [FFPROBE, "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", path],
        capture_output=True, text=True
    )
    try:
        return float(result.stdout.strip())
    except ValueError:
        return 0.0


def webm_to_mp4(webm_path: str, mp4_path: str, force: bool = False):
    if os.path.exists(mp4_path) and not force:
        print(f"  ⏭  {os.path.basename(mp4_path)} already exists, skipping conversion")
        return
    run([FFMPEG, "-y", "-i", webm_path,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         mp4_path])


def slide_to_mp4(slide_png: str, out_mp4: str, duration: float = 3.0, force: bool = False):
    """Convert a slide PNG to a video segment with fade-in and fade-out."""
    if os.path.exists(out_mp4) and not force:
        print(f"  ⏭  {os.path.basename(out_mp4)} already exists, skipping")
        return

    fps = 25
    fade_frames = 12
    fade_out_start = max(0.0, duration - fade_frames / fps)

    run([FFMPEG, "-y",
         "-loop", "1",
         "-i", slide_png,
         "-vf", (
             f"scale=1440:900:force_original_aspect_ratio=decrease,"
             f"pad=1440:900:(ow-iw)/2:(oh-ih)/2,"
             f"fade=in:0:{fade_frames},"
             f"fade=out:st={fade_out_start:.3f}:d={fade_frames/fps:.3f}"
         ),
         "-t", str(duration),
         "-r", str(fps),
         "-c:v", "libx264", "-crf", "18", "-preset", "fast",
         "-pix_fmt", "yuv420p",
         "-an",
         out_mp4])


def add_vo_to_video(video_mp4: str, vo_mp3: str, out_mp4: str,
                    vo_delay_ms: int = 500, pad_end: float = 1.0):
    """Add a single VO track to a video with optional delay and end padding."""
    run([FFMPEG, "-y",
         "-i", video_mp4,
         "-i", vo_mp3,
         "-filter_complex",
         (
             f"[1:a]adelay={vo_delay_ms}|{vo_delay_ms}[delayed_a];"
             f"[0:v]tpad=stop_mode=clone:stop_duration={pad_end}[padded_v]"
         ),
         "-map", "[padded_v]",
         "-map", "[delayed_a]",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast",
         "-c:a", "aac", "-b:a", "192k",
         "-shortest",
         out_mp4])


# ─────────────────────────────────────────────
# INTRO — REUSE v3
# ─────────────────────────────────────────────
def compose_intro() -> str:
    out = os.path.join(SCENES_DIR, "v3_intro_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  INTRO: reusing v3_intro_composed.mp4 ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ INTRO: v3_intro_composed.mp4 missing — run compose_v2.py first")
    return None


# ─────────────────────────────────────────────
# SCENE A — slides 03+05+TanStack with NEW v4 VO
# ─────────────────────────────────────────────
def compose_scene_a() -> str:
    print("\n🎞  Compositing SCENE A v4 (slides 3+5+TanStack)...")
    out = os.path.join(SCENES_DIR, "v4_scene_a_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide3 = os.path.join(SLIDES_DIR, "slide_03.png")
    slide5 = os.path.join(SLIDES_DIR, "slide_05.png")
    slide_ts = os.path.join(SLIDES_DIR, "slide_tanstack.png")  # NEW TanStack slide
    slide4 = os.path.join(SLIDES_DIR, "slide_04.png")         # "Built for hackathon"

    s3_mp4 = os.path.join(SCENES_DIR, "v4_slide_03.mp4")
    s5_mp4 = os.path.join(SCENES_DIR, "v4_slide_05.mp4")
    sts_mp4 = os.path.join(SCENES_DIR, "v4_slide_tanstack.mp4")
    s4_mp4 = os.path.join(SCENES_DIR, "v4_slide_04a.mp4")

    vo = os.path.join(VO_DIR, "v4_scene_a_vo.mp3")
    combined_silent = os.path.join(SCENES_DIR, "v4_scene_a_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v4_scene_a_concat.txt")

    slide_to_mp4(slide3, s3_mp4, duration=3.0)
    slide_to_mp4(slide5, s5_mp4, duration=4.0)
    slide_to_mp4(slide_ts, sts_mp4, duration=5.0)  # TanStack gets prime real estate
    slide_to_mp4(slide4, s4_mp4, duration=3.0)

    with open(concat_txt, "w") as f:
        f.write(f"file '{s3_mp4}'\n")
        f.write(f"file '{s5_mp4}'\n")
        f.write(f"file '{sts_mp4}'\n")
        f.write(f"file '{s4_mp4}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300)
    return out


# ─────────────────────────────────────────────
# SCENE B — showcase with NEW v4 VO
# ─────────────────────────────────────────────
def compose_scene_b() -> str:
    print("\n🎞  Compositing SCENE B v4 (showcase)...")
    out = os.path.join(SCENES_DIR, "v4_scene_b_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_b_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_b_raw.mp4")
    vo = os.path.join(VO_DIR, "v4_scene_b_vo.mp3")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)
    add_vo_to_video(raw_mp4, vo, out, vo_delay_ms=800)
    return out


# ─────────────────────────────────────────────
# SCENE C — REUSE v3 (story reader + offline)
# ─────────────────────────────────────────────
def compose_scene_c() -> str:
    out = os.path.join(SCENES_DIR, "v3_scene_c_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  SCENE C: reusing v3_scene_c_composed.mp4 ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ SCENE C: v3_scene_c_composed.mp4 missing")
    return None


# ─────────────────────────────────────────────
# SCENE D — slides 04+07 with NEW v4 VO (22s — full agent description)
# ─────────────────────────────────────────────
def compose_scene_d() -> str:
    print("\n🎞  Compositing SCENE D v4 (slides 4+7, full agent narration)...")
    out = os.path.join(SCENES_DIR, "v4_scene_d_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide4 = os.path.join(SLIDES_DIR, "slide_04.png")
    slide7 = os.path.join(SLIDES_DIR, "slide_07.png")
    slide8 = os.path.join(SLIDES_DIR, "slide_08.png")
    slide9 = os.path.join(SLIDES_DIR, "slide_09.png")

    s4_mp4 = os.path.join(SCENES_DIR, "v4d_slide_04.mp4")
    s7_mp4 = os.path.join(SCENES_DIR, "v4d_slide_07.mp4")
    s8_mp4 = os.path.join(SCENES_DIR, "v4d_slide_08.mp4")
    s9_mp4 = os.path.join(SCENES_DIR, "v4d_slide_09.mp4")

    vo = os.path.join(VO_DIR, "v4_scene_d_vo.mp3")
    vo_dur = get_duration(vo)
    print(f"  ⏱  D VO duration: {vo_dur:.1f}s — using 4 slides at ~6s each")

    combined_silent = os.path.join(SCENES_DIR, "v4_scene_d_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v4_scene_d_concat.txt")

    dur = max(5.0, vo_dur / 4)
    slide_to_mp4(slide4, s4_mp4, duration=dur)
    slide_to_mp4(slide7, s7_mp4, duration=dur)
    slide_to_mp4(slide8, s8_mp4, duration=dur)
    slide_to_mp4(slide9, s9_mp4, duration=dur)

    parts = [s4_mp4, s7_mp4]
    if os.path.exists(slide8):
        parts.append(s8_mp4)
    if os.path.exists(slide9):
        parts.append(s9_mp4)

    with open(concat_txt, "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300, pad_end=1.5)
    return out


# ─────────────────────────────────────────────
# SCENE E — REUSE v3
# ─────────────────────────────────────────────
def compose_scene_e() -> str:
    out = os.path.join(SCENES_DIR, "v3_scene_e_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  SCENE E: reusing v3_scene_e_composed.mp4 ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ SCENE E: v3_scene_e_composed.mp4 missing")
    return None


# ─────────────────────────────────────────────
# SCENE F — result with NEW v4 VO
# ─────────────────────────────────────────────
def compose_scene_f() -> str:
    print("\n🎞  Compositing SCENE F v4 (result)...")
    out = os.path.join(SCENES_DIR, "v4_scene_f_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_f_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_f_raw.mp4")
    vo = os.path.join(VO_DIR, "v4_scene_f_vo.mp3")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)
    add_vo_to_video(raw_mp4, vo, out, vo_delay_ms=800)
    return out


# ─────────────────────────────────────────────
# SCENE G — NEW split-screen (pipeline + simulator) + PLACEHOLDER VO
# ─────────────────────────────────────────────
def compose_scene_g() -> str:
    print("\n🎞  Compositing SCENE G v4 (cross-device sync — PLACEHOLDER)...")
    out = os.path.join(SCENES_DIR, "v4_scene_g_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ Scene G not found at {out}")
    return None


# ─────────────────────────────────────────────
# SCENE H — NEW offline slideshow + NEW v4 VO
# ─────────────────────────────────────────────
def compose_scene_h() -> str:
    print("\n🎞  Compositing SCENE H v4 (offline/dead zone)...")
    out = os.path.join(SCENES_DIR, "v4_scene_h_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ Scene H not found at {out}")
    return None


# ─────────────────────────────────────────────
# OUTRO — REUSE v3
# ─────────────────────────────────────────────
def compose_outro() -> str:
    out = os.path.join(SCENES_DIR, "v3_outro_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  OUTRO: reusing v3_outro_composed.mp4 ({get_duration(out):.1f}s)")
        return out
    print(f"  ❌ OUTRO: v3_outro_composed.mp4 missing")
    return None


# ─────────────────────────────────────────────
# STITCH — Concat all segments into final video
# ─────────────────────────────────────────────
def stitch(segments: list, output: str):
    print(f"\n🔗 Stitching {len(segments)} segments into {output}...")
    concat_txt = os.path.join(BASE_DIR, "concat_v4.txt")

    normalized = []
    for i, seg in enumerate(segments):
        norm = seg.replace(".mp4", "_v4norm.mp4")
        if os.path.exists(norm):
            print(f"  ⏭  {os.path.basename(norm)} already normalized")
            normalized.append(norm)
            continue
        print(f"  🔧 Normalizing {os.path.basename(seg)}...")
        run([FFMPEG, "-y",
             "-i", seg,
             "-vf", "scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2",
             "-r", "25",
             "-c:v", "libx264", "-crf", "18", "-preset", "fast",
             "-c:a", "aac", "-b:a", "192k",
             "-ar", "44100",
             "-ac", "2",
             norm])
        normalized.append(norm)

    with open(concat_txt, "w") as f:
        for seg in normalized:
            f.write(f"file '{seg}'\n")

    run([FFMPEG, "-y",
         "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-vf", "fade=t=in:st=0:d=0.5",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast",
         "-c:a", "aac", "-b:a", "192k",
         output])


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
def main(scenes_to_compose: list = None):
    print("🎬 SandSync Demo v4 Compositor")
    print("=" * 50)

    run_all = scenes_to_compose is None or len(scenes_to_compose) == 0

    composers = {
        "intro": compose_intro,
        "a": compose_scene_a,
        "b": compose_scene_b,
        "c": compose_scene_c,
        "d": compose_scene_d,
        "e": compose_scene_e,
        "f": compose_scene_f,
        "g": compose_scene_g,
        "h": compose_scene_h,
        "outro": compose_outro,
    }

    scene_order = ["intro", "a", "b", "c", "d", "e", "f", "g", "h", "outro"]

    targets = scene_order if run_all else scenes_to_compose
    for key in targets:
        if key in composers:
            composers[key]()

    segment_paths = {
        "intro": os.path.join(SCENES_DIR, "v3_intro_composed.mp4"),
        "a":     os.path.join(SCENES_DIR, "v4_scene_a_composed.mp4"),
        "b":     os.path.join(SCENES_DIR, "v4_scene_b_composed.mp4"),
        "c":     os.path.join(SCENES_DIR, "v3_scene_c_composed.mp4"),
        "d":     os.path.join(SCENES_DIR, "v4_scene_d_composed.mp4"),
        "e":     os.path.join(SCENES_DIR, "v3_scene_e_composed.mp4"),
        "f":     os.path.join(SCENES_DIR, "v4_scene_f_composed.mp4"),
        "g":     os.path.join(SCENES_DIR, "v4_scene_g_composed.mp4"),
        "h":     os.path.join(SCENES_DIR, "v4_scene_h_composed.mp4"),
        "outro": os.path.join(SCENES_DIR, "v3_outro_composed.mp4"),
    }

    missing = [k for k, v in segment_paths.items() if not os.path.exists(v)]
    if missing:
        print(f"\n⚠️  Cannot stitch — missing segments: {missing}")
        print("   Attempting partial stitch with available segments...")
        available_order = [k for k in scene_order if k not in missing]
    else:
        available_order = scene_order

    all_segments = [segment_paths[k] for k in available_order]

    print(f"\n  Scene order: {' → '.join(available_order)}")
    for k, path in [(k, segment_paths[k]) for k in available_order]:
        dur = get_duration(path)
        print(f"    {k}: {dur:.1f}s — {os.path.basename(path)}")

    stitch(all_segments, FINAL_OUTPUT)

    dur = get_duration(FINAL_OUTPUT)
    size_mb = os.path.getsize(FINAL_OUTPUT) / 1024 / 1024
    print(f"\n🎉 sandsync-demo-DRAFT-v4.mp4 created!")
    print(f"   Duration: {dur:.1f}s ({dur/60:.1f} min)")
    print(f"   Size: {size_mb:.1f} MB")
    print(f"   Path: {FINAL_OUTPUT}")
    if missing:
        print(f"\n⚠️  MISSING SCENES (not included): {missing}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SandSync Demo v4 Compositor")
    parser.add_argument(
        "--scene", nargs="+",
        help="Compose only specific scene(s): intro a b c d e f g h outro"
    )
    args = parser.parse_args()
    main(scenes_to_compose=args.scene)
