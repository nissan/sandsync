import fal_client
import os
import requests
from pathlib import Path

FAL_KEY = "19154265-3815-4c61-a26b-7bf66490aae6:036f2aad4473c3cf5cdf4196651aa38e"
os.environ["FAL_KEY"] = FAL_KEY

AVATARS_DIR = Path("/Users/loki/projects/sandsync/demo-video/avatars")
AVATARS_DIR.mkdir(parents=True, exist_ok=True)

avatars = [
    (
        "papa_bois",
        "Portrait of Papa Bois, Caribbean forest spirit guardian. Ancient wise man with deer horns curving from his head, deep mahogany skin, piercing green eyes that glow with forest magic. Wearing woven bark clothing adorned with leaves and vines. Dense Trinidad rainforest background, fireflies floating around him, dusk golden light filtering through silk cotton tree roots. Studio Ghibli watercolour style, dignified and mystical."
    ),
    (
        "anansi",
        "Portrait of Anansi the Spider Trickster, West African folklore character. Clever smiling young man with warm brown skin and mischievous sparkling dark eyes, wearing a web-patterned shirt with gold thread. Small spider resting on his shoulder. Colourful Caribbean market background with vibrant fabrics. Studio Ghibli watercolour style, playful and clever energy."
    ),
    (
        "ogma",
        "Portrait of Ogma, female wisdom keeper and quality guardian. Beautiful confident Caribbean woman, rich dark brown skin, natural hair adorned with small golden beads, wearing deep violet robes with intricate golden Celtic knot patterns. Holding ancient glowing scrolls. Background of floating luminous runes and symbols. Studio Ghibli watercolour style, precise and authoritative."
    ),
]

for name, prompt in avatars:
    print(f"Generating {name}...")
    result = fal_client.run(
        "fal-ai/flux/schnell",
        arguments={
            "prompt": prompt,
            "image_size": "portrait_4_3",
            "num_inference_steps": 4,
            "num_images": 1,
        }
    )
    image_url = result["images"][0]["url"]
    print(f"  URL: {image_url}")
    
    # Download and save
    resp = requests.get(image_url)
    resp.raise_for_status()
    out_path = AVATARS_DIR / f"{name}.png"
    out_path.write_bytes(resp.content)
    print(f"  ✓ Saved to {out_path}")

print("\nAll avatars generated!")
