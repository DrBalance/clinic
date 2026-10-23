// 한의원 기본 정보. 비어 있는 값(TODO)은 확정되면 여기만 채우면 사이트 전체에 반영됩니다.
export const site = {
  name: '아침나라한의원',
  tagline: '밸런스를 회복하면 아침이 가벼워집니다',
  address: '서울 강남구 논현로131길 6 시엔빌딩 2층',
  station: '학동역 7번 출구',
  email: 'drbalance@naver.com',

  // TODO: 새 한의원 전화번호 (예: '02-000-0000')
  phone: '',
  // TODO: 진료시간
  hours: [
    { label: '평일', time: '00:00 – 00:00' },
    { label: '토요일', time: '00:00 – 00:00' },
    { label: '일 · 공휴일', time: '휴진' },
  ],
  // 네이버 블로그 (RSS 로 글 목록을 가져옵니다)
  naverBlogId: 'drbalance',
};

export const treatmentCards = [
  { slug: 'yinxu', no: '01', title: '음정(陰精)회복 플랜', desc: '검사에는 나오지 않지만 몸은 분명 이상을 느낍니다', art: 'moon' },
  { slug: 'disk', no: '02', title: '척추밸런스 케어', desc: "몸은 근육보다 '감각'이 먼저 무너집니다", art: 'spine' },
  { slug: 'diet', no: '03', title: '밸런스 다이어트', desc: '몸이 먼저 건강해져야 살이 빠집니다', art: 'bowl' },
  { slug: 'herb', no: '04', title: '한약', desc: '만성피로, 불면증, 우울증, 공황장애', art: 'pot' },
  { slug: 'acupuncture', no: '05', title: '침 · MBT 치료', desc: '몸에 맞는 적절한 자극이 큰 효과를 냅니다', art: 'needle' },
] as const;
