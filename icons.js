// 아이콘 세트: 굵고 둥근 그린 외곽선 + 연한 그린 채움 + 핑크 하이라이트 한 획
const G = '#0F5730';      // 외곽선 (Forest Green)
const T = '#D5E6DA';      // 채움 (연한 그린)
const P = '#FF8CC2';      // 하이라이트 (Pink Lace를 조금 진하게 — 연한 바탕 위에서도 보이도록)
const W = '#FFFFFF';

const S = `fill="none" stroke="${G}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`;
const HL = `fill="none" stroke="${P}" stroke-width="3.5" stroke-linecap="round"`;

const ICONS = {
  // 옷장: 아기 티셔츠
  closet: `
    <path ${S} fill="${T}" d="M17 8 L8 13 L5 22 L11 24 L13 21 V40 Q13 42 15 42 H33 Q35 42 35 40 V21 L37 24 L43 22 L40 13 L31 8 Q28 13 24 13 Q20 13 17 8 Z"/>
    <path ${HL} d="M19 27 V33"/>`,
  // 옷 추가: 동그라미 + 더하기
  add: `
    <circle ${S} fill="${T}" cx="24" cy="24" r="17"/>
    <path ${S} d="M24 17 V31 M17 24 H31"/>
    <path ${HL} d="M13.5 20.5 Q14.5 16.5 18 14"/>`,
  // 설정: 조절 슬라이더
  settings: `
    <path ${S} d="M8 14 H40 M8 24 H40 M8 34 H40"/>
    <circle ${S} fill="${T}" cx="30" cy="14" r="5"/>
    <circle ${S} fill="${P}" cx="16" cy="24" r="5"/>
    <circle ${S} fill="${T}" cx="27" cy="34" r="5"/>`,
  // 아기 얼굴 (로고)
  baby: `
    <circle ${S} fill="${T}" cx="24" cy="27" r="16"/>
    <path ${S} d="M24 11 Q21 5 26 4.5 Q30 5 27.5 9"/>
    <circle fill="${G}" cx="18" cy="26" r="2.2"/>
    <circle fill="${G}" cx="30" cy="26" r="2.2"/>
    <path ${S} d="M19 32 Q24 37 29 32"/>
    <path ${HL} d="M12.5 23 Q13.5 18.5 17 16"/>`,
  // 빈 옷장: 빨래 바구니
  basket: `
    <path ${S} d="M15 20 Q15 8 24 8 Q33 8 33 20"/>
    <path ${S} fill="${T}" d="M7 20 H41 L37 40 Q36.5 42 34.5 42 H13.5 Q11.5 42 11 40 Z"/>
    <path ${S} d="M19 27 V35 M29 27 V35"/>
    <path ${HL} d="M24 27 V35"/>`,
  // 사진 찍기: 카메라
  camera: `
    <path ${S} fill="${T}" d="M12 14 H17 L19.5 9 H28.5 L31 14 H36 Q42 14 42 20 V36 Q42 40 38 40 H10 Q6 40 6 36 V20 Q6 14 12 14 Z"/>
    <circle ${S} fill="${W}" cx="24" cy="27" r="7.5"/>
    <path ${HL} d="M20.5 25 Q21.5 22.5 24 22"/>
    <circle fill="${G}" cx="35" cy="20" r="1.8"/>`,
  // 추천 코디: 반짝임
  sparkle: `
    <path ${S} fill="${T}" d="M22 8 Q24 22 38 25 Q24 28 22 42 Q20 28 6 25 Q20 22 22 8 Z"/>
    <path ${HL} d="M39 6 V13 M35.5 9.5 H42.5"/>`,
};

export function icon(name, size = 24) {
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">${ICONS[name]}</svg>`;
}

// HTML 안의 <i data-icon="이름" data-size="24"></i> 를 아이콘으로 바꿈
export function mountIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => {
    el.outerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 24);
  });
}
