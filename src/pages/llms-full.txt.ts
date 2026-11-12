// 진료 안내 글 전체를 한 파일로 모은 것 (/llms-full.txt). AI 서비스가 사이트 내용을 한 번에 읽을 수 있습니다.
// 보이지 않는 초안(draft)은 포함하지 않습니다.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { plainText } from '../lib/seo';

export const GET: APIRoute = async () => {
  const pages = (await getCollection('treatments')).sort((a, b) => a.data.order - b.data.order);
  const qa = (await getCollection('qa', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );

  const out: string[] = [`# ${site.name}`, '', `> ${site.summary}`, ''];
  for (const p of pages) {
    out.push(`## ${p.data.title}`, `주소: ${site.url}/${p.id}/`, '');
    if (p.data.subtitle) out.push(p.data.subtitle, '');
    out.push(plainText(p.body ?? ''), '');
    const items = qa.filter((e) => e.data.page === p.id);
    if (items.length) {
      out.push('### 자주 묻는 질문', '');
      for (const e of items) out.push(`Q. ${e.data.question}`, plainText(e.body ?? ''), '');
    }
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
