# 아기 옷장 아이콘 세트 (피그마용 SVG)

- `icon-set.svg` : 15개 아이콘을 한 장에 모은 시트. 피그마에 끌어다 놓으면 아이콘마다 이름 붙은 레이어로 들어가요.
- `icon-*.svg` : 아이콘 하나씩 (48×48). 여러 개를 한 번에 선택해 피그마 캔버스에 끌어다 놓아도 돼요.

스타일: 외곽선 #3E3A24 (두께 3.5, 둥근 끝) · 채움 #F5F0A4 Lemon Cream(주색) · 하이라이트 #E771C0 Candy Blush(포인트) · 코디 연결 동그라미 #E771C0
선은 외곽선(stroke) 그대로 들어가서 피그마에서 두께·색을 바로 바꿀 수 있어요.

앱의 `icons.js`를 고친 뒤 다시 내보내려면 (앱 서버가 켜져 있을 때):
`powershell -ExecutionPolicy Bypass -File figma-icons/export-icons.ps1 -OutDir figma-icons`
