const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makePngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(width, height, colorType, rawPixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(colorType, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  
  const ihdrChunk = makePngChunk('IHDR', ihdr);
  const compressed = zlib.deflateSync(rawPixels);
  const idatChunk = makePngChunk('IDAT', compressed);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const buf = fs.readFileSync('docs/ZeroSpot-Brand.pdf');
const outDir = 'extracted_assets';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// First index all obj positions
const objMap = {};
const objHeaderRegex = /(\d+)\s+0\s+obj/g;
let m;
const headers = [];
const str = buf.toString('latin1');

while ((m = objHeaderRegex.exec(str)) !== null) {
  headers.push({ id: m[1], pos: m.index });
}

for (let i = 0; i < headers.length; i++) {
  const cur = headers[i];
  const nextPos = (i + 1 < headers.length) ? headers[i+1].pos : buf.length;
  const chunk = str.substring(cur.pos, Math.min(cur.pos + 2000, nextPos));
  const sIdx = chunk.indexOf('stream');
  
  if (sIdx !== -1) {
    const dict = chunk.substring(0, sIdx);
    const streamTagPos = cur.pos + sIdx;
    let dataStart = streamTagPos + 6;
    if (buf[dataStart] === 0x0D && buf[dataStart+1] === 0x0A) dataStart += 2;
    else if (buf[dataStart] === 0x0A || buf[dataStart] === 0x0D) dataStart += 1;
    
    // Find /Length
    const lenM = dict.match(/\/Length\s+(\d+)/);
    let dataLen = 0;
    if (lenM) {
      dataLen = parseInt(lenM[1]);
    } else {
      const eIdx = str.indexOf('endstream', dataStart);
      dataLen = eIdx - dataStart;
    }
    
    objMap[cur.id] = {
      dict,
      stream: buf.subarray(dataStart, dataStart + dataLen)
    };
  } else {
    objMap[cur.id] = { dict: chunk };
  }
}

console.log(`Indexed ${Object.keys(objMap).length} objects`);

for (const [id, obj] of Object.entries(objMap)) {
  if (!obj.stream) continue;
  if (!obj.dict.includes('/Subtype /Image') && !obj.dict.includes('/Subtype/Image')) continue;
  
  const widthM = obj.dict.match(/\/Width\s+(\d+)/);
  const heightM = obj.dict.match(/\/Height\s+(\d+)/);
  const filterM = obj.dict.match(/\/Filter\s*\/([A-Za-z0-9]+)/);
  const smaskM = obj.dict.match(/\/SMask\s+(\d+)\s+0\s+R/);
  
  if (!widthM || !heightM) continue;
  const width = parseInt(widthM[1]);
  const height = parseInt(heightM[1]);
  const filter = filterM ? filterM[1] : '';
  
  if (filter !== 'FlateDecode') continue;
  
  try {
    const inflated = zlib.inflateSync(obj.stream);
    let smaskInflated = null;
    if (smaskM && objMap[smaskM[1]] && objMap[smaskM[1]].stream) {
      try {
        smaskInflated = zlib.inflateSync(objMap[smaskM[1]].stream);
      } catch (e) {
        console.error(`SMask inflate failed for ${smaskM[1]}:`, e.message);
      }
    }
    
    const expectedGray = width * height;
    const expectedRgb = width * height * 3;
    
    if (smaskInflated && smaskInflated.length === expectedGray) {
      const isRgb = inflated.length === expectedRgb;
      const scanlineLen = 1 + width * 4;
      const rawWithFilter = Buffer.alloc(scanlineLen * height);
      
      for (let y = 0; y < height; y++) {
        const rowStart = y * scanlineLen;
        rawWithFilter[rowStart] = 0;
        for (let x = 0; x < width; x++) {
          const srcIdx = (y * width + x) * (isRgb ? 3 : 1);
          const dstIdx = rowStart + 1 + x * 4;
          if (isRgb) {
            rawWithFilter[dstIdx] = inflated[srcIdx];
            rawWithFilter[dstIdx+1] = inflated[srcIdx+1];
            rawWithFilter[dstIdx+2] = inflated[srcIdx+2];
          } else {
            rawWithFilter[dstIdx] = inflated[srcIdx];
            rawWithFilter[dstIdx+1] = inflated[srcIdx];
            rawWithFilter[dstIdx+2] = inflated[srcIdx];
          }
          rawWithFilter[dstIdx+3] = smaskInflated[y * width + x];
        }
      }
      const pngBuf = createPng(width, height, 6, rawWithFilter);
      const outPath = path.join(outDir, `obj_${id}_${width}x${height}_rgba.png`);
      fs.writeFileSync(outPath, pngBuf);
      console.log(`Saved RGBA PNG: ${outPath}`);
    } else {
      const isRgb = inflated.length === expectedRgb;
      const bpp = isRgb ? 3 : 1;
      const colorType = isRgb ? 2 : 0;
      const scanlineLen = 1 + width * bpp;
      const rawWithFilter = Buffer.alloc(scanlineLen * height);
      for (let y = 0; y < height; y++) {
        const rowStart = y * scanlineLen;
        rawWithFilter[rowStart] = 0;
        const srcStart = y * width * bpp;
        inflated.copy(rawWithFilter, rowStart + 1, srcStart, srcStart + width * bpp);
      }
      const pngBuf = createPng(width, height, colorType, rawWithFilter);
      const outPath = path.join(outDir, `obj_${id}_${width}x${height}_${isRgb ? 'rgb' : 'gray'}.png`);
      fs.writeFileSync(outPath, pngBuf);
      console.log(`Saved PNG: ${outPath}`);
    }
  } catch (err) {
    console.error(`Failed obj ${id}:`, err.message);
  }
}
