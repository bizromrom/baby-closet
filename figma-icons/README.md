# 아기 옷장 아이콘 세트 (피그마용 SVG)

- `icon-set.svg` : 16개 아이콘을 한 장에 모은 시트 (피그마에서 다듬은 원본). 이 파일이 기준이에요.
- `icon-*.svg` : 아이콘 하나씩 (48×48). `icon-set.svg`에서 자동으로 나눠 만든 파일이에요.

스타일: 외곽선 #FFB760 (두께 3, 둥근 끝) · 채움 #FFFDEC · 포인트 #E771C0 Candy Blush · 코디 연결 동그라미 #FFB760

## 피그마에서 아이콘을 고친 뒤 앱에 반영하기
1. 피그마에서 시트(640×520) 전체를 SVG로 내보내 `icon-set.svg`를 덮어써요.
   칸 배치(5열, 칸 120px, 순서: closet add settings baby basket / camera pants romper jacket close / join edit trash heart sparkle / socks)는 그대로 둬요.
2. 아래 명령을 실행하면 앱의 `icons.js`와 `icon-*.svg`가 새 아이콘으로 바뀌어요.
   `powershell -ExecutionPolicy Bypass -File figma-icons/import-icons.ps1`
