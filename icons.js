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
  // 하의: 바지
  pants: `
    <path ${S} fill="${T}" d="M12 6 H36 L39 40 Q39 42 37 42 H29 Q27.5 42 27.3 40.5 L24 20 L20.7 40.5 Q20.5 42 19 42 H11 Q9 42 9 40 Z"/>
    <path ${S} d="M12 13 H36"/>
    <path ${HL} d="M15 20 L14 30"/>`,
  // 원피스·우주복: 다리 달린 우주복
  romper: `
    <path ${S} fill="${T}" d="M17 6 L9 11 L6 19 L12 21 L14 18 V31 L12 42 H21 L24 34 L27 42 H36 L34 31 V18 L36 21 L42 19 L39 11 L31 6 Q28 11 24 11 Q20 11 17 6 Z"/>
    <circle fill="${G}" cx="24" cy="18" r="1.8"/>
    <circle fill="${G}" cx="24" cy="25" r="1.8"/>
    <path ${HL} d="M18 21 V27"/>`,
  // 아우터: 지퍼 점퍼
  jacket: `
    <path ${S} fill="${T}" d="M17 6 L8 11 L5 30 L11 32 L13 22 V40 Q13 42 15 42 H33 Q35 42 35 40 V22 L37 32 L43 30 L40 11 L31 6 L24 12 Z"/>
    <path ${S} d="M24 12 V42"/>
    <path ${S} d="M17 6 L19 16 L24 12 L29 16 L31 6"/>
    <path ${HL} d="M17 25 V32"/>`,
  // 닫기
  close: `
    <path ${S} d="M14 14 L34 34 M34 14 L14 34"/>`,
  // 코디 연결 (+): 그린 카드 위에서 쓰는 핑크 동그라미
  join: `
    <circle fill="#FFC3E0" cx="24" cy="24" r="16"/>
    <path ${S} d="M24 17 V31 M17 24 H31"/>`,
  // 수정: 연필
  edit: `
    <path ${S} fill="${T}" d="M30 8 L40 18 L18 40 H8 V30 Z"/>
    <path ${S} d="M25 13 L35 23"/>
    <path ${HL} d="M13 31 L17 35"/>`,
  // 삭제: 휴지통
  trash: `
    <path ${S} fill="${T}" d="M11 15 H37 L34.5 40 Q34.3 42 32.3 42 H15.7 Q13.7 42 13.5 40 Z"/>
    <path ${S} d="M7 15 H41 M19 15 V9 Q19 7 21 7 H27 Q29 7 29 9 V15"/>
    <path ${HL} d="M20 23 V34"/>
    <path ${S} d="M28 23 V34"/>`,
  // 점수: 하트
  heart: `
    <path ${S} fill="${T}" d="M24 40 Q8 30 7 19 Q7 11 15 10 Q21 10 24 16 Q27 10 33 10 Q41 11 41 19 Q40 30 24 40 Z"/>
    <path ${HL} d="M13 18 Q13.5 15 16 14.5"/>`,
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
