// ### 소제목(h3)마다 <details> 아코디언으로 묶는 rehype 플러그인.
// - 첫 번째 섹션은 펼쳐 둡니다 (핵심 요약이 항상 보이도록).
// - 첫 소제목 앞에 있는 글은 접지 않고 그대로 둡니다.
// 자바스크립트 없이 동작하는 브라우저 기본 <details>를 사용합니다.

const isH3 = (n) => n.type === 'element' && n.tagName === 'h3';

export default function rehypeAccordion() {
  return (tree) => {
    const out = [];
    let body = null;
    let first = true;

    for (const node of tree.children) {
      if (isH3(node)) {
        body = { type: 'element', tagName: 'div', properties: { className: ['acc-body'] }, children: [] };
        const summary = {
          type: 'element',
          tagName: 'summary',
          properties: {},
          children: [
            { type: 'element', tagName: 'span', properties: { className: ['acc-title'] }, children: node.children },
            { type: 'element', tagName: 'span', properties: { className: ['acc-mark'], ariaHidden: 'true' }, children: [] },
          ],
        };
        const details = {
          type: 'element',
          tagName: 'details',
          properties: { className: ['acc'], ...(first ? { open: true } : {}) },
          children: [summary, body],
        };
        first = false;
        out.push(details);
      } else if (body) {
        body.children.push(node);
      } else {
        out.push(node);
      }
    }
    tree.children = out;
  };
}
