import type { Metadata } from "next";
import { DM_Serif_Display, Quicksand } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/lib/constants";
import { baseOpenGraph } from "@/lib/metadata";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/ui/SkipLink";
import "@/styles/globals.css";

// Quicksand is a variable font: one Latin WOFF2 covers every weight (300–700).
// next/font downloads it at build time, self-hosts it and generates a
// size-adjusted "Quicksand Fallback" face, so text doesn't shift on swap.
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  // Lets browsers that support it scale the page with the OS text size.
  // Breakpoints are in rem so the layout follows. Never set a root font-size.
  other: {
    "text-scale": "scale",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <SkipLink />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
