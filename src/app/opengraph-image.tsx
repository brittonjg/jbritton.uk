import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — Head of Engineering at Cuvva`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share image colours are fixed (light theme) because the PNG is rendered once
// at build time. Values match the light-theme tokens in globals.css.
const colours = {
  background: "#fafafa",
  textPrimary: "#37474f",
  textSecondary: "#55646d",
  accent: "#b45309",
  accentDecor: "#d97706",
};

export default async function OpengraphImage() {
  const root = process.cwd();
  const [serif, quicksand, selfie] = await Promise.all([
    readFile(path.join(root, "public/fonts/dm-serif-display/DMSerifDisplay-Regular.ttf")),
    readFile(path.join(root, "public/fonts/quicksand/Quicksand-SemiBold.ttf")),
    readFile(path.join(root, "public/images/selfie.jpg")),
  ]);
  const selfieSrc = `data:image/jpeg;base64,${selfie.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          gap: 72,
          background: colours.background,
          fontFamily: "Quicksand",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 336,
            height: 336,
            borderRadius: 9999,
            border: `8px solid ${colours.accentDecor}`,
            padding: 8,
            flexShrink: 0,
          }}
        >
          <img
            src={selfieSrc}
            alt=""
            width={304}
            height={304}
            style={{ borderRadius: 9999, objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "DM Serif Display",
              fontSize: 88,
              lineHeight: 1,
              color: colours.textPrimary,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              fontWeight: 600,
              color: colours.textSecondary,
            }}
          >
            Head of Engineering at Cuvva
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 32,
              fontWeight: 600,
              color: colours.accent,
            }}
          >
            jbritton.uk
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Serif Display", data: serif, weight: 400, style: "normal" },
        { name: "Quicksand", data: quicksand, weight: 600, style: "normal" },
      ],
    },
  );
}
