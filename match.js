// 옷 정보 기준값과 "어울림" 계산 규칙 (종류 + 색상 기준)

export const CATEGORIES = ['상의', '하의', '원피스·우주복', '아우터', '양말'];
export const PATTERNS = ['무지', '무늬'];
export const SEASONS = ['봄', '여름', '가을', '겨울'];

// neutral: 어떤 색과도 무난한 기본색
export const COLORS = [
  { name: '흰색', hex: '#F7F7F5', neutral: true },
  { name: '아이보리', hex: '#F3EBD8', neutral: true },
  { name: '베이지', hex: '#D8C3A0', neutral: true },
  { name: '회색', hex: '#9E9E9E', neutral: true },
  { name: '검정', hex: '#2B2B2B', neutral: true },
  { name: '네이비', hex: '#26365F', neutral: true },
  { name: '데님', hex: '#5B7BA6', neutral: true },
  { name: '갈색', hex: '#8B5E3C' },
  { name: '빨강', hex: '#D63A3A' },
  { name: '분홍', hex: '#F2A7B8' },
  { name: '주황', hex: '#F08A3C' },
  { name: '노랑', hex: '#F4D35E' },
  { name: '연두', hex: '#B5D86A' },
  { name: '초록', hex: '#4E9A5B' },
  { name: '민트', hex: '#9ED9C8' },
  { name: '하늘색', hex: '#9CC9EE' },
  { name: '파랑', hex: '#3B6FD1' },
  { name: '보라', hex: '#9B7BC8' },
  { name: '라벤더', hex: '#CDBFE6' },
];
export const colorOf = (name) => COLORS.find((c) => c.name === name) || COLORS[0];

// 함께 입을 수 있는 종류 조합
const PAIRS = {
  '상의': ['하의', '아우터', '양말'],
  '하의': ['상의', '아우터', '양말'],
  '원피스·우주복': ['아우터', '하의', '양말'],
  '아우터': ['상의', '하의', '원피스·우주복', '양말'],
  '양말': ['상의', '하의', '원피스·우주복', '아우터'],
};
export const canPair = (a, b) => (PAIRS[a] || []).includes(b);

function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}
const isPastel = (c) => { const { l } = hexToHsl(c.hex); return !c.neutral && l >= 0.7; };

/** 두 옷의 색 어울림 점수(0~1)와 이유 */
export function colorScore(a, b) {
  const ca = colorOf(a.color), cb = colorOf(b.color);
  let score, reason;
  if (ca.neutral && cb.neutral) {
    score = ca.name === cb.name ? 0.65 : 0.8;
    reason = ca.name === cb.name ? `같은 ${ca.name}끼리 깔끔한 조합` : `${ca.name}+${cb.name}, 차분한 기본색 조합`;
  } else if (ca.neutral || cb.neutral) {
    const n = ca.neutral ? ca : cb;
    score = 0.9; reason = `${n.name}은(는) 어떤 색과도 잘 어울리는 기본색이에요`;
  } else {
    const ha = hexToHsl(ca.hex).h, hb = hexToHsl(cb.hex).h;
    const d = Math.min(Math.abs(ha - hb), 360 - Math.abs(ha - hb));
    if (isPastel(ca) && isPastel(cb)) { score = 0.85; reason = '파스텔 톤끼리 부드럽고 사랑스러운 조합'; }
    else if (ca.name === cb.name) { score = 0.6; reason = `같은 ${ca.name} 계열로 맞춘 원톤 코디`; }
    else if (d <= 45) { score = 0.8; reason = '비슷한 계열 색이라 자연스러운 톤온톤'; }
    else if (d >= 150) { score = 0.72; reason = '반대 색끼리 대비되는 포인트 코디'; }
    else { score = 0.4; reason = '색 조합이 다소 튈 수 있어요'; }
  }
  // 무늬 규칙
  if (a.pattern === '무늬' && b.pattern === '무늬') {
    score -= 0.25; reason += ' · 둘 다 무늬가 있어 복잡해 보일 수 있어요';
  } else if (a.pattern !== b.pattern) {
    const [patterned, plain] = a.pattern === '무늬' ? [a, b] : [b, a];
    if ((patterned.subColors || []).includes(plain.color)) {
      score += 0.1; reason += ` · 무늬 속 ${plain.color}과(와) 색을 맞췄어요`;
    }
  }
  return { score: Math.max(0, Math.min(1, score)), reason };
}

/** 선택한 옷에 어울리는 옷: 종류별 상위 목록 + 베스트 코디 */
export function recommend(item, all) {
  const byCat = {};
  for (const other of all) {
    if (other.id === item.id || !canPair(item.category, other.category)) continue;
    const { score, reason } = colorScore(item, other);
    (byCat[other.category] ||= []).push({ item: other, score, reason });
  }
  for (const k in byCat) byCat[k].sort((x, y) => y.score - x.score);

  // 베스트 코디: 필요한 종류를 하나씩 골라 조합
  const need = {
    '상의': ['하의', '아우터', '양말'],
    '하의': ['상의', '아우터', '양말'],
    '원피스·우주복': ['아우터', '양말'],
    '아우터': ['양말'],
    '양말': ['아우터'],
  }[item.category] || [];
  let outfit = [];
  if (item.category === '아우터' || item.category === '양말') {
    // 아우터·양말: 상의+하의 조합 또는 원피스 중 더 잘 어울리는 쪽을 먼저 고름
    const top = byCat['상의']?.[0], bottom = byCat['하의']?.[0], one = byCat['원피스·우주복']?.[0];
    const pairAvg = top && bottom ? (top.score + bottom.score + colorScore(top.item, bottom.item).score) / 3 : -1;
    outfit = one && one.score >= pairAvg ? [one] : [top, bottom].filter(Boolean);
  }
  {
    for (const cat of need) {
      const list = byCat[cat] || [];
      if (!list.length) continue;
      // 이미 고른 옷들과도 어울리는 것을 우선
      const pick = list
        .map((r) => ({ ...r, total: r.score + outfit.reduce((s, o) => s + colorScore(o.item, r.item).score, 0) }))
        .sort((x, y) => y.total - x.total)[0];
      outfit.push(pick);
    }
  }
  return { byCat, outfit };
}
