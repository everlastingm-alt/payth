Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\PAYTH\public\brand\payth-reference.png")

function Get-StrokeAt($x, $yMin, $yMax) {
  $runs = @()
  $run = 0; $start = 0
  for ($y = $yMin; $y -lt $yMax; $y++) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.R + $c.G + $c.B -gt 40) {
      if ($run -eq 0) { $start = $y }
      $run++
    } else {
      if ($run -gt 0) { $runs += ,@($start, $run) }
      $run = 0
    }
  }
  if ($run -gt 0) { $runs += ,@($start, $run) }
  return $runs
}

$yMin = 224; $yMax = 358
foreach ($x in @(175, 185, 195, 205)) {
  $runs = Get-StrokeAt $x $yMin $yMax
  Write-Output "x=$x runs: $($runs | ForEach-Object { "$($_[0])-($_[0]+$_[1]) w=$($_[1])" } | Join-String -Separator ', ')"
}

# P stem centerline x estimate - left edge of P
for ($x = 155; $x -lt 220; $x++) {
  $runs = Get-StrokeAt $x $yMin $yMax
  if ($runs.Count -eq 1 -and $runs[0][1] -gt 80) {
    Write-Output "P full stem x=$x width=$($runs[0][1])"
  }
}

$bmp.Dispose()
