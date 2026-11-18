param([string]$Dir = (Split-Path $PSScriptRoot -Parent))
# 피그마에서 고친 icon-set.svg 를 아이콘별로 나눠 앱(icons.js)과 icon-*.svg 에 반영한다
# 규칙: 5열 · 칸 120px · 아이콘 48px 칸은 (56+열*120, 40+행*120) 에서 시작 · 이름 글자(#7C847E)는 빼고 씀
$names = 'closet','add','settings','baby','basket','camera','pants','romper','jacket','close','join','edit','trash','heart','sparkle','socks'
$src = [IO.File]::ReadAllText((Join-Path $Dir 'figma-icons\icon-set.svg'))
$cells = @{}
foreach ($m in [regex]::Matches($src, '<path [^>]*/>')) {
  $p = $m.Value
  if ($p -match 'fill="#7C847E"' -or $p -match 'fill="white"') { continue }
  $d = [regex]::Match($p, ' d="M\s*([-\d.]+)[ ,]([-\d.]+)')
  $x = [double]$d.Groups[1].Value; $y = [double]$d.Groups[2].Value
  $col = [math]::Floor(($x - 20) / 120); $row = [math]::Floor(($y - 20) / 120)
  $i = [int]($row * 5 + $col)
  if (-not $cells.ContainsKey($i)) { $cells[$i] = New-Object System.Collections.ArrayList }
  [void]$cells[$i].Add($p)
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
$js = New-Object System.Text.StringBuilder
for ($i = 0; $i -lt $names.Count; $i++) {
  $n = $names[$i]; $ox = 56 + ($i % 5) * 120; $oy = 40 + [math]::Floor($i / 5) * 120
  $body = "<g transform=`"translate(-$ox -$oy)`">`n    " + ($cells[$i] -join "`n    ") + "`n  </g>"
  [void]$js.AppendLine("  ${n}: ``")
  [void]$js.AppendLine("  $body``,")
  $svg = "<svg xmlns=`"http://www.w3.org/2000/svg`" width=`"48`" height=`"48`" viewBox=`"0 0 48 48`" fill=`"none`">`n  <title>$n</title>`n  " + $body + "`n</svg>`n"
  [IO.File]::WriteAllText((Join-Path $Dir "figma-icons\icon-$n.svg"), $svg, $utf8)
  "$n : $($cells[$i].Count) paths"
}
$js_path = Join-Path $Dir "icons.js"; $old = [IO.File]::ReadAllText($js_path)
$head = $old.Substring(0, $old.IndexOf("const ICONS = {") + 15); $tail = $old.Substring($old.IndexOf("`n};`n"))
[IO.File]::WriteAllText($js_path, $head + "`n" + $js.ToString().Replace("`r","").TrimEnd() + $tail, $utf8)
"icons.js updated"
