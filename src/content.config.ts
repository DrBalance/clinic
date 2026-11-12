import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const treatments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/treatments' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(), // 검색 결과·공유 미리보기에 보이는 소개 문구 (없으면 subtitle)
    order: z.number(),
    legacyImage: z.string().optional(),
  }),
});

// 질문과 답변: 파일 하나가 아코디언 한 칸입니다.
// 위치: src/content/qa/<진료 페이지>/<번호-이름>.md  (본문이 답변)
const qa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/qa' }),
  schema: z.object({
    page: z.string(), // 붙을 진료 페이지 (acupuncture, digestion, sleep, urticaria, herb, faq)
    category: z.string(), // 주제 묶음 이름 (예: 침에 대해)
    question: z.string(), // 환자가 묻는 말 그대로
    order: z.number().default(1000), // 작은 숫자가 먼저. 묶음은 가장 작은 번호 순으로 나열됩니다
    draft: z.boolean().default(false), // true 이면 사이트에 표시하지 않습니다 (답 검토 전)
  }),
});

export const collections = { treatments, qa };
