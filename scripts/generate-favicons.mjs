import sharp from "sharp";
import toIco from "to-ico";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile("src/app/icon.svg");

// Apple home-screen icon (iOS requires PNG, minimum 180x180)
await sharp(svg).resize(180, 180).png().toFile("src/app/apple-icon.png");

// Classic .ico (32x32 is sufficient for legacy fallback)
const pngBuffer = await sharp(svg).resize(32, 32).png().toBuffer();
await writeFile("src/app/favicon.ico", await toIco([pngBuffer]));

console.log("Favicons generated: src/app/apple-icon.png, src/app/favicon.ico");
