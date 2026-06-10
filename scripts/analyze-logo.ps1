Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\PAYTH\public\brand\payth-reference.png")
$w = $bmp.Width
$h = $bmp.Height
$minX = 9999; $minY = 9999; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.R + $c.G + $c.B -gt 40) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
Write-Output "bbox $minX $minY $maxX $maxY size $w $h"
$cutY = $minY + [int](($maxY - $minY) * 0.72)
$letters = "PAYTH"
$seg = ($maxX - $minX) / 5.0
for ($i = 0; $i -lt 5; $i++) {
  $xStart = [int]($minX + $i * $seg)
  $xEnd = [int]($minX + ($i + 1) * $seg)
  $lx = 9999; $ly = 9999; $rx = 0; $ry = 0
  for ($y = $minY; $y -lt $cutY; $y++) {
    for ($x = $xStart; $x -lt $xEnd; $x++) {
      $c = $bmp.GetPixel($x, $y)
      if ($c.R + $c.G + $c.B -gt 40) {
        if ($x -lt $lx) { $lx = $x }
        if ($y -lt $ly) { $ly = $y }
        if ($x -gt $rx) { $rx = $x }
        if ($y -gt $ry) { $ry = $y }
      }
    }
  }
  $cx = [int](($lx + $rx) / 2)
  Write-Output "$($letters[$i]) x=$lx-$rx y=$ly-$ry cx=$cx stroke_est=$([int](($ry-$ly)*0.18))"
}
$bmp.Dispose()
