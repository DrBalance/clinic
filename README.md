# Dr. Balance 클리닉 사이트

정적(GitHub Pages) 마케팅 사이트. 브랜드: **Dr. Balance**.  
컨셉: 스트레스가 몸에 남긴 것을 푸는 한의원.

주소(표시): 서울 강남구 논현동 37-16 (학동역 권역)  
CNAME: `morningnara.com` (당분간 유지)

## 로컬에서 열기

프로젝트 루트에서 정적 서버를 띄우세요. `file://`로 열면 상대 경로·폰트는 동작하지만, 가능하면 로컬 서버를 권장합니다.

```bash
cd clinic-site
# Python
python3 -m http.server 8080
# 또는 Node
npx --yes serve -l 8080
```

브라우저에서 `http://localhost:8080` 접속.

모바일 폭 확인: 개발자 도구 → 디바이스 툴바(375px 등).

## GitHub Pages

1. 이 `clinic-site/` 폴더 내용을 저장소 루트(또는 `/docs`)에 푸시합니다.
2. Settings → Pages → Deploy from branch → 해당 폴더/브랜치 선택.
3. 커스텀 도메인은 `CNAME` 파일(`morningnara.com`)을 그대로 두거나, 변경 시 파일·DNS를 함께 수정합니다.
4. HTTPS는 GitHub Pages에서 자동 설정(도메인 연결 후).

공유 헤더/푸터는 `js/main.js`가 `#site-header` / `#site-footer`에 주입합니다.  
각 페이지 `<body data-root=""|"../" data-page="...">`로 상대 경로와 현재 메뉴를 지정합니다.

## 폴더 구조

```
clinic-site/
  index.html
  CNAME
  css/styles.css
  js/main.js
  acupuncture/          # 침 치료 + 증상 4페이지
  herbs/                # 한약 + 증상 3페이지
  visit/                # 처음 오시는 분
  doctor/               # 원장 소개
  contact/              # 오시는 길·진료시간·예약
  README.md
  CONTENT.md            # 플레이스홀더·금지 표현 점검
```

## 디자인

- Japandi, 모바일 퍼스트
- 명조 제목: Noto Serif KR / 본문 고딕: Pretendard (CDN)
- 팔레트: 웜 오프화이트 · 소프트 세이지 · 테라코타/잉크 액센트
- 스톡 의사·침 모델 사진 없음 → `손그림 일러스트 자리` 슬롯만 배치

## 문안·플레이스홀더

원장 확인 전 비워 둔 항목은 `CONTENT.md`와 페이지 내 `【…】` 표시를 참고하세요.  
의료광고 금지 표현(완치·효과 보장·전후사진·최고/유일 등)은 사용하지 않았습니다.
