const fs = require("fs");
const path = require("path");

const brandDir = path.join(__dirname, "../public/brand");

function extractPath(svgFile) {
  const svg = fs.readFileSync(path.join(brandDir, svgFile), "utf8");
  const match = svg.match(/<path d="([^"]+)"/);
  if (!match) throw new Error(`No path in ${svgFile}`);
  return match[1];
}

const wordmarkPath = extractPath("payth-traced-wordmark.svg");
const pPath = extractPath("payth-traced-p.svg");

const gradientDefs = `
  <defs>
    <linearGradient id="payth-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="142" x2="720" y2="0">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>`;

const wordmarkGroup = (fill) =>
  `<path d="${wordmarkPath}" fill="${fill}" fill-rule="evenodd"/>`;

const TAGLINE = {
  fill: "url(#payth-gradient)",
  fontSize: 32,
  scaleX: 1.2,
  y: 214,
  x: 360,
  text: "FIND YOUR PATH TO PAYMENT",
};

const FULL_LOGO_HEIGHT = 230;

const taglineText = `<text
    x="${TAGLINE.x}"
    y="${TAGLINE.y}"
    text-anchor="middle"
    transform="translate(${TAGLINE.x}, ${TAGLINE.y}) scale(${TAGLINE.scaleX}, 1) translate(${-TAGLINE.x}, ${-TAGLINE.y})"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="${TAGLINE.fontSize}"
    font-weight="400"
    fill="${TAGLINE.fill}"
  >${TAGLINE.text}</text>`;

// 1. Wordmark only
fs.writeFileSync(
  path.join(brandDir, "payth-wordmark.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 142" fill="none" role="img" aria-label="PAYTH">
${gradientDefs}
  ${wordmarkGroup("url(#payth-gradient)")}
</svg>`,
);

// 2. Full logo with tagline
fs.writeFileSync(
  path.join(brandDir, "payth-logo-full.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 ${FULL_LOGO_HEIGHT}" fill="none" role="img" aria-label="PAYTH — FIND YOUR PATH TO PAYMENT">
${gradientDefs}
  ${wordmarkGroup("url(#payth-gradient)")}
  ${taglineText}
</svg>`,
);

// 3. Navy wordmark
fs.writeFileSync(
  path.join(brandDir, "payth-wordmark-navy.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 142" fill="none" role="img" aria-label="PAYTH">
  ${wordmarkGroup("#10233F")}
</svg>`,
);

// 4. Favicon P mark
fs.writeFileSync(
  path.join(brandDir, "payth-favicon.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 142" fill="none" role="img" aria-label="PAYTH">
  <defs>
    <linearGradient id="payth-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="148" y2="142">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <path d="${pPath}" fill="url(#payth-gradient)" fill-rule="evenodd"/>
</svg>`,
);

// 5. Trace workspace with overlay
fs.writeFileSync(
  path.join(brandDir, "payth-trace-workspace.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 682" fill="none">
  <image href="payth-reference.png" width="1024" height="682" opacity="0.35"/>
  <g transform="translate(152, 220)">
${gradientDefs}
    ${wordmarkGroup("url(#payth-gradient)")}
  </g>
  <text
    x="512"
    y="408"
    text-anchor="middle"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="24"
    font-weight="400"
    fill="#64748B"
  >Find your path to payment</text>
</svg>`,
);

console.log("Built final SVG exports from traced paths");
