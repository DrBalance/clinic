// 검색엔진(네이버·구글)과 AI 검색이 읽는 구조화 데이터(JSON-LD)를 만드는 곳입니다.
// 값은 모두 src/data/site.ts 에서 가져오므로, 주소·전화·진료시간은 거기만 고치면 됩니다.
import { site, schemaHours } from '../data/site';

const abs = (path: string) => new URL(path, site.url).toString();

// 한의원 정보. 네이버 플레이스·굿닥 등 다른 곳의 이름·주소·전화와 똑같이 맞춰 두는 것이 중요합니다.
export function clinicJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': abs('/#clinic'),
    name: site.name,
    url: site.url,
    description: site.summary,
    image: abs('/og.png'),
    telephone: site.phone.replace(/^0/, '+82-'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: '서울특별시',
      addressLocality: '강남구',
      streetAddress: site.address.replace(/^서울\s*강남구\s*/, ''),
    },
    openingHoursSpecification: schemaHours.flatMap((h) =>
      h.ranges.map(([opens, closes]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens,
        closes,
      })),
    ),
    hasMap: `https://map.naver.com/p/search/${encodeURIComponent(site.address)}`,
    sameAs: [`https://blog.naver.com/${site.naverBlogId}`],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

// 마크다운을 읽기 쉬운 글로 바꿉니다 (구조화 데이터·llms 파일용).
export function plainText(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// 화면에 실제로 보이는 질문과 답만 FAQ 데이터로 만듭니다 (보이지 않는 내용은 넣지 않습니다).
export function faqJsonLd(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

// 마크다운 본문에서 "### 질문" 단위의 질문과 답을 뽑습니다 (자주 묻는 질문 페이지처럼 ### 로 쓴 글용).
export function faqFromHeadings(md: string, skipFirst = true) {
  const body = md.replace(/^---[\s\S]*?---\s*/, '');
  const parts = body.split(/^###\s+/m).slice(1);
  const items = parts.map((p) => {
    const [q, ...rest] = p.split('\n');
    return { question: q.trim(), answer: plainText(rest.join('\n')) };
  });
  return (skipFirst ? items.slice(1) : items).filter((i) => i.question && i.answer);
}
