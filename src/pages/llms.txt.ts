// AI 검색·답변 서비스가 사이트를 빠르게 이해하도록 돕는 요약 파일 (/llms.txt).
// 한의원 정보와 페이지 목록은 site.ts 와 진료 글에서 자동으로 만들어집니다.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const pages = (await getCollection('treatments')).sort((a, b) => a.data.order - b.data.order);
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.summary}`,
    '',
    '## 한의원 정보',
    `- 주소: ${site.address} (${site.station})`,
    `- 전화: ${site.phone}`,
    ...site.hours.map((h) => `- ${h.label}: ${h.time}${h.note ? ` (${h.note})` : ''}`),
    ...(site.bookingUrl ? [`- 예약: ${site.bookingUrl}`] : []),
    `- 블로그: https://blog.naver.com/${site.naverBlogId}`,
    '',
    '## 페이지',
    ...pages.map((p) => `- [${p.data.title}](${site.url}/${p.id}/): ${p.data.description ?? p.data.subtitle ?? ''}`.trimEnd()),
    `- [오시는 길](${site.url}/directions/): 주소와 약도`,
    '',
    '## 전체 글',
    `- [llms-full.txt](${site.url}/llms-full.txt): 진료 안내 글 전체를 한 파일로 모았습니다.`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
