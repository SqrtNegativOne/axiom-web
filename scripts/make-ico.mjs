/**
 * Wraps an existing PNG in a valid ICO container (ICO may embed PNG data directly).
 * Usage: node scripts/make-ico.mjs [input.png] [output.ico]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, process.argv[2] ?? "react-app/public/favicon.png");
const output = resolve(root, process.argv[3] ?? "react-app/public/favicon.ico");

const png = readFileSync(input);

// PNG signature check
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!png.subarray(0, 8).equals(pngSignature)) {
  throw new Error(`${input} is not a PNG file`);
}

// Read dimensions from IHDR to fill ICONDIRENTRY (0 means 256)
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > 256 || height > 256) {
  throw new Error(`PNG too large for ICO: ${width}x${height}`);
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count

const entry = Buffer.alloc(16);
entry.writeUInt8(width >= 256 ? 0 : width, 0);
entry.writeUInt8(height >= 256 ? 0 : height, 1);
entry.writeUInt8(0, 2); // palette colors
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png.length, 8); // image data size
entry.writeUInt32LE(22, 12); // offset of image data

writeFileSync(output, Buffer.concat([header, entry, png]));
console.log(
  `Wrote ${output} (${png.length + 22} bytes, embedded ${width}x${height} PNG)`
);
