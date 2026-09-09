"""Crop regions out of a Figma section export.

Usage:
  python scripts/crop-figma-export.py <export.png> <scale> <out-dir> \
      name:x:y:w:h [name:x:y:w:h ...]

Coordinates are given in the section's own 1x design space; `scale` is the
factor the export was rendered at. Used for illustrations that Figma will only
hand back composited into their card, where the card's own gradient comes with
the crop and therefore composites seamlessly over the matching CSS background.
"""
import os
import sys

from PIL import Image


def main() -> int:
    if len(sys.argv) < 5:
        print(__doc__)
        return 2

    src, scale, out_dir = sys.argv[1], float(sys.argv[2]), sys.argv[3]
    os.makedirs(out_dir, exist_ok=True)
    image = Image.open(src).convert("RGBA")

    for spec in sys.argv[4:]:
        name, x, y, w, h = spec.split(":")
        box = (
            round(float(x) * scale),
            round(float(y) * scale),
            round((float(x) + float(w)) * scale),
            round((float(y) + float(h)) * scale),
        )
        path = os.path.join(out_dir, name + ".png")
        crop = image.crop(box)
        crop.save(path, optimize=True)
        print("%-24s %s  %d bytes" % (name + ".png", crop.size, os.path.getsize(path)))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
