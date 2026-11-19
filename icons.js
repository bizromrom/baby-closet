// 아이콘 세트: 피그마에서 다듬은 icon-set.svg (figma-icons/) 를 그대로 옮긴 것
// 외곽선 #FFBE5C · 채움 #FFFEF5 · 포인트 #F78BC2 / 각 아이콘은 48×48 칸 기준
const ICONS = {
  closet: `
  <g transform="translate(-56 -40)">
    <path d="M73 47L64 52L61 61L67 63L69 60V79C69 80.3333 69.6667 81 71 81H89C90.3333 81 91 80.3333 91 79V60L93 63L99 61L96 52L87 47C85 50.3333 82.6667 52 80 52C77.3333 52 75 50.3333 73 47Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M75 66V72" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  add: `
  <g transform="translate(-176 -40)">
    <path d="M203 81C212.389 81 220 73.3888 220 64C220 54.6112 212.389 47 203 47C193.611 47 186 54.6112 186 64C186 73.3888 193.611 81 203 81Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M203 57V71M196 64H210" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#F78BC2"/>
  </g>`,
  settings: `
  <g transform="translate(-296 -40)">
    <path d="M307 54H339M307 64H339M307 74H339" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M330 57C332.209 57 334 55.2091 334 53C334 50.7909 332.209 49 330 49C327.791 49 326 50.7909 326 53C326 55.2091 327.791 57 330 57Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M314 68C316.209 68 318 66.2091 318 64C318 61.7909 316.209 60 314 60C311.791 60 310 61.7909 310 64C310 66.2091 311.791 68 314 68Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#F78BC2"/>
    <path d="M330 78C332.209 78 334 76.2091 334 74C334 71.7909 332.209 70 330 70C327.791 70 326 71.7909 326 74C326 76.2091 327.791 78 330 78Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
  </g>`,
  baby: `
  <g transform="translate(-416 -40)">
    <path d="M442 83.5C450.837 83.5 458 76.3366 458 67.5C458 58.6634 450.837 51.5 442 51.5C433.163 51.5 426 58.6634 426 67.5C426 76.3366 433.163 83.5 442 83.5Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M442 51.5C440 47.5 440.667 45.3333 444 45C446.667 45.3333 447.167 46.8333 445.5 49.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#F78BC2"/>
    <path d="M436 68.7C437.215 68.7 438.2 67.715 438.2 66.5C438.2 65.285 437.215 64.3 436 64.3C434.785 64.3 433.8 65.285 433.8 66.5C433.8 67.715 434.785 68.7 436 68.7Z" fill="#FFBE5C"/>
    <path d="M448 68.7C449.215 68.7 450.2 67.715 450.2 66.5C450.2 65.285 449.215 64.3 448 64.3C446.785 64.3 445.8 65.285 445.8 66.5C445.8 67.715 446.785 68.7 448 68.7Z" fill="#FFBE5C"/>
    <path d="M437 72.5C440.333 75.8333 443.667 75.8333 447 72.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
  </g>`,
  basket: `
  <g transform="translate(-536 -40)">
    <path d="M553 59C553 51 556 47 562 47C568 47 571 51 571 59" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M545 59H579L575 79C574.667 80.3333 573.833 81 572.5 81H551.5C550.167 81 549.333 80.3333 549 79L545 59Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M557 66V74M567 66V74" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#F78BC2"/>
    <path d="M562 66V74" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  camera: `
  <g transform="translate(-56 -160)">
    <path d="M67 176H72L74.5 171H83.5L86 176H91C95 176 97 178 97 182V198C97 200.667 95.6667 202 93 202H65C62.3333 202 61 200.667 61 198V182C61 178 63 176 67 176Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M79 196.5C83.1421 196.5 86.5 193.142 86.5 189C86.5 184.858 83.1421 181.5 79 181.5C74.8579 181.5 71.5 184.858 71.5 189C71.5 193.142 74.8579 196.5 79 196.5Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M74 187C74.6667 185.333 75.8333 184.333 77.5 184" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
    <path d="M90 183.8C90.9941 183.8 91.7999 182.994 91.7999 182C91.7999 181.006 90.9941 180.2 90 180.2C89.0058 180.2 88.2 181.006 88.2 182C88.2 182.994 89.0058 183.8 90 183.8Z" fill="#FFBE5C"/>
  </g>`,
  pants: `
  <g transform="translate(-176 -160)">
    <path d="M187 168H211L214 202C214 203.333 213.333 204 212 204H204C203 204 202.433 203.5 202.3 202.5L199 182L195.7 202.5C195.567 203.5 195 204 194 204H186C184.667 204 184 203.333 184 202L187 168Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M187 175H211" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M190 182L189 192" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  romper: `
  <g transform="translate(-296 -160)">
    <path d="M312 168L304 173L301 181L307 183L309 180V193L307 204H316L319 196L322 204H331L329 193V180L331 183L337 181L334 173L326 168C324 171.333 321.667 173 319 173C316.333 173 314 171.333 312 168Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M319 181.8C319.994 181.8 320.8 180.994 320.8 180C320.8 179.006 319.994 178.2 319 178.2C318.006 178.2 317.2 179.006 317.2 180C317.2 180.994 318.006 181.8 319 181.8Z" fill="#F78BC2"/>
    <path d="M319 188.8C319.994 188.8 320.8 187.994 320.8 187C320.8 186.006 319.994 185.2 319 185.2C318.006 185.2 317.2 186.006 317.2 187C317.2 187.994 318.006 188.8 319 188.8Z" fill="#F78BC2"/>
  </g>`,
  jacket: `
  <g transform="translate(-416 -160)">
    <path d="M436 168L427 173L424 192L430 194L432 184V202C432 203.333 432.667 204 434 204H452C453.333 204 454 203.333 454 202V184L456 194L462 192L459 173L450 168L443 174L436 168Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M443 174V204" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M436 168L438 178L443 174L448 178L450 168" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M437 188V194" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  close: `
  <g transform="translate(-536 -160)">
    <path d="M550 174L570 194M570 174L550 194" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
  </g>`,
  join: `
  <g transform="translate(-56 -280)">
    <path d="M80 320C88.8366 320 96 312.837 96 304C96 295.163 88.8366 288 80 288C71.1634 288 64 295.163 64 304C64 312.837 71.1634 320 80 320Z" fill="#FFBE5C"/>
    <path d="M80 297V311M73 304H87" stroke-width="3" stroke-linecap="round" stroke="#FFFEF5"/>
  </g>`,
  edit: `
  <g transform="translate(-176 -280)">
    <path d="M216 286L226 296L204 318H194V308L216 286Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M211 291L221 301" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M199 309L203 313" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  trash: `
  <g transform="translate(-296 -280)">
    <path d="M306 295H332L329.5 320C329.367 321.333 328.633 322 327.3 322H310.7C309.367 322 308.633 321.333 308.5 320L306 295Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M302 295H336M314 295V289C314 287.667 314.667 287 316 287H322C323.333 287 324 287.667 324 289V295" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M315 303V314" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
    <path d="M323 303V314" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#F78BC2"/>
  </g>`,
  heart: `
  <g transform="translate(-416 -280)">
    <path d="M442 320C431.333 313.333 425.667 306.333 425 299C425 293.667 427.667 290.667 433 290C437 290 440 292 442 296C444 292 447 290 451 290C456.333 290.667 459 293.667 459 299C458.333 306.333 452.667 313.333 442 320Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M431 298C431.333 296 432.333 294.833 434 294.5" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  sparkle: `
  <g transform="translate(-536 -280)">
    <path d="M558 288C559.333 297.333 564.667 303 574 305C564.667 307 559.333 312.667 558 322C556.667 312.667 551.333 307 542 305C551.333 303 556.667 297.333 558 288Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M575 286V293M571.5 289.5H578.5" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
  socks: `
  <g transform="translate(-56 -400)">
    <path d="M72 406H86V425L95 432Q99 436 96 440Q93 443 89 441L75 433Q72 431 72 427Z" fill="#FFFEF5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M72 412H86" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#FFBE5C"/>
    <path d="M76 417V423" stroke-width="3" stroke-linecap="round" stroke="#F78BC2"/>
  </g>`,
};

export function icon(name, size = 24) {
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">${ICONS[name]}</svg>`;
}

// HTML 안의 <i data-icon="이름" data-size="24"></i> 를 아이콘으로 바꿈
export function mountIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => {
    el.outerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 24);
  });
}

// 피그마·디자인 툴용: 단독 SVG 파일 내용
export const ICON_NAMES = Object.keys(ICONS);
export function svgFile(name, size = 48) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none">${ICONS[name]}\n</svg>\n`;
}
