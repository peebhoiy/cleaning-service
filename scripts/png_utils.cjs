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

function encodePng(width, height, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  
  const ihdrChunk = makePngChunk('IHDR', ihdr);
  const scanlineLen = 1 + width * 4;
  const rawWithFilter = Buffer.alloc(scanlineLen * height);
  for (let y = 0; y < height; y++) {
    rawWithFilter[y * scanlineLen] = 0; // Filter 0
    rgbaBuffer.copy(rawWithFilter, y * scanlineLen + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(rawWithFilter);
  const idatChunk = makePngChunk('IDAT', compressed);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function decodePng(buf) {
  let pos = 8;
  let width, height, bitDepth, colorType, compression, filter, interlace;
  const idats = [];
  
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    pos += 12 + len;
    
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      compression = data[10];
      filter = data[11];
      interlace = data[12];
    } else if (type === 'IDAT') {
      idats.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }
  
  const allIdat = Buffer.concat(idats);
  const inflated = zlib.inflateSync(allIdat);
  
  // Bytes per pixel
  let bpp = 4;
  if (colorType === 2) bpp = 3; // RGB
  else if (colorType === 6) bpp = 4; // RGBA
  else if (colorType === 0) bpp = 1; // Grayscale
  else throw new Error('Unsupported PNG color type: ' + colorType);
  
  const scanlineLen = 1 + width * bpp;
  const rgba = Buffer.alloc(width * height * 4);
  
  // Unfilter
  const uncompressedRows = [];
  let prevRow = Buffer.alloc(width * bpp);
  
  for (let y = 0; y < height; y++) {
    const rowFilter = inflated[y * scanlineLen];
    const curRow = Buffer.alloc(width * bpp);
    const srcRow = inflated.subarray(y * scanlineLen + 1, (y + 1) * scanlineLen);
    
    for (let i = 0; i < width * bpp; i++) {
      const a = (i >= bpp) ? curRow[i - bpp] : 0;
      const b = prevRow[i];
      const c = (i >= bpp) ? prevRow[i - bpp] : 0;
      let val = srcRow[i];
      
      if (rowFilter === 0) {
        // None
      } else if (rowFilter === 1) {
        // Sub
        val = (val + a) & 0xFF;
      } else if (rowFilter === 2) {
        // Up
        val = (val + b) & 0xFF;
      } else if (rowFilter === 3) {
        // Average
        val = (val + Math.floor((a + b) / 2)) & 0xFF;
      } else if (rowFilter === 4) {
        // Paeth
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        val = (val + pr) & 0xFF;
      }
      curRow[i] = val;
    }
    
    // Convert to RGBA
    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      const srcIdx = x * bpp;
      if (bpp === 4) {
        rgba[dstIdx] = curRow[srcIdx];
        rgba[dstIdx + 1] = curRow[srcIdx + 1];
        rgba[dstIdx + 2] = curRow[srcIdx + 2];
        rgba[dstIdx + 3] = curRow[srcIdx + 3];
      } else if (bpp === 3) {
        rgba[dstIdx] = curRow[srcIdx];
        rgba[dstIdx + 1] = curRow[srcIdx + 1];
        rgba[dstIdx + 2] = curRow[srcIdx + 2];
        rgba[dstIdx + 3] = 255;
      } else if (bpp === 1) {
        const g = curRow[srcIdx];
        rgba[dstIdx] = g;
        rgba[dstIdx + 1] = g;
        rgba[dstIdx + 2] = g;
        rgba[dstIdx + 3] = 255;
      }
    }
    prevRow = curRow;
  }
  
  return { width, height, rgba };
}

function crop(image, x, y, width, height) {
  const result = Buffer.alloc(width * height * 4);
  for (let row = 0; row < height; row++) {
    const srcY = y + row;
    if (srcY < 0 || srcY >= image.height) continue;
    for (let col = 0; col < width; col++) {
      const srcX = x + col;
      if (srcX < 0 || srcX >= image.width) continue;
      const srcIdx = (srcY * image.width + srcX) * 4;
      const dstIdx = (row * width + col) * 4;
      image.rgba.copy(result, dstIdx, srcIdx, srcIdx + 4);
    }
  }
  return encodePng(width, height, result);
}

module.exports = { decodePng, encodePng, crop };

