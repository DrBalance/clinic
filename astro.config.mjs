import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import rehypeAccordion from './plugins/rehype-accordion.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://morningnara.com',
  markdown: {
    processor: unified({
      // 기존 글은 줄바꿈이 곧 문단 구조라서, 한 줄 띄움 없이도 줄바꿈이 유지되게 합니다.
      remarkPlugins: [remarkBreaks],
      // ### 소제목 단위로 글을 아코디언(<details>)으로 묶습니다.
      rehypePlugins: [rehypeAccordion],
    }),
  },
});
