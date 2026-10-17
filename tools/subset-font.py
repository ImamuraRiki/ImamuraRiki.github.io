"""Subset Source Han Sans JP into renamed woff2 chunks (OFL: Reserved Font Name 'Source' must not be used).

Normally you never need to run this; the generated fonts are already in assets/fonts/.
Usage (requires: pip install fonttools brotli):
  1. Download 17_SourceHanSansJP.zip from https://github.com/adobe-fonts/source-han-sans/releases and unzip
  2. python3 tools/subset-font.py <unzipped>/SubsetOTF/JP assets/fonts/source-han-sans-jp
Writes the woff2 files and assets/css/fonts.css.
"""
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

FAMILY = "Han Sans JP Web"
PS = "HanSansJPWeb"


def jis_level(rows):
    chars = set()
    for r in rows:
        for c in range(0xA1, 0xFF):
            try:
                chars.add(ord(bytes([r + 0xA0, c]).decode("euc_jp")))
            except UnicodeDecodeError:
                pass
    return chars


kana = set(range(0x3000, 0x3100)) | set(range(0x31F0, 0x3200)) | set(range(0xFF00, 0xFFF0)) | {0x203B, 0x2025, 0x2026}
# JIS X 0208 non-kanji rows 1-8 (symbols) that are not Latin
symbols = {c for c in jis_level(range(1, 9)) if c > 0x2000}
kana |= symbols
# Kanji shown on every page (the name in the header) go into the small kana file,
# so English pages never need to download the large kanji file.
ALWAYS = "今村吏希"
kana |= {ord(c) for c in ALWAYS}
level1 = jis_level(range(16, 48)) - kana
level2 = jis_level(range(48, 85)) - kana - level1
# Rare kanji (level 2) get a broad range and are declared first: browsers try later rules first,
# so common kanji resolve to the small level-1 file and only missing glyphs fall through.
CHUNKS = {"kanji2": level2, "kanji1": level1, "kana": kana}
BROAD = {"kanji2": "U+3400-4DBF, U+4E00-9FFF, U+F900-FAFF"}


def ranges(cps):
    cps = sorted(cps)
    out, start, prev = [], cps[0], cps[0]
    for c in cps[1:]:
        if c != prev + 1:
            out.append((start, prev))
            start = c
        prev = c
    out.append((start, prev))
    return ", ".join(f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}" for a, b in out)


def rename(font, weight):
    for rec in font["name"].names:
        s = rec.toUnicode()
        s2 = s.replace("Source Han Sans JP", FAMILY).replace("SourceHanSansJP", PS)
        if s2 != s:
            rec.string = s2
    if "CFF " in font:
        cff = font["CFF "].cff
        cff.fontNames = [n.replace("SourceHanSansJP", PS) for n in cff.fontNames]
        td = cff.topDictIndex[0]
        for attr in ("FullName", "FamilyName", "FontName"):
            v = getattr(td, attr, None)
            if isinstance(v, str):
                setattr(td, attr, v.replace("Source Han Sans JP", FAMILY).replace("SourceHanSansJP", PS))


css = []
for weight, num in (("Regular", 400), ("Medium", 500)):
    src = os.path.join(SRC, f"SourceHanSansJP-{weight}.otf")
    for name, cps in CHUNKS.items():
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["palt", "kern", "liga", "locl", "ccmp"]
        opts.name_IDs = ["*"]
        opts.name_languages = ["*"]
        opts.notdef_outline = True
        opts.hinting = False
        font = subset.load_font(src, opts)
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=cps)
        sub.subset(font)
        rename(font, weight)
        fn = f"HanSansJPWeb-{weight}-{name}.woff2"
        subset.save_font(font, os.path.join(OUT, fn), opts)
        print(fn, os.path.getsize(os.path.join(OUT, fn)) // 1024, "KB", len(cps), "chars")
        css.append(
            "@font-face {\n"
            f'  font-family: "{FAMILY}";\n'
            f"  font-style: normal;\n  font-weight: {num};\n  font-display: swap;\n"
            f'  src: local("Source Han Sans JP {weight}"), local("SourceHanSansJP-{weight}"),\n'
            f'    url("../fonts/source-han-sans-jp/{fn}") format("woff2");\n'
            f"  unicode-range: {BROAD.get(name) or ranges(cps)};\n}}\n"
        )

header = (
    "/*\n"
    " * Japanese web font: Source Han Sans JP (源ノ角ゴシック) by Adobe, SIL Open Font License 1.1.\n"
    " * Subsetted to JIS X 0208 and renamed to \"Han Sans JP Web\" because 'Source' is a\n"
    " * Reserved Font Name under the OFL. License: assets/fonts/source-han-sans-jp/LICENSE.txt\n"
    " * Each file is split by unicode-range, so browsers download only the chunks a page actually uses.\n"
    " * If Source Han Sans JP is installed locally, it is used instead (local()).\n"
    " * Generated file — do not edit by hand.\n"
    " */\n\n"
)
with open(os.path.join(OUT, "..", "..", "css", "fonts.css"), "w") as f:
    f.write(header + "\n".join(css))
print("css ok")
