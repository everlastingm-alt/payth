const sharp = require("sharp");
const potrace = require("potrace");
const fs = require("fs");
const path = require("path");

const brandDir = path.join(__dirname, "../public/brand");
const input = path.join(brandDir, "payth-reference.png");

async function extractMask(crop) {
  const { data, info } = await sharp(input)
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    out[i] = r + g + b > 50 ? 0 : 255; // black logo on white bg for potrace
  }

  const maskPath = path.join(brandDir, "payth-wordmark-mask.png");
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toFile(maskPath);

  return { maskPath, width: info.width, height: info.height };
}

function traceFile(maskPath, outputPath, color) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      maskPath,
      {
        turdSize: 5,
        optTolerance: 0.15,
        threshold: 128,
        color,
        background: "transparent",
      },
      (err, svg) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(outputPath, svg);
          resolve(svg);
        }
      },
    );
  });
}

(async () => {
  // Wordmark crop from pixel analysis
  const crop = { left: 152, top: 220, width: 720, height: 142 };
  const { maskPath, width, height } = await extractMask(crop);
  console.log("Mask:", maskPath, width, height);

  await traceFile(maskPath, path.join(brandDir, "payth-traced-wordmark.svg"), "#2563EB");
  console.log("Traced wordmark");

  // Tagline crop
  const tagCrop = { left: 250, top: 385, width: 520, height: 45 };
  const tag = await extractMask(tagCrop);
  await traceFile(tag.maskPath, path.join(brandDir, "payth-traced-tagline.svg"), "#64748B");
  console.log("Traced tagline");
})();
