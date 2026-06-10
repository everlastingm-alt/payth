const sharp = require("sharp");
const potrace = require("potrace");
const fs = require("fs");
const path = require("path");

const brandDir = path.join(__dirname, "../public/brand");

async function extractAndTrace(crop, outName) {
  const { data, info } = await sharp(path.join(brandDir, "payth-reference.png"))
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    out[i] = r + g + b > 50 ? 0 : 255;
  }

  const maskPath = path.join(brandDir, `${outName}-mask.png`);
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toFile(maskPath);

  return new Promise((resolve, reject) => {
    potrace.trace(
      maskPath,
      { turdSize: 5, optTolerance: 0.15, threshold: 128, color: "#2563EB", background: "transparent" },
      (err, svg) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(path.join(brandDir, `${outName}.svg`), svg);
          resolve(svg);
        }
      },
    );
  });
}

(async () => {
  // P letter only for favicon
  await extractAndTrace({ left: 152, top: 220, width: 148, height: 142 }, "payth-traced-p");
  console.log("P favicon traced");
})();
