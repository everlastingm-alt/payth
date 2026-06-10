Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\PAYTH\public\brand\payth-reference.png")
$w = $bmp.Width
$h = $bmp.Height

# Wordmark only (y < 380)
$wmMaxY = 380
$minX = 9999; $minY = 9999; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $wmMaxY; $y++) {
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
Write-Output "wordmark bbox: $minX $minY $maxX $maxY h=$($maxY-$minY)"

# Tagline only (y > 360)
$minX2 = 9999; $minY2 = 9999; $maxX2 = 0; $maxY2 = 0
for ($y = 360; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.R + $c.G + $c.B -gt 40) {
      if ($x -lt $minX2) { $minX2 = $x }
      if ($y -lt $minY2) { $minY2 = $y }
      if ($x -gt $maxX2) { $maxX2 = $x }
      if ($y -gt $maxY2) { $maxY2 = $y }
    }
  }
}
Write-Output "tagline bbox: $minX2 $minY2 $maxX2 $maxY2 cx=$([int](($minX2+$maxX2)/2))"

# Estimate stroke by measuring horizontal slice through P middle
$pCenterY = [int](($minY + $maxY) / 2)
$thick = 0
for ($x = 180; $x -lt 280; $x++) {
  $run = 0; $maxRun = 0
  for ($y = $minY; $y -lt $maxY; $y++) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.R + $c.G + $c.B -gt 40) { $run++ } else { if ($run -gt $maxRun) { $maxRun = $run }; $run = 0 }
  }
  if ($run -gt $maxRun) { $maxRun = $run }
  if ($maxRun -gt $thick) { $thick = $maxRun }
}
Write-Output "estimated stroke width (vertical stem): $thick"

$bmp.Dispose()
