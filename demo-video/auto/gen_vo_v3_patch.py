#!/usr/bin/env python3
"""
gen_vo_v3_patch.py — Regenerate only the changed VO files for v3 → v4 patch.
Uses ElevenLabs REST API with Sarah voice (consistent with v3 task brief).
"""

import os
import shutil
import subprocess
import requests
import time

API_KEY = "sk_d796b96b17fcd66c0a89c87dd0e535c1c1194ddb1d21e94e"
VOICE_ID = "EXAVITQu4vr4xnSDxMaL"   # Sarah
MODEL_ID = "eleven_turbo_v2_5"
VOICE_SETTINGS = {
    "stability": 0.55,
    "similarity_boost": 0.8,
    "style": 0.0,
    "use_speaker_boost": True
}

VO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vo")

# Only the changed lines
PATCHES = {
    "v3_scene_c2_vo": (
        "Still here. Network's gone — stories aren't. "
        "That's what PowerSync actually does."
    ),
    "v3_scene_e_vo_35s": (
        "Done. PowerSync already pushing it to every connected device."
    ),
    "v3_outro_vo": (
        "Mastra, Supabase, TanStack, ElevenLabs, fal.ai. "
        "Where Caribbean folklore lives offline — in the community, not the cloud. "
        "Built on PowerSync."
    ),
}


def get_duration(path: str) -> float:
    result = subprocess.run(
        ["/opt/homebrew/bin/ffprobe", "-v", "quiet",
         "-show_entries", "format=duration", "-of", "csv=p=0", path],
        capture_output=True, text=True
    )
    try:
        return float(result.stdout.strip())
    except ValueError:
        return 0.0


def generate_audio(text: str, out_path: str) -> bool:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }
    payload = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": VOICE_SETTINGS,
    }
    resp = requests.post(url, headers=headers, json=payload, timeout=30)
    if resp.status_code == 200:
        with open(out_path, "wb") as f:
            f.write(resp.content)
        return True
    else:
        print(f"  ❌ ElevenLabs error {resp.status_code}: {resp.text[:300]}")
        return False


def main():
    print("🎙  SandSync VO Patch Generator (v3 → v4)")
    print("=" * 50)

    for name, text in PATCHES.items():
        out_path = os.path.join(VO_DIR, f"{name}.mp3")
        bak_path = out_path + ".bak"

        # Back up original
        if os.path.exists(out_path):
            shutil.copy2(out_path, bak_path)
            orig_dur = get_duration(out_path)
            print(f"  📦 Backed up {name}.mp3 (was {orig_dur:.1f}s) → .bak")

        print(f"  🎤 Generating {name}...")
        print(f"     Text: {text}")
        ok = generate_audio(text, out_path)
        if ok:
            dur = get_duration(out_path)
            print(f"  ✅ {out_path} ({dur:.1f}s)\n")
        else:
            print(f"  ❌ Failed — restoring backup\n")
            if os.path.exists(bak_path):
                shutil.copy2(bak_path, out_path)

        time.sleep(1.0)  # gentle rate limiting

    print("✅ Patch generation complete.")


if __name__ == "__main__":
    main()
