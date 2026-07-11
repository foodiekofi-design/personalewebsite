import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jed Blankson, Product Designer",
  description: "Product designer and co-founder of a film-discovery app, with 6+ years across consumer and enterprise products. I design for iOS and Android and ship in real code. Open to senior and staff product design roles at ambitious teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a] font-[var(--font-inter)] antialiased">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
