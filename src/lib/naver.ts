// 네이버 블로그 RSS 에서 최근 글 목록을 가져옵니다 (빌드할 때 실행).
// 피드를 읽지 못하면 null 을 돌려주고, 사이트 빌드는 그대로 계속됩니다.
import { XMLParser } from 'fast-xml-parser';

export interface BlogPost {
  title: string;
  link: string;
  date: Date | null;
  summary: string;
  thumb: string | null;
}

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');

const text = (v: unknown): string => {
  if (v == null) return '';
  if (typeof v === 'object') return text((v as Record<string, unknown>)['#text']);
  return String(v);
};

export function parseFeed(xml: string): BlogPost[] {
  const parsed = new XMLParser({ ignoreAttributes: false, trimValues: true }).parse(xml);
  const raw = parsed?.rss?.channel?.item ?? [];
  const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : [raw];

  return items
    .map((it) => {
      const desc = text(it.description);
      const img = desc.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
      const enc = (it.enclosure as Record<string, string> | undefined)?.['@_url'] ?? null;
      const summary = decode(desc.replace(/<\/?(b|i|u|em|strong|span|a|font)(\s[^>]*)?>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
      const d = new Date(text(it.pubDate));
      return {
        title: decode(text(it.title)).trim(),
        link: text(it.link).trim(),
        date: isNaN(d.getTime()) ? null : d,
        summary: summary.length > 110 ? summary.slice(0, 110).trimEnd() + '…' : summary,
        thumb: (img ?? enc)?.replace(/^http:\/\//, 'https://') ?? null,
      };
    })
    .filter((p) => p.title && /^https?:\/\//.test(p.link));
}

export async function getBlogPosts(blogId: string, limit = 30): Promise<BlogPost[] | null> {
  if (!blogId) return null;
  const url = `https://rss.blog.naver.com/${encodeURIComponent(blogId)}.xml`;
  try {
    if (process.env.NAVER_RSS_FILE) {
      const { readFileSync } = await import('node:fs');
      return parseFeed(readFileSync(process.env.NAVER_RSS_FILE, 'utf8')).slice(0, limit);
    }
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; morningnara-site-build)' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseFeed(await res.text()).slice(0, limit);
  } catch (e) {
    console.warn(`[naver] 블로그 RSS 를 읽지 못했습니다 (${url}): ${(e as Error).message}`);
    return null;
  }
}

export const fmtDate = (d: Date | null) =>
  d ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' }).format(d) : '';
