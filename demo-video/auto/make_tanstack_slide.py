#!/usr/bin/env python3
"""Create TanStack sponsor slide for SandSync Demo V4 Scene A."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1440, 900
OUT_PATH = "/Users/loki/projects/sandsync/demo-video/auto/slides/slide_tanstack.png"

# Colors matching slide_11 dark navy style
BG_TOP = (14, 22, 43)       # #0e162b
BG_BOT = (29, 41, 61)       # #1d293d
ACCENT = (99, 102, 241)     # #6366f1 indigo/purple
ACCENT2 = (129, 140, 248)   # #818cf8 lighter
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)     # slate-400
GOLD = (251, 191, 36)       # amber-400

img = Image.new("RGB", (W, H))
draw = ImageDraw.Draw(img)

# Gradient background
for y in range(H):
    t = y / H
    r = int(BG_TOP[0] * (1 - t) + BG_BOT[0] * t)
    g = int(BG_TOP[1] * (1 - t) + BG_BOT[1] * t)
    b = int(BG_TOP[2] * (1 - t) + BG_BOT[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Try to load a bold font, fallback to default
def get_font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/SF Pro Display/SF-Pro-Display-Bold.otf",
        "/Library/Fonts/Arial Bold.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

# Title
title_font = get_font(52, bold=True)
subtitle_font = get_font(32)
label_font = get_font(26)
small_font = get_font(22)
tiny_font = get_font(18)

# Header section
draw.text((W//2, 80), "SandSync", font=get_font(64, True), fill=WHITE, anchor="mm")
draw.text((W//2, 145), "Built On", font=get_font(28), fill=MUTED, anchor="mm")

# Divider line
draw.rectangle([(W//2 - 300, 170), (W//2 + 300, 173)], fill=ACCENT)

# Sponsor blocks — 4 main sponsors in a row
sponsors = [
    ("PowerSync", "Offline-first sync", ACCENT2),
    ("Mastra", "Agent orchestration", (52, 211, 153)),   # emerald
    ("Supabase", "Postgres + Storage", (74, 222, 128)),  # green
    ("TanStack", "Type-safe routing", (251, 146, 60)),   # orange
]

box_w = 280
box_h = 140
gap = 40
total_w = len(sponsors) * box_w + (len(sponsors) - 1) * gap
start_x = (W - total_w) // 2
y_box = 220

for i, (name, desc, color) in enumerate(sponsors):
    x = start_x + i * (box_w + gap)
    # Box background
    draw.rounded_rectangle(
        [(x, y_box), (x + box_w, y_box + box_h)],
        radius=12,
        fill=(color[0]//6, color[1]//6, color[2]//6),
        outline=color,
        width=2
    )
    # Sponsor name
    draw.text((x + box_w//2, y_box + 45), name, font=get_font(30, True), fill=color, anchor="mm")
    # Description
    draw.text((x + box_w//2, y_box + 85), desc, font=get_font(18), fill=MUTED, anchor="mm")

# Secondary sponsors row
sec_sponsors = [
    ("fal.ai", "Image generation"),
    ("ElevenLabs", "Voice narration"),
    ("Claude Sonnet", "Story intelligence"),
]
y_sec = y_box + box_h + 50
sec_w = 260
sec_gap = 50
sec_total = len(sec_sponsors) * sec_w + (len(sec_sponsors) - 1) * sec_gap
sec_x = (W - sec_total) // 2

for i, (name, desc) in enumerate(sec_sponsors):
    x = sec_x + i * (sec_w + sec_gap)
    draw.rounded_rectangle(
        [(x, y_sec), (x + sec_w, y_sec + 80)],
        radius=8,
        fill=(20, 30, 55),
        outline=(60, 75, 100),
        width=1
    )
    draw.text((x + sec_w//2, y_sec + 28), name, font=get_font(24, True), fill=(200, 210, 230), anchor="mm")
    draw.text((x + sec_w//2, y_sec + 58), desc, font=get_font(16), fill=MUTED, anchor="mm")

# Bottom tagline
draw.text((W//2, H - 100), "PowerSync AI Hackathon 2026", font=get_font(24), fill=MUTED, anchor="mm")
draw.text((W//2, H - 60), "🏆 Four Bonus Prize Categories", font=get_font(20), fill=GOLD, anchor="mm")

img.save(OUT_PATH)
print(f"✅ Saved: {OUT_PATH}")
print(f"   Size: {os.path.getsize(OUT_PATH):,} bytes")
