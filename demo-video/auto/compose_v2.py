#!/usr/bin/env python3
"""
compose_v2.py — SandSync Demo v3 Compositor

Builds the final ~3min video with:
  INTRO  — slide_01 + slide_02 (title cards)
  SCENE A — slide_03 + slide_05 (solution arch)
  SCENE B — live showcase browser
  SCENE C — live story reader + offline demo
  SCENE D — slide_04 + slide_07 (pipeline/Mastra)
  SCENE E — live pipeline (with 2x speed middle section)
  SCENE F — live result (new story)
  OUTRO   — slide_11 + slide_12 + outro card

Usage:
  python compose_v2.py                    # compose all
  python compose_v2.py --scene b c e f   # recompose specific browser scenes
  python compose_v2.py --scene e          # recompose only scene E
"""

import os
import sys
import json
import subprocess
import argparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENES_DIR = os.path.join(BASE_DIR, "scenes")
VO_DIR = os.path.join(BASE_DIR, "vo")
SLIDES_DIR = os.path.join(BASE_DIR, "slides")
META_PATH = os.path.join(BASE_DIR, "scenes_meta_v2.json")

FFMPEG = "/opt/homebrew/bin/ffmpeg"
FFPROBE = "/opt/homebrew/bin/ffprobe"

FINAL_OUTPUT = os.path.join(BASE_DIR, "demo-final-v3.mp4")
OUTRO_CARD = os.path.join(BASE_DIR, "outro_card.png")


def run(cmd: list, check=True, capture=False):
    print(f"  $ {' '.join(str(c) for c in cmd)}")
    result = subprocess.run(cmd, capture_output=capture, text=True)
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


def slide_to_mp4(slide_png: str, out_mp4: str, duration: float = 3.0):
    """Convert a slide PNG to a video segment with fade-in and fade-out."""
    if os.path.exists(out_mp4):
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


def add_silent_audio(video_mp4: str, out_mp4: str):
    """Add silent audio track to a video (for concat compatibility)."""
    run([FFMPEG, "-y",
         "-i", video_mp4,
         "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
         "-map", "0:v",
         "-map", "1:a",
         "-c:v", "copy",
         "-c:a", "aac", "-b:a", "192k",
         "-shortest",
         out_mp4])


# ─────────────────────────────────────────────
# INTRO — slide_01 + slide_02 with VO
# ─────────────────────────────────────────────
def compose_intro() -> str:
    print("\n🎞  Compositing INTRO (slides 1+2)...")
    out = os.path.join(SCENES_DIR, "v3_intro_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide1 = os.path.join(SLIDES_DIR, "slide_01.png")
    slide2 = os.path.join(SLIDES_DIR, "slide_02.png")
    s1_mp4 = os.path.join(SCENES_DIR, "v3_slide_01.mp4")
    s2_mp4 = os.path.join(SCENES_DIR, "v3_slide_02.mp4")
    vo = os.path.join(VO_DIR, "v3_intro_vo.mp3")
    combined_silent = os.path.join(SCENES_DIR, "v3_intro_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v3_intro_concat.txt")

    slide_to_mp4(slide1, s1_mp4, duration=3.0)
    slide_to_mp4(slide2, s2_mp4, duration=3.0)

    with open(concat_txt, "w") as f:
        f.write(f"file '{s1_mp4}'\n")
        f.write(f"file '{s2_mp4}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300)
    return out


# ─────────────────────────────────────────────
# SCENE A — slide_03 + slide_05 with VO
# ─────────────────────────────────────────────
def compose_scene_a() -> str:
    print("\n🎞  Compositing SCENE A (slides 3+5)...")
    out = os.path.join(SCENES_DIR, "v3_scene_a_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide3 = os.path.join(SLIDES_DIR, "slide_03.png")
    slide5 = os.path.join(SLIDES_DIR, "slide_05.png")
    s3_mp4 = os.path.join(SCENES_DIR, "v3_slide_03.mp4")
    s5_mp4 = os.path.join(SCENES_DIR, "v3_slide_05.mp4")
    vo = os.path.join(VO_DIR, "v3_scene_a_vo.mp3")
    combined_silent = os.path.join(SCENES_DIR, "v3_scene_a_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v3_scene_a_concat.txt")

    slide_to_mp4(slide3, s3_mp4, duration=3.0)
    slide_to_mp4(slide5, s5_mp4, duration=3.0)

    with open(concat_txt, "w") as f:
        f.write(f"file '{s3_mp4}'\n")
        f.write(f"file '{s5_mp4}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300)
    return out


# ─────────────────────────────────────────────
# SCENE B — Showcase (live browser)
# ─────────────────────────────────────────────
def compose_scene_b() -> str:
    print("\n🎞  Compositing SCENE B (showcase)...")
    out = os.path.join(SCENES_DIR, "v3_scene_b_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_b_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_b_raw.mp4")
    vo = os.path.join(VO_DIR, "v3_scene_b_vo.mp3")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)
    add_vo_to_video(raw_mp4, vo, out, vo_delay_ms=800)
    return out


# ─────────────────────────────────────────────
# SCENE C — Story Reader + Offline Demo
# ─────────────────────────────────────────────
def compose_scene_c() -> str:
    print("\n🎞  Compositing SCENE C (story reader + offline)...")
    out = os.path.join(SCENES_DIR, "v3_scene_c_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_c_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_c_raw.mp4")
    vo1 = os.path.join(VO_DIR, "v3_scene_c1_vo.mp3")
    vo2 = os.path.join(VO_DIR, "v3_scene_c2_vo.mp3")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)

    # Two VO segments: c1 at 500ms, c2 at ~22s (after audio playback + offline trigger)
    vo2_delay_ms = 22000

    run([FFMPEG, "-y",
         "-i", raw_mp4,
         "-i", vo1,
         "-i", vo2,
         "-filter_complex",
         (
             f"[1:a]adelay=500|500[a1];"
             f"[2:a]adelay={vo2_delay_ms}|{vo2_delay_ms}[a2];"
             f"[a1][a2]amix=inputs=2:duration=longest[mixed_a];"
             f"[0:v]tpad=stop_mode=clone:stop_duration=1[padded_v]"
         ),
         "-map", "[padded_v]",
         "-map", "[mixed_a]",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast",
         "-c:a", "aac", "-b:a", "192k",
         "-shortest",
         out])
    return out


# ─────────────────────────────────────────────
# SCENE D — slide_04 + slide_07 with VO
# ─────────────────────────────────────────────
def compose_scene_d() -> str:
    print("\n🎞  Compositing SCENE D (slides 4+7)...")
    out = os.path.join(SCENES_DIR, "v3_scene_d_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide4 = os.path.join(SLIDES_DIR, "slide_04.png")
    slide7 = os.path.join(SLIDES_DIR, "slide_07.png")
    s4_mp4 = os.path.join(SCENES_DIR, "v3_slide_04.mp4")
    s7_mp4 = os.path.join(SCENES_DIR, "v3_slide_07.mp4")
    vo = os.path.join(VO_DIR, "v3_scene_d_vo.mp3")
    combined_silent = os.path.join(SCENES_DIR, "v3_scene_d_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v3_scene_d_concat.txt")

    slide_to_mp4(slide4, s4_mp4, duration=3.0)
    slide_to_mp4(slide7, s7_mp4, duration=3.0)

    with open(concat_txt, "w") as f:
        f.write(f"file '{s4_mp4}'\n")
        f.write(f"file '{s7_mp4}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300)
    return out


# ─────────────────────────────────────────────
# SCENE E — Live Pipeline with 2x speed middle
# ─────────────────────────────────────────────
def compose_scene_e() -> str:
    print("\n🎞  Compositing SCENE E (pipeline + 2x speedup)...")
    out = os.path.join(SCENES_DIR, "v3_scene_e_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_e_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_e_raw.mp4")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)

    total_dur = get_duration(raw_mp4)
    print(f"  ⏱  Raw pipeline duration: {total_dur:.1f}s")

    # Speed-up parameters
    # Part 1: 0–8s normal speed
    # Part 2: 8–50s at 2x speed (42s → 21s)
    # Part 3: 50s to end at normal speed
    p1 = os.path.join(SCENES_DIR, "v3_scene_e_p1.mp4")
    p2 = os.path.join(SCENES_DIR, "v3_scene_e_p2.mp4")
    p3 = os.path.join(SCENES_DIR, "v3_scene_e_p3.mp4")
    p_silent = os.path.join(SCENES_DIR, "v3_scene_e_silent.mp4")
    p_concat = os.path.join(SCENES_DIR, "v3_scene_e_concat.txt")

    # Part 1: 0–8s normal
    run([FFMPEG, "-y", "-i", raw_mp4, "-t", "8",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         p1])

    # Part 2: 8–50s at 2x speed
    run([FFMPEG, "-y", "-i", raw_mp4, "-ss", "8", "-t", "42",
         "-vf", "setpts=0.5*PTS",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         p2])

    # Part 3: 50s to end normal
    remaining = max(0, total_dur - 50)
    if remaining > 0:
        run([FFMPEG, "-y", "-i", raw_mp4, "-ss", "50",
             "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
             p3])
    else:
        print("  ⚠️  Pipeline ended before 50s mark — skipping part 3")
        # Create a 2s freeze frame as part 3
        run([FFMPEG, "-y", "-i", raw_mp4,
             "-vf", "tpad=stop_mode=clone:stop_duration=2",
             "-t", "2", "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
             p3])

    # Concat parts
    with open(p_concat, "w") as f:
        f.write(f"file '{p1}'\n")
        f.write(f"file '{p2}'\n")
        f.write(f"file '{p3}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", p_concat,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         p_silent])

    composed_dur = get_duration(p_silent)
    print(f"  ⏱  Composed pipeline duration: {composed_dur:.1f}s (was {total_dur:.1f}s)")

    # Add 5 timed VO segments to COMPOSED timeline
    # 0s, 8s, 16s, 24s, 35s (in composed time)
    vo_00 = os.path.join(VO_DIR, "v3_scene_e_vo_0s.mp3")
    vo_08 = os.path.join(VO_DIR, "v3_scene_e_vo_8s.mp3")
    vo_16 = os.path.join(VO_DIR, "v3_scene_e_vo_16s.mp3")
    vo_24 = os.path.join(VO_DIR, "v3_scene_e_vo_24s.mp3")
    vo_35 = os.path.join(VO_DIR, "v3_scene_e_vo_35s.mp3")

    delays = {
        "v0": 500,
        "v8": 8500,
        "v16": 16500,
        "v24": 24500,
        "v35": 35500,
    }

    run([FFMPEG, "-y",
         "-i", p_silent,
         "-i", vo_00,
         "-i", vo_08,
         "-i", vo_16,
         "-i", vo_24,
         "-i", vo_35,
         "-filter_complex",
         (
             f"[1:a]adelay={delays['v0']}|{delays['v0']}[a0];"
             f"[2:a]adelay={delays['v8']}|{delays['v8']}[a1];"
             f"[3:a]adelay={delays['v16']}|{delays['v16']}[a2];"
             f"[4:a]adelay={delays['v24']}|{delays['v24']}[a3];"
             f"[5:a]adelay={delays['v35']}|{delays['v35']}[a4];"
             f"[a0][a1][a2][a3][a4]amix=inputs=5:duration=longest[mixed_a]"
         ),
         "-map", "0:v",
         "-map", "[mixed_a]",
         "-c:v", "libx264", "-crf", "18", "-preset", "fast",
         "-c:a", "aac", "-b:a", "192k",
         out])
    return out


# ─────────────────────────────────────────────
# SCENE F — Result (live browser)
# ─────────────────────────────────────────────
def compose_scene_f() -> str:
    print("\n🎞  Compositing SCENE F (result)...")
    out = os.path.join(SCENES_DIR, "v3_scene_f_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    raw_webm = os.path.join(SCENES_DIR, "scene_f_raw.webm")
    raw_mp4 = os.path.join(SCENES_DIR, "scene_f_raw.mp4")
    vo = os.path.join(VO_DIR, "v3_scene_f_vo.mp3")

    if not os.path.exists(raw_webm):
        print(f"  ❌ Missing: {raw_webm}")
        return None

    webm_to_mp4(raw_webm, raw_mp4)
    add_vo_to_video(raw_mp4, vo, out, vo_delay_ms=800)
    return out


# ─────────────────────────────────────────────
# OUTRO — slide_11 + slide_12 + outro card
# ─────────────────────────────────────────────
def compose_outro() -> str:
    print("\n🎞  Compositing OUTRO (slides 11+12 + outro card)...")
    out = os.path.join(SCENES_DIR, "v3_outro_composed.mp4")
    if os.path.exists(out):
        print(f"  ⏭  {out} already exists")
        return out

    slide11 = os.path.join(SLIDES_DIR, "slide_11.png")
    slide12 = os.path.join(SLIDES_DIR, "slide_12.png")
    s11_mp4 = os.path.join(SCENES_DIR, "v3_slide_11.mp4")
    s12_mp4 = os.path.join(SCENES_DIR, "v3_slide_12.mp4")
    vo = os.path.join(VO_DIR, "v3_outro_vo.mp3")
    combined_silent = os.path.join(SCENES_DIR, "v3_outro_silent.mp4")
    concat_txt = os.path.join(SCENES_DIR, "v3_outro_concat.txt")

    slide_to_mp4(slide11, s11_mp4, duration=4.0)
    slide_to_mp4(slide12, s12_mp4, duration=4.0)

    parts = [s11_mp4, s12_mp4]

    # Add outro card if it exists
    outro_card_mp4 = os.path.join(SCENES_DIR, "v3_outro_card.mp4")
    if os.path.exists(OUTRO_CARD):
        slide_to_mp4(OUTRO_CARD, outro_card_mp4, duration=4.0)
        parts.append(outro_card_mp4)

    with open(concat_txt, "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
         "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-an",
         combined_silent])

    add_vo_to_video(combined_silent, vo, out, vo_delay_ms=300)
    return out


# ─────────────────────────────────────────────
# STITCH — Concat all segments into final video
# ─────────────────────────────────────────────
def stitch(segments: list, output: str):
    print(f"\n🔗 Stitching {len(segments)} segments into {output}...")
    concat_txt = os.path.join(BASE_DIR, "concat_v3.txt")

    # Normalize all segments to same codec/format/audio before concat
    normalized = []
    for i, seg in enumerate(segments):
        norm = seg.replace(".mp4", "_norm.mp4")
        if os.path.exists(norm):
            print(f"  ⏭  {os.path.basename(norm)} already normalized")
            normalized.append(norm)
            continue
        print(f"  🔧 Normalizing {os.path.basename(seg)}...")
        # Ensure video is 1440x900, 25fps, stereo AAC audio
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
    print("🎬 SandSync Demo v3 Compositor")
    print("=" * 50)

    run_all = scenes_to_compose is None or len(scenes_to_compose) == 0

    # Map of scene key → compose function
    composers = {
        "intro": compose_intro,
        "a": compose_scene_a,
        "b": compose_scene_b,
        "c": compose_scene_c,
        "d": compose_scene_d,
        "e": compose_scene_e,
        "f": compose_scene_f,
        "outro": compose_outro,
    }

    # Full order for final stitch
    scene_order = ["intro", "a", "b", "c", "d", "e", "f", "outro"]

    # Compose requested scenes
    targets = scene_order if run_all else scenes_to_compose
    for key in targets:
        if key in composers:
            composers[key]()

    # Stitch final video only if all segments exist
    segment_paths = {
        "intro": os.path.join(SCENES_DIR, "v3_intro_composed.mp4"),
        "a": os.path.join(SCENES_DIR, "v3_scene_a_composed.mp4"),
        "b": os.path.join(SCENES_DIR, "v3_scene_b_composed.mp4"),
        "c": os.path.join(SCENES_DIR, "v3_scene_c_composed.mp4"),
        "d": os.path.join(SCENES_DIR, "v3_scene_d_composed.mp4"),
        "e": os.path.join(SCENES_DIR, "v3_scene_e_composed.mp4"),
        "f": os.path.join(SCENES_DIR, "v3_scene_f_composed.mp4"),
        "outro": os.path.join(SCENES_DIR, "v3_outro_composed.mp4"),
    }

    missing = [k for k, v in segment_paths.items() if not os.path.exists(v)]
    if missing:
        print(f"\n⚠️  Cannot stitch — missing segments: {missing}")
        print("   Run with full pipeline or supply missing scenes first.")
        return

    all_segments = [segment_paths[k] for k in scene_order]
    stitch(all_segments, FINAL_OUTPUT)

    dur = get_duration(FINAL_OUTPUT)
    size_mb = os.path.getsize(FINAL_OUTPUT) / 1024 / 1024
    print(f"\n🎉 demo-final-v3.mp4 created!")
    print(f"   Duration: {dur:.1f}s ({dur/60:.1f} min)")
    print(f"   Size: {size_mb:.1f} MB")
    print(f"   Path: {FINAL_OUTPUT}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SandSync Demo v3 Compositor")
    parser.add_argument(
        "--scene", nargs="+",
        help="Compose only specific scene(s): intro a b c d e f outro"
    )
    args = parser.parse_args()
    main(scenes_to_compose=args.scene)
