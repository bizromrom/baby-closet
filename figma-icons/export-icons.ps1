param([string]$Url = 'http://localhost:8765/icons.js', [string]$OutDir)
# icons.js 를 읽어 아이콘별 SVG 파일과 전체 세트 SVG 를 만든다 (상수 치환 방식)
$src = (Invoke-WebRequest -UseBasicParsing $Url).Content
$consts = @{}
foreach ($m in [regex]::Matches($src, "const (\w+) = '([^']+)';")) { $consts[$m.Groups[1].Value] = $m.Groups[2].Value }
foreach ($m in [regex]::Matches($src, 'const (S|HL) = `([^`]+)`;')) { $consts[$m.Groups[1].Value] = $m.Groups[2].Value }
function Expand([string]$t) {
  for ($i = 0; $i -lt 3; $i++) { foreach ($k in $consts.Keys) { $t = $t.Replace('${' + $k + '}', $consts[$k]) } }
  return $t
}
$names = @(); $bodies = @{}
foreach ($m in [regex]::Matches($src, '(?s)\n  (\w+): `(.*?)`,')) {
  $n = $m.Groups[1].Value; $names += $n
  $b = (Expand $m.Groups[2].Value) -replace '\s+', ' '
  $bodies[$n] = ($b.Trim() -replace '> <', ">`n  <")
}
New-Item -ItemType Directory -Force $OutDir | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
foreach ($n in $names) {
  $svg = "<svg xmlns=`"http://www.w3.org/2000/svg`" width=`"48`" height=`"48`" viewBox=`"0 0 48 48`" fill=`"none`">`n  <title>$n</title>`n  " + $bodies[$n] + "`n</svg>`n"
  [IO.File]::WriteAllText((Join-Path $OutDir "icon-$n.svg"), $svg, $utf8)
}
# 전체 세트: 5열, 칸 120px, 아이콘 48px + 이름
$cols = 5; $cell = 120; $rows = [math]::Ceiling($names.Count / $cols)
$w = $cols * $cell + 40; $h = $rows * $cell + 40
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("<svg xmlns=`"http://www.w3.org/2000/svg`" width=`"$w`" height=`"$h`" viewBox=`"0 0 $w $h`" fill=`"none`">")
[void]$sb.AppendLine("  <rect id=`"background`" width=`"$w`" height=`"$h`" rx=`"24`" fill=`"#FFFFFF`"/>")
for ($i = 0; $i -lt $names.Count; $i++) {
  $n = $names[$i]; $x = 20 + ($i % $cols) * $cell; $y = 20 + [math]::Floor($i / $cols) * $cell
  [void]$sb.AppendLine("  <g id=`"$n`" transform=`"translate($($x + 36) $($y + 20))`">")
  [void]$sb.AppendLine("    " + ($bodies[$n] -replace "`n  ", "`n    "))
  [void]$sb.AppendLine("  </g>")
  [void]$sb.AppendLine("  <text x=`"$($x + 60)`" y=`"$($y + 94)`" text-anchor=`"middle`" font-family=`"Pretendard`" font-size=`"12`" font-weight=`"600`" fill=`"#7C847E`">$n</text>")
}
[void]$sb.AppendLine("</svg>")
[IO.File]::WriteAllText((Join-Path $OutDir "icon-set.svg"), $sb.ToString(), $utf8)
"$($names.Count) icons: $($names -join ', ')"
