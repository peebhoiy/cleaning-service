const fs = require('fs');
const path = require('path');

const buf = fs.readFileSync('docs/ZeroSpot-Brand.pdf');
const outDir = 'extracted_assets';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let pos = 0;
let jpgCount = 0;
while (pos < buf.length) {
  const idx = buf.indexOf(Buffer.from([0xFF, 0xD8, 0xFF]), pos);
  if (idx === -1) break;
  const endIdx = buf.indexOf(Buffer.from([0xFF, 0xD9]), idx);
  if (endIdx === -1) break;
  const jpegBuf = buf.subarray(idx, endIdx + 2);
  const fileName = path.join(outDir, `img_${jpgCount}_${jpegBuf.length}b.jpg`);
  fs.writeFileSync(fileName, jpegBuf);
  console.log(`Extracted ${fileName} (length: ${jpegBuf.length})`);
  jpgCount++;
  pos = endIdx + 2;
}
console.log('Total JPEGs extracted:', jpgCount);
