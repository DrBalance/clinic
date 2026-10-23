#!/usr/bin/env python3
"""제목에 쓰는 강원교육모두체를, 사이트에 실제로 나오는 제목 글자만 담은 가벼운 웹폰트(woff2)로 만듭니다.

원본 서체는 약 5MB 라서 그대로 올리면 무겁습니다. 제목 글자만 뽑으면 수십 KB 가 됩니다.
제목을 고치거나 새로 추가했다면 이 스크립트를 다시 돌려 주세요.
(새 글자가 빠져 있으면 그 글자만 본문 서체로 보이고, 깨지지는 않습니다.)

  pip install fonttools brotli
  python3 tools/make-title-font.py --font 강원교육모두체_Bold.otf
"""
import argparse
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent

# 코드에 직접 적힌 제목 글자 (홈 라벨, 메뉴 등)
EXTRA = '블로그 최근 글 치료 안내 한의원 소개 자주 묻는 질문 오시는 길 진료시간 문의 · 예약 평일 토요일 공휴일 모두 펼치기 접기 아침나라 [0123456789] 가 -·:,.!?()\'"~…'


def collect_chars():
    chars = set(EXTRA)
    for md in (ROOT / 'src/content/treatments').glob('*.md'):
        for line in md.read_text(encoding='utf8').splitlines():
            if line.startswith('### '):
                chars |= set(line[4:])
            m = re.match(r'title:\s*"(.*)"', line)
            if m:
                chars |= set(m.group(1))
    site = (ROOT / 'src/data/site.ts').read_text(encoding='utf8')
    for m in re.finditer(r"title:\s*'([^']*)'", site):
        chars |= set(m.group(1))
    return ''.join(sorted(c for c in chars if not c.isspace())) + ' '


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--font', required=True, help='강원교육모두체 Bold 파일')
    ap.add_argument('--out', default=str(ROOT / 'public/fonts/gw-title.woff2'))
    a = ap.parse_args()
    text = collect_chars()
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga']
    opts.name_IDs = [1, 2]
    # 원본의 옛 kern 표가 손상되어 있어(브라우저가 폰트를 거부함) 제외합니다. 글자 간격은 GPOS 로 충분합니다.
    opts.drop_tables += ['kern']
    opts.notdef_outline = True
    font = TTFont(a.font)
    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)
    # 원본 CFF 내부 이름에 띄어쓰기가 있어 브라우저가 거부하므로 붙여 씁니다.
    cff = font['CFF '].cff
    cff.fontNames = [n.replace(' ', '') for n in cff.fontNames]
    pathlib.Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, a.out, opts)
    print(f'제목 글자 {len(set(text))}자 → {a.out} ({pathlib.Path(a.out).stat().st_size // 1024}KB)')
