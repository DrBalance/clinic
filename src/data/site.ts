// 한의원 기본 정보. 비어 있는 값(TODO)은 확정되면 여기만 채우면 사이트 전체에 반영됩니다.
export const site = {
  name: '아침나라한의원',
  tagline: '밸런스를 회복하면 아침이 가벼워집니다',
  address: '서울 강남구 논현로131길 6 시엔빌딩 2층',
  station: '학동역 7번 출구',
  email: 'drbalance@naver.com',

  // TODO: 새 한의원 전화번호 (예: '02-000-0000')
  phone: '02-511-7727',
  // 진료시간 (note 는 해당 줄 아래에 작게 표시)
  hours: [
    { label: '평일', time: '10:30 – 19:30', note: '점심시간 14:00 – 15:00' },
    { label: '목요일', time: '10:30 – 16:00', note: '예약진료' },
    { label: '토요일', time: '10:30 – 14:00' },
    { label: '일 · 공휴일', time: '휴진' },
  ] as { label: string; time: string; note?: string }[],
  // 네이버 예약 주소 (예: 'https://naver.me/xxxx'). 비워 두면 예약 버튼이 보이지 않습니다.
  bookingUrl: 'https://booking.naver.com/booking/16/bizes/1764585',
  // 네이버 블로그 (RSS 로 글 목록을 가져옵니다)
  naverBlogId: 'drbalance',

  // 사이트 주소 (astro.config.mjs 의 site 와 같아야 합니다)
  url: 'https://morningnara.com',
  // 검색엔진에 보이는 한 줄 소개 (질환 효과 표현 없이 위치와 진료 분야만)
  summary:
    '서울 강남구 논현동 학동역 7번 출구 근처의 한의원입니다. 침·테이프침, 소화기 장애, 불안·불면, 두드러기, 한약 진료 방식을 설명합니다.',
  // 검색엔진 소유 확인 코드. 네이버 서치어드바이저·구글 서치콘솔에서 받은 content 값만 넣으면 메타 태그가 생깁니다.
  // (비워 두면 태그를 넣지 않습니다. 파일 업로드 방식으로 확인했다면 비워 둬도 됩니다.)
  naverSiteVerification: '',
  googleSiteVerification: '',
};

// 검색엔진용 구조화 데이터(JSON-LD)에 쓰는 진료시간. 화면에 보이는 hours 와 같은 내용이어야 합니다.
// '평일'은 월·화·수·금으로 봤고, 목요일은 점심 없이 10:30–16:00 예약진료입니다.
export const schemaHours = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'], ranges: [['10:30', '14:00'], ['15:00', '19:30']] },
  { days: ['Thursday'], ranges: [['10:30', '16:00']] },
  { days: ['Saturday'], ranges: [['10:30', '14:00']] },
] as { days: string[]; ranges: string[][] }[];

export const treatmentCards = [
  { slug: 'acupuncture', no: '01', title: '침 · 테이프침', desc: '이런저런 치료를 받아도 자꾸 되돌아오는 통증이 있는 분께', art: 'needle' },
  { slug: 'digestion', no: '02', title: '소화기 장애', desc: '발표나 중요한 미팅 전날이면 입맛이 떨어지고 속이 더부룩해지는 분께', art: 'stomach' },
  { slug: 'sleep', no: '03', title: '불안 · 불면', desc: '불안과 우울은 마음만의 문제가 아닙니다. 몸도 함께 살펴야 합니다.', art: 'moon' },
  { slug: 'urticaria', no: '04', title: '두드러기', desc: '피부에 올라오는 몸의 신호', art: 'skin' },
  { slug: 'herb', no: '05', title: '한약', desc: '몸 전체의 균형을 보고 처방합니다', art: 'pot' },
] as const;
