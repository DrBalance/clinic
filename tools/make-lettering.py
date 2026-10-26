#!/usr/bin/env python3
"""한의원 이름·메인 카피를 서체의 윤곽선(SVG)으로 만들어 public/brand/ 에 저장합니다.

서체 파일은 라이선스상 저장소에 올리지 않으므로, 이 스크립트를 다시 돌릴 때만
로컬에 있는 파일 경로를 알려 주세요.

  pip install fonttools
  python3 tools/make-lettering.py --bc BCcardB.ttf --gw 강원교육모두체_Light.otf

결과물(SVG)에는 폰트 파일이 들어 있지 않고 글자 모양(path)만 들어 있습니다.
"""
import argparse
import pathlib

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

INK = '#22304f'


def lettering(font_path, lines, size=100, line_height=1.3, pad=0.04, label=''):
    font = TTFont(font_path)
    gs, cmap, upm, hmtx = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm, font['hmtx']
    s = size / upm
    asc = size * 0.88
    groups, widths = [], []
    for i, text in enumerate(lines):
        x, parts = 0.0, []
        for ch in text:
            g = cmap.get(ord(ch))
            if g is None:
                raise SystemExit(f'이 서체에 없는 글자입니다: {ch!r}')
            if ch != ' ':
                pen = SVGPathPen(gs, ntos=lambda v: f'{v:.1f}')
                gs[g].draw(pen)
                d = pen.getCommands()
                if d:
                    parts.append(f'<path transform="translate({x:.2f} 0) scale({s:.5f} {-s:.5f})" d="{d}"/>')
            x += hmtx[g][0] * s
        widths.append(x)
        groups.append(f'<g transform="translate(0 {asc + i * size * line_height:.2f})">{"".join(parts)}</g>')
    p = size * pad
    w = max(widths)
    h = asc + (len(lines) - 1) * size * line_height + size * 0.22
    vb = f'{-p:.1f} {-p:.1f} {w + 2 * p:.1f} {h + 2 * p:.1f}'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" fill="{INK}">{"".join(groups)}</svg>\n'


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--bc', required=True, help='BC카드체 파일 (이름 로고용)')
    ap.add_argument('--gw', required=True, help='강원교육모두체 파일 (메인 카피용)')
    ap.add_argument('--out', default='public/brand')
    a = ap.parse_args()
    out = pathlib.Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / 'name.svg').write_text(lettering(a.bc, ['아침나라한의원'], line_height=1.2))
    (out / 'hero-copy.svg').write_text(lettering(a.gw, ['밸런스를 회복하면', '아침이 가벼워집니다'], line_height=1.32))
    print('만들었습니다:', out / 'name.svg', out / 'hero-copy.svg')
