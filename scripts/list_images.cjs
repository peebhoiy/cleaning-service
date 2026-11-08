const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const buf = fs.readFileSync('docs/ZeroSpot-Brand.pdf');
const str = buf.toString('latin1');

const regex = /(\d+)\s+0\s+obj\s*<<([^>]*\/Subtype\s*\/Image[^>]*)>>\s*stream[\r\n]+/g;
let match;
let count = 0;

console.log('Searching for image objects...');

while ((match = regex.exec(str)) !== null) {
  const objId = match[1];
  const dict = match[2];
  const streamStart = match.index + match[0].length;
  const streamEnd = str.indexOf('endstream', streamStart);
  if (streamEnd === -1) continue;

  const rawStream = buf.subarray(streamStart, streamEnd);
  
  // Parse dict
  const widthM = dict.match(/\/Width\s+(\d+)/);
  const heightM = dict.match(/\/Height\s+(\d+)/);
  const filterM = dict.match(/\/Filter\s*\/([A-Za-z0-9]+)/);
  const colorSpaceM = dict.match(/\/ColorSpace\s*([^\/]+)/);
  const smaskM = dict.match(/\/SMask\s+(\d+)\s+0\s+R/);

  const width = widthM ? parseInt(widthM[1]) : 0;
  const height = heightM ? parseInt(heightM[1]) : 0;
  const filter = filterM ? filterM[1] : 'None';
  
  console.log(`Obj ${objId}: ${width}x${height}, Filter: ${filter}, Bytes: ${rawStream.length}, SMask: ${smaskM ? smaskM[1] : 'no'}`);
  count++;
}
console.log(`Total image objects: ${count}`);

