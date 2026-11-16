import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// The hero portrait shows at 160px (144px on phones). These widths cover 1x,
// 2x and 3x screens. Re-run after replacing public/images/selfie.jpg, which
// stays as the source and is also used by the share image.
const source = "public/images/selfie.jpg";
const outDir = "public/images/portrait";
const widths = [160, 320, 480];

await mkdir(outDir, { recursive: true });

for (const width of widths) {
  const resized = sharp(source).resize(width, width, { fit: "cover" });
  await Promise.all([
    resized.clone().avif({ quality: 55, effort: 9 }).toFile(`${outDir}/selfie-${width}.avif`),
    resized.clone().webp({ quality: 72, effort: 6 }).toFile(`${outDir}/selfie-${width}.webp`),
    resized.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${outDir}/selfie-${width}.jpg`),
  ]);
}

console.log(`Portrait generated: ${outDir}/selfie-{${widths.join(",")}}.{avif,webp,jpg}`);
