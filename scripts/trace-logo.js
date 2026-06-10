const potrace = require("potrace");
const fs = require("fs");
const path = require("path");

const input = path.join(__dirname, "../public/brand/payth-reference.png");
const outDir = path.join(__dirname, "../public/brand");

// Crop wordmark region from analysis: x155-869 y224-358, add padding
const crop = { left: 150, top: 218, width: 725, height: 150 };

potrace.trace(
  input,
  {
    turdSize: 2,
    optTolerance: 0.2,
    threshold: 40,
    color: "#2563EB",
    background: "transparent",
  },
  (err, svg) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    fs.writeFileSync(path.join(outDir, "payth-traced-raw.svg"), svg);
    console.log("Wrote payth-traced-raw.svg");
  },
);
