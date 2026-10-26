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
    { label: '목요일', time: '예약진료' },
    { label: '토요일', time: '10:30 – 14:00' },
    { label: '일 · 공휴일', time: '휴진' },
  ] as { label: string; time: string; note?: string }[],
  // 네이버 예약 주소 (예: 'https://naver.me/xxxx'). 비워 두면 예약 버튼이 보이지 않습니다.
  bookingUrl: 'https://booking.naver.com/booking/16/bizes/1764585',
  // 네이버 블로그 (RSS 로 글 목록을 가져옵니다)
  naverBlogId: 'drbalance',
};

export const treatmentCards = [
  { slug: 'acupuncture', no: '01', title: '침 · 테이프침', desc: '부드러운 자극이 지친 몸을 회복합니다', art: 'needle' },
  { slug: 'digestion', no: '02', title: '소화기 장애', desc: '생각이 많은 날, 속이 먼저 반응합니다', art: 'stomach' },
  { slug: 'sleep', no: '03', title: '불안 · 불면', desc: '결정하지 못한 마음이 밤까지 이어질 때', art: 'moon' },
  { slug: 'urticaria', no: '04', title: '두드러기', desc: '피부에 올라오는 몸의 신호', art: 'skin' },
  { slug: 'herb', no: '05', title: '한약', desc: '몸 전체의 균형을 보고 처방합니다', art: 'pot' },
] as const;
