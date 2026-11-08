const fs = require('fs');
const path = require('path');
const { decodePng, crop } = require('./png_utils.cjs');

console.log('Reading mockup...');
const mockupBuf = fs.readFileSync('docs/landing-page-mockup.png');
console.log('Decoding mockup...');
const img = decodePng(mockupBuf);
console.log(`Decoded: ${img.width}x${img.height}`);

const outDir = 'src/assets/images';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Define crops
const crops = [
  // Hero cleaner
  { name: 'hero-cleaner.png', x: 550, y: 15, w: 320, h: 360 },
  // Hero background right
  { name: 'hero-slide-1.png', x: 0, y: 0, w: 1024, h: 375 },
  // About section living room
  { name: 'about-living-room.png', x: 22, y: 374, w: 236, h: 146 },
  // Services
  { name: 'service-residential.png', x: 545, y: 443, w: 135, h: 88 },
  { name: 'service-commercial.png', x: 698, y: 443, w: 135, h: 88 },
  { name: 'service-deep-cleaning.png', x: 849, y: 443, w: 135, h: 88 },
  // Process mop
  { name: 'process-mop.png', x: 0, y: 790, w: 280, h: 190 },
  // Testimonial avatar
  { name: 'testimonial-avatar-1.png', x: 412, y: 1063, w: 45, h: 45 },
  // Tips
  { name: 'tip-habits.png', x: 25, y: 1277, w: 152, h: 90 },
  { name: 'tip-workspace.png', x: 348, y: 1277, w: 152, h: 90 },
  { name: 'tip-deep-clean.png', x: 671, y: 1277, w: 145, h: 90 },
];

for (const c of crops) {
  const croppedPng = crop(img, c.x, c.y, c.w, c.h);
  const target = path.join(outDir, c.name);
  fs.writeFileSync(target, croppedPng);
  console.log(`Saved ${target} (${c.w}x${c.h})`);
}
console.log('Finished crops successfully.');

